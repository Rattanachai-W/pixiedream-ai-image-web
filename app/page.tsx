"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { LANGUAGES, translations, type LangCode } from "./i18n/translations";

const MODELS = [
  { id: "seedream",      label: "Seedream 4.5",  descKey: "model_best_fast",   emoji: "🌟" },
  { id: "flux_schnell",  label: "FLUX Schnell",  descKey: "model_ultra_fast",  emoji: "⚡" },
  { id: "flux_dev",      label: "FLUX Dev",      descKey: "model_balanced",    emoji: "🔮" },
  { id: "flux_pro",      label: "FLUX Pro",      descKey: "model_high_quality",emoji: "👑" },
  { id: "nano_banana_2", label: "Nano Banana 2", descKey: "model_google",      emoji: "🍌" },
  { id: "gpt5_image",    label: "GPT-5 Image",   descKey: "model_openai",      emoji: "🧠" },
] as const;

const STYLES = [
  { id: "none",           labelKey: "style_free",       emoji: "🎨" },
  { id: "anime",          labelKey: "style_anime",      emoji: "⛩️" },
  { id: "photorealistic", labelKey: "style_photo",      emoji: "📸" },
  { id: "watercolor",     labelKey: "style_watercolor", emoji: "🎨" },
  { id: "cyberpunk",      labelKey: "style_cyberpunk",  emoji: "🤖" },
  { id: "fantasy",        labelKey: "style_fantasy",    emoji: "🧚" },
  { id: "cute",           labelKey: "style_kawaii",     emoji: "🌸" },
] as const;

const SIZES = [
  { id: "square",    label: "1:1",  width: 1024, height: 1024, ratio: "1 / 1"  },
  { id: "landscape", label: "16:9", width: 1344, height: 768,  ratio: "16 / 9" },
  { id: "portrait",  label: "9:16", width: 768,  height: 1344, ratio: "9 / 16" },
];

interface UsageInfo {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCostUSD: number;
  estimatedCostTHB: number;
}

export default function Home() {
  const [lang, setLang]                   = useState<LangCode>("en");
  const [langOpen, setLangOpen]           = useState(false);
  const [prompt, setPrompt]               = useState("");
  const [selectedStyle, setSelectedStyle] = useState("none");
  const [selectedModel, setSelectedModel] = useState("seedream");
  const [selectedSize, setSelectedSize]   = useState("square");
  const [isLoading, setIsLoading]         = useState(false);
  const [imageUrl, setImageUrl]           = useState<string | null>(null);
  const [imageSize, setImageSize]         = useState<{ width: number; height: number } | null>(null);
  const [error, setError]                 = useState<string | null>(null);
  const [usedPrompt, setUsedPrompt]       = useState("");
  const [usage, setUsage]                 = useState<UsageInfo | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const t = translations[lang];
  const currentSize = SIZES.find((s) => s.id === selectedSize)!;
  const currentLang = LANGUAGES.find((l) => l.code === lang)!;

  const EXAMPLE_PROMPTS = [t.example1, t.example2, t.example3, t.example4];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);
    setImageUrl(null);
    setImageSize(null);
    setUsage(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style: selectedStyle,
          model: selectedModel,
          width: currentSize.width,
          height: currentSize.height,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setImageUrl(data.imageUrl);
      setUsedPrompt(data.prompt);
      setImageSize({ width: data.width, height: data.height });
      if (data.usage) setUsage(data.usage);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    if (imageUrl.startsWith("data:")) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "pixiedream.png";
      link.click();
    } else {
      fetch(imageUrl)
        .then((r) => r.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "pixiedream.png";
          link.click();
          URL.revokeObjectURL(url);
        })
        .catch(() => window.open(imageUrl, "_blank"));
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      {/* Navbar */}
      <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <span className={styles.logoIcon}>🌸</span>
          <span className={styles.logoText}>PixieDream</span>
        </div>
        <div className={styles.navLinks}>
          <Link href="/" className={`${styles.navLink} ${styles.navLinkActive}`}>{t.nav_generate}</Link>
          <a href="#" className={styles.navLink}>{t.nav_gallery}</a>
          <a href="#" className={styles.navLink}>{t.nav_explore}</a>
          <Link href="/pricing" className={styles.navLink}>{t.nav_pricing}</Link>
        </div>
        <div className={styles.navRight}>
          {/* Language picker */}
          <div className={styles.langPicker}>
            <button
              className={styles.langBtn}
              onClick={() => setLangOpen((o) => !o)}
            >
              <span>{currentLang.flag}</span>
              <span className={styles.langBtnLabel}>{currentLang.label}</span>
              <span className={`${styles.langChevron} ${langOpen ? styles.langChevronOpen : ""}`}>▾</span>
            </button>
            {langOpen && (
              <div className={styles.langDropdown}>
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    className={`${styles.langOption} ${lang === l.code ? styles.langOptionActive : ""}`}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className={styles.navCta}>{t.nav_signin}</button>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        {/* <div className={styles.heroTag}><span>🚀</span> {t.hero_tag}</div> */}
        <h1 className={styles.heroTitle}>
          <span className={styles.gradientText}>{t.hero_title_transform}</span>{" "}
          {t.hero_title_mid}{" "}
          <span className={styles.gradientTextPink}>{t.hero_title_stunning}</span>
        </h1>
        <p className={styles.heroSubtitle}>{t.hero_subtitle}</p>
        <div className={styles.sparkle1}>✦</div>
        <div className={styles.sparkle2}>✦</div>
        <div className={styles.sparkle3}>★</div>
        <div className={styles.sparkle4}>✦</div>
      </section>

      {/* Generator */}
      <section className={styles.generatorSection}>
        <div className={styles.generatorCard}>

          {/* Prompt */}
          <div className={styles.inputGroup}>
            <label className={styles.label}><span>🎭</span> {t.label_describe}</label>
            <div className={styles.textareaWrapper}>
              <textarea
                ref={textareaRef}
                className={styles.textarea}
                placeholder={t.placeholder_describe}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleGenerate();
                }}
              />
              <span className={styles.textareaHint}>{t.hint_ctrl_enter}</span>
            </div>
          </div>

          {/* Example prompts */}
          <div className={styles.examples}>
            <span className={styles.examplesLabel}>{t.label_try}</span>
            <div className={styles.exampleChips}>
              {EXAMPLE_PROMPTS.map((ex) => (
                <button
                  key={ex}
                  className={styles.exampleChip}
                  onClick={() => { setPrompt(ex); textareaRef.current?.focus(); }}
                >
                  {ex.length > 38 ? ex.slice(0, 38) + "…" : ex}
                </button>
              ))}
            </div>
          </div>

          {/* Model selector */}
          <div className={styles.inputGroup}>
            <label className={styles.label}><span>🤖</span> {t.label_model}</label>
            <div className={styles.modelGrid}>
              {MODELS.map((m) => (
                <button
                  key={m.id}
                  className={`${styles.modelBtn} ${selectedModel === m.id ? styles.modelBtnActive : ""}`}
                  onClick={() => setSelectedModel(m.id)}
                >
                  <span className={styles.modelEmoji}>{m.emoji}</span>
                  <span className={styles.modelLabel}>{m.label}</span>
                  <span className={styles.modelDesc}>{t[m.descKey as keyof typeof t]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Style selector */}
          <div className={styles.inputGroup}>
            <label className={styles.label}><span>🎨</span> {t.label_style}</label>
            <div className={styles.styleGrid}>
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  className={`${styles.styleBtn} ${selectedStyle === s.id ? styles.styleBtnActive : ""}`}
                  onClick={() => setSelectedStyle(s.id)}
                >
                  <span className={styles.styleEmoji}>{s.emoji}</span>
                  <span>{t[s.labelKey as keyof typeof t]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className={styles.inputGroup}>
            <label className={styles.label}><span>📐</span> {t.label_size}</label>
            <div className={styles.sizeRow}>
              {SIZES.map((s) => (
                <button
                  key={s.id}
                  className={`${styles.sizeBtn} ${selectedSize === s.id ? styles.sizeBtnActive : ""}`}
                  onClick={() => setSelectedSize(s.id)}
                >
                  <div
                    className={styles.sizePreview}
                    style={{
                      aspectRatio: s.ratio,
                      width:  s.id === "landscape" ? "48px" : s.id === "portrait" ? "22px" : "32px",
                      height: s.id === "portrait"  ? "48px" : s.id === "landscape" ? "27px" : "32px",
                    }}
                  />
                  <span>{s.label}</span>
                  <span className={styles.sizeDim}>{s.width}×{s.height}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <button
            className={styles.generateBtn}
            onClick={handleGenerate}
            disabled={!prompt.trim() || isLoading}
          >
            {isLoading
              ? <><span className={styles.spinner} />{t.btn_generating}</>
              : <><span>✨</span>{t.btn_generate}</>
            }
          </button>
        </div>

        {/* Result area */}
        <div
          className={styles.resultArea}
          style={{ aspectRatio: (imageSize ? `${imageSize.width} / ${imageSize.height}` : currentSize.ratio) }}
        >
          {isLoading && (
            <div className={styles.loadingState}>
              <div className={styles.loadingOrb} />
              <div className={styles.loadingOrb2} />
              <p className={styles.loadingText}>{t.loading_title}</p>
              <p className={styles.loadingSubtext}>{t.loading_subtitle}</p>
            </div>
          )}
          {error && (
            <div className={styles.errorState}>
              <span>😿</span>
              <p>{error}</p>
              <p className={styles.errorHint}>{t.error_hint}</p>
            </div>
          )}
          {imageUrl && !isLoading && (
            <div className={styles.imageResult}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={usedPrompt}
                className={styles.generatedImage}
                style={{ aspectRatio: imageSize ? `${imageSize.width} / ${imageSize.height}` : currentSize.ratio }}
              />
              <div className={styles.imageActions}>
                <button onClick={handleDownload} className={styles.downloadBtn}>
                  {t.btn_download}
                </button>
              </div>
            </div>
          )}
          {!imageUrl && !isLoading && !error && (
            <div className={styles.emptyState}>
              <div className={styles.emptyOrb} />
              <span className={styles.emptyIcon}>🌸</span>
              <p>{t.empty_title}</p>
              <p className={styles.emptySubtext}>{t.empty_subtitle}</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats section */}
      {(imageUrl || usage) && !isLoading && (
        <section className={styles.statsSection}>
          {usedPrompt && (
            <div className={styles.imagePromptTag}>
              <span>🔍</span> {usedPrompt}
            </div>
          )}
          {usage && (
            <div className={styles.usageCard}>
              <div className={styles.usageBadge}>{t.usage_badge}</div>
              <div className={styles.usageGrid}>
                <div className={styles.usageStat}>
                  <span className={styles.usageStatVal}>{usage.promptTokens.toLocaleString()}</span>
                  <span className={styles.usageStatLabel}>{t.usage_prompt_tokens}</span>
                </div>
                <div className={styles.usageStat}>
                  <span className={styles.usageStatVal}>{usage.completionTokens.toLocaleString()}</span>
                  <span className={styles.usageStatLabel}>{t.usage_completion_tokens}</span>
                </div>
                <div className={styles.usageStat}>
                  <span className={styles.usageStatVal}>{usage.totalTokens.toLocaleString()}</span>
                  <span className={styles.usageStatLabel}>{t.usage_total_tokens}</span>
                </div>
                <div className={styles.usageStat}>
                  <span className={`${styles.usageStatVal} ${styles.costVal}`}>
                    ${usage.estimatedCostUSD.toFixed(4)}
                  </span>
                  <span className={styles.usageStatLabel}>{t.usage_cost_usd}</span>
                </div>
                <div className={styles.usageStat}>
                  <span className={`${styles.usageStatVal} ${styles.costValTHB}`}>
                    ฿{usage.estimatedCostTHB.toFixed(3)}
                  </span>
                  <span className={styles.usageStatLabel}>{t.usage_cost_thb}</span>
                </div>
              </div>
              <p className={styles.usageNote}>{t.usage_note}</p>
            </div>
          )}
        </section>
      )}

      {/* Features */}
      <section className={styles.features}>
        {[
          { icon: "⚡", title: t.feat1_title, desc: t.feat1_desc },
          { icon: "🎨", title: t.feat2_title, desc: t.feat2_desc },
          { icon: "🔮", title: t.feat3_title, desc: t.feat3_desc },
          { icon: "💜", title: t.feat4_title, desc: t.feat4_desc },
        ].map((f) => (
          <div key={f.title} className={styles.featureCard}>
            <span className={styles.featureIcon}>{f.icon}</span>
            <h3 className={styles.featureTitle}>{f.title}</h3>
            <p className={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </section>

      <footer className={styles.footer}>
        <p>{t.footer}</p>
      </footer>
    </main>
  );
}

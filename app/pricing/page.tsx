"use client";

import { useState } from "react";
import Link from "next/link";
import { LANGUAGES, translations, type LangCode } from "../i18n/translations";
import { pricingTranslations } from "../i18n/pricing-translations";
import styles from "./pricing.module.css";

const PLANS = [
  {
    key: "starter",
    price_monthly: 9,
    price_yearly: 7,
    images: 100,
    color: "blue",
    popular: false,
    features: [
      { key: "feat_images",       available: true,  highlight: true  },
      { key: "feat_models_basic", available: true,  highlight: false },
      { key: "feat_sizes_square", available: true,  highlight: false },
      { key: "feat_quality_std",  available: true,  highlight: false },
      { key: "feat_watermark",    available: true,  highlight: false },
      { key: "feat_history",      available: true,  highlight: false },
      { key: "feat_models_all",   available: false, highlight: false },
      { key: "feat_no_watermark", available: false, highlight: false },
      { key: "feat_api_access",   available: false, highlight: false },
      { key: "feat_commercial",   available: false, highlight: false },
    ],
  },
  {
    key: "pro",
    price_monthly: 19,
    price_yearly: 15,
    images: 500,
    color: "purple",
    popular: true,
    features: [
      { key: "feat_images",          available: true,  highlight: true  },
      { key: "feat_models_all",      available: true,  highlight: false },
      { key: "feat_sizes_all",       available: true,  highlight: false },
      { key: "feat_quality_high",    available: true,  highlight: false },
      { key: "feat_no_watermark",    available: true,  highlight: true  },
      { key: "feat_history",         available: true,  highlight: false },
      { key: "feat_support_email",   available: true,  highlight: false },
      { key: "feat_models_premium",  available: false, highlight: false },
      { key: "feat_api_access",      available: false, highlight: false },
      { key: "feat_commercial",      available: false, highlight: false },
    ],
  },
  {
    key: "ultra",
    price_monthly: 49,
    price_yearly: 39,
    images: 2000,
    color: "pink",
    popular: false,
    features: [
      { key: "feat_images",             available: true, highlight: true  },
      { key: "feat_models_premium",     available: true, highlight: false },
      { key: "feat_sizes_all",          available: true, highlight: false },
      { key: "feat_quality_max",        available: true, highlight: false },
      { key: "feat_no_watermark",       available: true, highlight: false },
      { key: "feat_history_unlimited",  available: true, highlight: true  },
      { key: "feat_support_priority",   available: true, highlight: false },
      { key: "feat_api_access",         available: true, highlight: true  },
      { key: "feat_commercial",         available: true, highlight: true  },
    ],
  },
] as const;

const FAQS = ["faq1", "faq2", "faq3", "faq4"] as const;

export default function PricingPage() {
  const [lang, setLang]         = useState<LangCode>("en");
  const [langOpen, setLangOpen] = useState(false);
  const [yearly, setYearly]     = useState(false);
  const [openFaq, setOpenFaq]   = useState<string | null>(null);

  const t  = translations[lang];
  const pt = pricingTranslations[lang];
  const currentLang = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <main className={styles.main}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      {/* Navbar */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          <span className={styles.logoIcon}>🌸</span>
          <span className={styles.logoText}>PixieDream</span>
        </Link>
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>{t.nav_generate}</Link>
          <Link href="/" className={styles.navLink}>{t.nav_gallery}</Link>
          <Link href="/" className={styles.navLink}>{t.nav_explore}</Link>
          <Link href="/pricing" className={`${styles.navLink} ${styles.navLinkActive}`}>{t.nav_pricing}</Link>
        </div>
        <div className={styles.navRight}>
          <div className={styles.langPicker}>
            <button className={styles.langBtn} onClick={() => setLangOpen((o) => !o)}>
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
                    <span>{l.flag}</span><span>{l.label}</span>
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
        <div className={styles.heroTag}>{pt.hero_tag}</div>
        <h1 className={styles.heroTitle}>{pt.page_title}</h1>
        <p className={styles.heroSubtitle}>{pt.page_subtitle}</p>

        {/* Billing toggle */}
        <div className={styles.billingToggle}>
          <span className={`${styles.billingLabel} ${!yearly ? styles.billingLabelActive : ""}`}>
            {pt.billing_monthly}
          </span>
          <button
            className={`${styles.toggleTrack} ${yearly ? styles.toggleTrackOn : ""}`}
            onClick={() => setYearly((y) => !y)}
            aria-label="Toggle yearly billing"
          >
            <span className={`${styles.toggleThumb} ${yearly ? styles.toggleThumbOn : ""}`} />
          </button>
          <span className={`${styles.billingLabel} ${yearly ? styles.billingLabelActive : ""}`}>
            {pt.billing_yearly}
          </span>
          {yearly && <span className={styles.saveBadge}>{pt.save_badge}</span>}
        </div>

        <div className={styles.sparkle1}>✦</div>
        <div className={styles.sparkle2}>★</div>
        <div className={styles.sparkle3}>✦</div>
      </section>

      {/* Plans grid */}
      <section className={styles.plansSection}>
        {PLANS.map((plan) => {
          const price = yearly ? plan.price_yearly : plan.price_monthly;
          const nameKey = `plan_${plan.key}` as keyof typeof pt;
          const tagKey  = `tag_${plan.key}`  as keyof typeof pt;

          return (
            <div
              key={plan.key}
              className={`${styles.planCard} ${styles[`planCard_${plan.color}`]} ${plan.popular ? styles.planCardPopular : ""}`}
            >
              {plan.popular && (
                <div className={styles.popularBadge}>
                  <span>⭐</span> {pt.most_popular}
                </div>
              )}

              <div className={styles.planHeader}>
                <div className={styles.planEmoji}>
                  {plan.key === "starter" ? "🌱" : plan.key === "pro" ? "🚀" : "👑"}
                </div>
                <h2 className={styles.planName}>{pt[nameKey]}</h2>
                <p className={styles.planTag}>{pt[tagKey]}</p>
              </div>

              <div className={styles.planPrice}>
                <span className={styles.priceCurrency}>$</span>
                <span className={styles.priceAmount}>{price}</span>
                <span className={styles.pricePer}>
                  {yearly ? pt.per_month_billed : pt.per_month}
                </span>
              </div>

              {/* Images highlight */}
              <div className={styles.imagesHighlight}>
                <span className={styles.imagesCount}>
                  {plan.images.toLocaleString()}
                </span>
                <span className={styles.imagesLabel}>{pt.feat_images}</span>
              </div>

              <ul className={styles.featureList}>
                {plan.features.map((f) => {
                  const fKey = f.key as keyof typeof pt;
                  return (
                    <li
                      key={f.key}
                      className={`${styles.featureItem} ${!f.available ? styles.featureItemDisabled : ""} ${f.highlight && f.available ? styles.featureItemHighlight : ""}`}
                    >
                      <span className={styles.featureIcon}>
                        {f.available ? "✓" : "✕"}
                      </span>
                      <span>{pt[fKey]}</span>
                    </li>
                  );
                })}
              </ul>

              <button className={`${styles.planBtn} ${styles[`planBtn_${plan.color}`]}`}>
                {plan.key === "ultra" ? pt.btn_subscribe : pt.btn_get_started}
              </button>
            </div>
          );
        })}
      </section>

      {/* Guarantee strip */}
      <div className={styles.guaranteeStrip}>
        <p>{pt.guarantee}</p>
      </div>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <h2 className={styles.faqTitle}>{pt.faq_title}</h2>
        <div className={styles.faqList}>
          {FAQS.map((key) => {
            const qKey = `${key}_q` as keyof typeof pt;
            const aKey = `${key}_a` as keyof typeof pt;
            const isOpen = openFaq === key;
            return (
              <div key={key} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(isOpen ? null : key)}
                >
                  <span>{pt[qKey]}</span>
                  <span className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ""}`}>▾</span>
                </button>
                {isOpen && (
                  <div className={styles.faqAnswer}>
                    <p>{pt[aKey]}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>{t.footer}</p>
      </footer>
    </main>
  );
}

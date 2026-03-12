export type LangCode = "en" | "th" | "zh" | "es" | "ja" | "ko";

export const LANGUAGES: { code: LangCode; label: string; flag: string }[] = [
  { code: "en", label: "English",  flag: "🇬🇧" },
  { code: "th", label: "ไทย",      flag: "🇹🇭" },
  { code: "zh", label: "中文",      flag: "🇨🇳" },
  { code: "es", label: "Español",  flag: "🇪🇸" },
  { code: "ja", label: "日本語",    flag: "🇯🇵" },
  { code: "ko", label: "한국어",    flag: "🇰🇷" },
];

export interface Translation {
  // Navbar
  nav_generate: string;
  nav_gallery: string;
  nav_explore: string;
  nav_pricing: string;
  nav_signin: string;

  // Hero
  hero_tag: string;
  hero_title_transform: string;
  hero_title_mid: string;
  hero_title_stunning: string;
  hero_subtitle: string;

  // Generator card
  label_describe: string;
  placeholder_describe: string;
  hint_ctrl_enter: string;
  label_try: string;
  label_model: string;
  label_style: string;
  label_size: string;

  // Style labels
  style_free: string;
  style_anime: string;
  style_photo: string;
  style_watercolor: string;
  style_cyberpunk: string;
  style_fantasy: string;
  style_kawaii: string;

  // Model descs
  model_best_fast: string;
  model_ultra_fast: string;
  model_balanced: string;
  model_high_quality: string;
  model_google: string;
  model_openai: string;

  // Buttons
  btn_generate: string;
  btn_generating: string;
  btn_download: string;

  // States
  empty_title: string;
  empty_subtitle: string;
  loading_title: string;
  loading_subtitle: string;
  error_hint: string;

  // Example prompts
  example1: string;
  example2: string;
  example3: string;
  example4: string;

  // Usage card
  usage_badge: string;
  usage_prompt_tokens: string;
  usage_completion_tokens: string;
  usage_total_tokens: string;
  usage_cost_usd: string;
  usage_cost_thb: string;
  usage_note: string;

  // Features
  feat1_title: string;
  feat1_desc: string;
  feat2_title: string;
  feat2_desc: string;
  feat3_title: string;
  feat3_desc: string;
  feat4_title: string;
  feat4_desc: string;

  // Footer
  footer: string;
}

export const translations: Record<LangCode, Translation> = {
  en: {
    nav_generate: "✨ Generate",
    nav_gallery: "Gallery",
    nav_explore: "Explore",
    nav_pricing: "Pricing",
    nav_signin: "Sign In ✨",

    hero_tag: "Powered by OpenRouter AI",
    hero_title_transform: "Transform",
    hero_title_mid: "your ideas into",
    hero_title_stunning: "stunning visuals",
    hero_subtitle: "Type your dream, and let AI bring it to life ✨",

    label_describe: "Describe your image",
    placeholder_describe: "e.g. A magical forest with glowing mushrooms and fairy lights...",
    hint_ctrl_enter: "Ctrl+Enter to generate",
    label_try: "💡 Try:",
    label_model: "AI Model",
    label_style: "Art Style",
    label_size: "Image Size",

    style_free: "Free Style",
    style_anime: "Anime",
    style_photo: "Photo Real",
    style_watercolor: "Watercolor",
    style_cyberpunk: "Cyberpunk",
    style_fantasy: "Fantasy",
    style_kawaii: "Kawaii",

    model_best_fast: "Best & fast",
    model_ultra_fast: "Ultra fast",
    model_balanced: "Balanced",
    model_high_quality: "High quality",
    model_google: "Google",
    model_openai: "OpenAI",

    btn_generate: "Generate Image",
    btn_generating: "Generating...",
    btn_download: "⬇️ Download",

    empty_title: "Your image will appear here",
    empty_subtitle: "Enter a description and click Generate ✨",
    loading_title: "✨ AI is painting for you...",
    loading_subtitle: "May take 10–30 seconds",
    error_hint: "Please check OPENROUTER_API_KEY in .env.local",

    example1: "A magical forest with glowing mushrooms and fairy lights at night",
    example2: "Cute cat astronaut floating in colorful nebula space",
    example3: "Japanese cherry blossom garden with a golden temple",
    example4: "Crystal dragon flying over a rainbow waterfall",

    usage_badge: "📊 Usage & Cost",
    usage_prompt_tokens: "Prompt Tokens",
    usage_completion_tokens: "Completion Tokens",
    usage_total_tokens: "Total Tokens",
    usage_cost_usd: "Est. Cost (USD)",
    usage_cost_thb: "Est. Cost (THB)",
    usage_note: "💡 Estimated cost per image · Used to calculate user credits",

    feat1_title: "Super Fast",
    feat1_desc: "Generate in seconds with multiple AI models",
    feat2_title: "Multiple Styles",
    feat2_desc: "Anime, realistic, watercolor, cyberpunk & more",
    feat3_title: "High Quality",
    feat3_desc: "Up to 1344×1344px stunning resolution",
    feat4_title: "Free to Try",
    feat4_desc: "No credit card needed to get started",

    footer: "Made with 💜 by PixieDream · Powered by OpenRouter AI",
  },

  th: {
    nav_generate: "✨ สร้างภาพ",
    nav_gallery: "แกลเลอรี",
    nav_explore: "สำรวจ",
    nav_pricing: "ราคา",
    nav_signin: "เข้าสู่ระบบ ✨",

    hero_tag: "ขับเคลื่อนโดย OpenRouter AI",
    hero_title_transform: "เปลี่ยน",
    hero_title_mid: "ความคิดให้กลายเป็น",
    hero_title_stunning: "ภาพที่สวยงาม",
    hero_subtitle: "พิมพ์ความฝันของคุณ แล้วให้ AI วาดให้เป็นความจริง ✨",

    label_describe: "อธิบายภาพที่ต้องการ",
    placeholder_describe: "เช่น ป่าวิเศษที่มีเห็ดเรืองแสงและไฟกระพริบยามค่ำคืน...",
    hint_ctrl_enter: "Ctrl+Enter เพื่อสร้างภาพ",
    label_try: "💡 ลองดู:",
    label_model: "AI Model",
    label_style: "สไตล์งานศิลป์",
    label_size: "ขนาดภาพ",

    style_free: "อิสระ",
    style_anime: "อนิเมะ",
    style_photo: "ถ่ายภาพจริง",
    style_watercolor: "สีน้ำ",
    style_cyberpunk: "ไซเบอร์พังค์",
    style_fantasy: "แฟนตาซี",
    style_kawaii: "คาวาอิ",

    model_best_fast: "ดีที่สุด & เร็ว",
    model_ultra_fast: "เร็วมาก",
    model_balanced: "สมดุล",
    model_high_quality: "คุณภาพสูง",
    model_google: "Google",
    model_openai: "OpenAI",

    btn_generate: "สร้างภาพ",
    btn_generating: "กำลังสร้างภาพ...",
    btn_download: "⬇️ ดาวน์โหลด",

    empty_title: "ภาพของคุณจะปรากฏที่นี่",
    empty_subtitle: "พิมพ์คำอธิบายและกด สร้างภาพ ✨",
    loading_title: "✨ AI กำลังวาดภาพให้คุณ...",
    loading_subtitle: "อาจใช้เวลา 10–30 วินาที",
    error_hint: "กรุณาตรวจสอบ OPENROUTER_API_KEY ใน .env.local",

    example1: "ป่าวิเศษที่มีเห็ดเรืองแสงและไฟกระพริบยามค่ำคืน",
    example2: "แมวน้อยนักบินอวกาศลอยอยู่ในเนบิวลาสีสันสดใส",
    example3: "สวนซากุระญี่ปุ่นพร้อมวัดทองอร่ามกลางธรรมชาติ",
    example4: "มังกรคริสตัลบินเหนือน้ำตกสายรุ้งสวยงาม",

    usage_badge: "📊 การใช้งานและค่าใช้จ่าย",
    usage_prompt_tokens: "Prompt Tokens",
    usage_completion_tokens: "Completion Tokens",
    usage_total_tokens: "Total Tokens",
    usage_cost_usd: "ราคาประมาณ (USD)",
    usage_cost_thb: "ราคาประมาณ (THB)",
    usage_note: "💡 ราคาโดยประมาณต่อภาพ · ใช้สำหรับคำนวณ credit ที่จะเรียกเก็บจาก user",

    feat1_title: "รวดเร็วมาก",
    feat1_desc: "สร้างภาพภายในไม่กี่วินาทีด้วย AI หลายโมเดล",
    feat2_title: "หลากหลายสไตล์",
    feat2_desc: "อนิเมะ, ถ่ายภาพจริง, สีน้ำ, ไซเบอร์พังค์ และอื่นๆ",
    feat3_title: "คุณภาพสูง",
    feat3_desc: "ความละเอียดสูงสุด 1344×1344 พิกเซล",
    feat4_title: "ลองใช้ฟรี",
    feat4_desc: "ไม่ต้องใช้บัตรเครดิตในการเริ่มต้น",

    footer: "สร้างด้วย 💜 โดย PixieDream · ขับเคลื่อนโดย OpenRouter AI",
  },

  zh: {
    nav_generate: "✨ 生成图像",
    nav_gallery: "画廊",
    nav_explore: "探索",
    nav_pricing: "价格",
    nav_signin: "登录 ✨",

    hero_tag: "由 OpenRouter AI 驱动",
    hero_title_transform: "将",
    hero_title_mid: "你的想法变成",
    hero_title_stunning: "震撼视觉",
    hero_subtitle: "输入你的梦想，让 AI 将其变为现实 ✨",

    label_describe: "描述你的图像",
    placeholder_describe: "例如：夜晚发光蘑菇和仙灯的魔法森林...",
    hint_ctrl_enter: "Ctrl+Enter 生成图像",
    label_try: "💡 试试：",
    label_model: "AI 模型",
    label_style: "艺术风格",
    label_size: "图像尺寸",

    style_free: "自由风格",
    style_anime: "动漫",
    style_photo: "写实照片",
    style_watercolor: "水彩画",
    style_cyberpunk: "赛博朋克",
    style_fantasy: "奇幻",
    style_kawaii: "可爱风",

    model_best_fast: "最佳且快速",
    model_ultra_fast: "超高速",
    model_balanced: "均衡",
    model_high_quality: "高质量",
    model_google: "谷歌",
    model_openai: "OpenAI",

    btn_generate: "生成图像",
    btn_generating: "生成中...",
    btn_download: "⬇️ 下载",

    empty_title: "您的图像将在此处显示",
    empty_subtitle: "输入描述并点击生成 ✨",
    loading_title: "✨ AI 正在为您绘制...",
    loading_subtitle: "可能需要 10–30 秒",
    error_hint: "请检查 .env.local 中的 OPENROUTER_API_KEY",

    example1: "夜晚魔法森林中发光的蘑菇和仙灯",
    example2: "可爱的猫咪宇航员漂浮在五彩星云中",
    example3: "日本樱花园与金色神殿",
    example4: "水晶龙飞越彩虹瀑布",

    usage_badge: "📊 使用量与费用",
    usage_prompt_tokens: "提示词 Token",
    usage_completion_tokens: "完成 Token",
    usage_total_tokens: "总 Token",
    usage_cost_usd: "预估费用（USD）",
    usage_cost_thb: "预估费用（THB）",
    usage_note: "💡 每张图片的预估费用 · 用于计算用户积分",

    feat1_title: "超快速度",
    feat1_desc: "多种 AI 模型，几秒内生成图像",
    feat2_title: "多种风格",
    feat2_desc: "动漫、写实、水彩、赛博朋克等",
    feat3_title: "高质量",
    feat3_desc: "最高 1344×1344 像素分辨率",
    feat4_title: "免费试用",
    feat4_desc: "无需信用卡即可开始",

    footer: "由 PixieDream 用 💜 制作 · 由 OpenRouter AI 驱动",
  },

  es: {
    nav_generate: "✨ Generar",
    nav_gallery: "Galería",
    nav_explore: "Explorar",
    nav_pricing: "Precios",
    nav_signin: "Iniciar sesión ✨",

    hero_tag: "Impulsado por OpenRouter AI",
    hero_title_transform: "Transforma",
    hero_title_mid: "tus ideas en",
    hero_title_stunning: "imágenes increíbles",
    hero_subtitle: "Escribe tu sueño y deja que la IA lo haga realidad ✨",

    label_describe: "Describe tu imagen",
    placeholder_describe: "ej. Un bosque mágico con hongos brillantes y luces de hadas...",
    hint_ctrl_enter: "Ctrl+Enter para generar",
    label_try: "💡 Prueba:",
    label_model: "Modelo IA",
    label_style: "Estilo artístico",
    label_size: "Tamaño de imagen",

    style_free: "Libre",
    style_anime: "Anime",
    style_photo: "Fotorrealista",
    style_watercolor: "Acuarela",
    style_cyberpunk: "Cyberpunk",
    style_fantasy: "Fantasía",
    style_kawaii: "Kawaii",

    model_best_fast: "El mejor y rápido",
    model_ultra_fast: "Ultra rápido",
    model_balanced: "Equilibrado",
    model_high_quality: "Alta calidad",
    model_google: "Google",
    model_openai: "OpenAI",

    btn_generate: "Generar imagen",
    btn_generating: "Generando...",
    btn_download: "⬇️ Descargar",

    empty_title: "Tu imagen aparecerá aquí",
    empty_subtitle: "Ingresa una descripción y haz clic en Generar ✨",
    loading_title: "✨ La IA está pintando para ti...",
    loading_subtitle: "Puede tardar 10–30 segundos",
    error_hint: "Por favor verifica OPENROUTER_API_KEY en .env.local",

    example1: "Un bosque mágico con hongos brillantes y luces de hadas de noche",
    example2: "Astronauta gato flotando en una colorida nebulosa espacial",
    example3: "Jardín japonés de cerezos con un templo dorado",
    example4: "Dragón de cristal volando sobre una cascada arcoíris",

    usage_badge: "📊 Uso y Costo",
    usage_prompt_tokens: "Tokens de solicitud",
    usage_completion_tokens: "Tokens de respuesta",
    usage_total_tokens: "Total de tokens",
    usage_cost_usd: "Costo estimado (USD)",
    usage_cost_thb: "Costo estimado (THB)",
    usage_note: "💡 Costo estimado por imagen · Para calcular créditos de usuario",

    feat1_title: "Ultra rápido",
    feat1_desc: "Genera en segundos con múltiples modelos de IA",
    feat2_title: "Múltiples estilos",
    feat2_desc: "Anime, realista, acuarela, cyberpunk y más",
    feat3_title: "Alta calidad",
    feat3_desc: "Resolución increíble hasta 1344×1344px",
    feat4_title: "Prueba gratis",
    feat4_desc: "Sin tarjeta de crédito para empezar",

    footer: "Hecho con 💜 por PixieDream · Impulsado por OpenRouter AI",
  },

  ja: {
    nav_generate: "✨ 生成する",
    nav_gallery: "ギャラリー",
    nav_explore: "探索",
    nav_pricing: "料金",
    nav_signin: "サインイン ✨",

    hero_tag: "OpenRouter AI 搭載",
    hero_title_transform: "アイデアを",
    hero_title_mid: "",
    hero_title_stunning: "美しいビジュアルに",
    hero_subtitle: "夢を入力して、AIが現実にしてくれます ✨",

    label_describe: "画像を説明してください",
    placeholder_describe: "例：夜に光るキノコと妖精の光がある魔法の森...",
    hint_ctrl_enter: "Ctrl+Enter で生成",
    label_try: "💡 試してみて：",
    label_model: "AIモデル",
    label_style: "アートスタイル",
    label_size: "画像サイズ",

    style_free: "フリースタイル",
    style_anime: "アニメ",
    style_photo: "フォトリアル",
    style_watercolor: "水彩画",
    style_cyberpunk: "サイバーパンク",
    style_fantasy: "ファンタジー",
    style_kawaii: "かわいい",

    model_best_fast: "最高・高速",
    model_ultra_fast: "超高速",
    model_balanced: "バランス",
    model_high_quality: "高品質",
    model_google: "Google",
    model_openai: "OpenAI",

    btn_generate: "画像を生成",
    btn_generating: "生成中...",
    btn_download: "⬇️ ダウンロード",

    empty_title: "ここに画像が表示されます",
    empty_subtitle: "説明を入力して生成をクリック ✨",
    loading_title: "✨ AIがあなたのために描いています...",
    loading_subtitle: "10〜30秒かかる場合があります",
    error_hint: ".env.local の OPENROUTER_API_KEY を確認してください",

    example1: "夜に光るキノコと妖精の光がある魔法の森",
    example2: "カラフルな星雲の宇宙を漂う可愛い猫の宇宙飛行士",
    example3: "金色の神社がある日本の桜の庭園",
    example4: "虹の滝の上を飛ぶクリスタルドラゴン",

    usage_badge: "📊 使用量とコスト",
    usage_prompt_tokens: "プロンプトトークン",
    usage_completion_tokens: "補完トークン",
    usage_total_tokens: "合計トークン",
    usage_cost_usd: "推定コスト（USD）",
    usage_cost_thb: "推定コスト（THB）",
    usage_note: "💡 1枚あたりの推定コスト · ユーザークレジット計算用",

    feat1_title: "超高速",
    feat1_desc: "複数のAIモデルで数秒で生成",
    feat2_title: "多様なスタイル",
    feat2_desc: "アニメ、リアル、水彩、サイバーパンクなど",
    feat3_title: "高品質",
    feat3_desc: "最大1344×1344pxの高解像度",
    feat4_title: "無料で試せる",
    feat4_desc: "クレジットカード不要で開始",

    footer: "💜 を込めて PixieDream が制作 · OpenRouter AI 搭載",
  },

  ko: {
    nav_generate: "✨ 생성하기",
    nav_gallery: "갤러리",
    nav_explore: "탐색",
    nav_pricing: "가격",
    nav_signin: "로그인 ✨",

    hero_tag: "OpenRouter AI 구동",
    hero_title_transform: "아이디어를",
    hero_title_mid: "",
    hero_title_stunning: "멋진 비주얼로",
    hero_subtitle: "꿈을 입력하면 AI가 현실로 만들어 드립니다 ✨",

    label_describe: "이미지를 설명하세요",
    placeholder_describe: "예: 밤에 빛나는 버섯과 요정 불빛이 있는 마법의 숲...",
    hint_ctrl_enter: "Ctrl+Enter 로 생성",
    label_try: "💡 시도해보세요:",
    label_model: "AI 모델",
    label_style: "아트 스타일",
    label_size: "이미지 크기",

    style_free: "자유 스타일",
    style_anime: "애니메이션",
    style_photo: "포토 리얼",
    style_watercolor: "수채화",
    style_cyberpunk: "사이버펑크",
    style_fantasy: "판타지",
    style_kawaii: "카와이",

    model_best_fast: "최고 & 빠름",
    model_ultra_fast: "초고속",
    model_balanced: "균형",
    model_high_quality: "고품질",
    model_google: "Google",
    model_openai: "OpenAI",

    btn_generate: "이미지 생성",
    btn_generating: "생성 중...",
    btn_download: "⬇️ 다운로드",

    empty_title: "이미지가 여기에 표시됩니다",
    empty_subtitle: "설명을 입력하고 생성을 클릭하세요 ✨",
    loading_title: "✨ AI가 그림을 그리고 있습니다...",
    loading_subtitle: "10~30초 정도 소요될 수 있습니다",
    error_hint: ".env.local 에서 OPENROUTER_API_KEY를 확인하세요",

    example1: "밤에 빛나는 버섯과 요정 불빛이 있는 마법의 숲",
    example2: "화려한 성운 우주를 떠다니는 귀여운 고양이 우주비행사",
    example3: "황금 사원이 있는 일본 벚꽃 정원",
    example4: "무지개 폭포 위를 나는 수정 드래곤",

    usage_badge: "📊 사용량 & 비용",
    usage_prompt_tokens: "프롬프트 토큰",
    usage_completion_tokens: "완성 토큰",
    usage_total_tokens: "총 토큰",
    usage_cost_usd: "예상 비용 (USD)",
    usage_cost_thb: "예상 비용 (THB)",
    usage_note: "💡 이미지당 예상 비용 · 사용자 크레딧 계산용",

    feat1_title: "초고속",
    feat1_desc: "여러 AI 모델로 몇 초 만에 생성",
    feat2_title: "다양한 스타일",
    feat2_desc: "애니메이션, 사실적, 수채화, 사이버펑크 등",
    feat3_title: "고품질",
    feat3_desc: "최대 1344×1344px 고해상도",
    feat4_title: "무료 체험",
    feat4_desc: "신용카드 없이 시작 가능",

    footer: "💜 PixieDream 제작 · OpenRouter AI 구동",
  },
};

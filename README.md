# PixieDream ✨ - AI Image Generator

เว็บ AI Text-to-Image สุดน่ารัก ธีม Kawaii Pastel พัฒนาด้วย Next.js 14 + OpenRouter

## 🚀 วิธีติดตั้ง

### 1. ติดตั้ง dependencies
```bash
npm install
```

### 2. ตั้งค่า API Key
สมัครฟรีที่ [OpenRouter](https://openrouter.ai/keys) แล้วก็อปปี้ API key

```bash
cp .env.local.example .env.local
```

เปิดไฟล์ `.env.local` และใส่ API key:
```
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. รัน development server
```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

## 🎨 Features

- **Text-to-Image** — พิมพ์ prompt แล้ว AI จะวาดให้
- **4 AI Models** — FLUX Schnell / Dev / Pro / SDXL (via OpenRouter)
- **6 Art Styles** — Anime, Photorealistic, Watercolor, Cyberpunk, Fantasy, Kawaii
- **3 Sizes** — Square (1:1), Landscape (16:9), Portrait (9:16)
- **Download** — โหลดภาพได้เลย

## 🤖 Models ที่รองรับ

| Model | OpenRouter ID | คำอธิบาย |
|---|---|---|
| ⚡ FLUX Schnell | `black-forest-labs/flux-schnell` | เร็วสุด ราคาถูก |
| 🔮 FLUX Dev | `black-forest-labs/flux-dev` | สมดุลระหว่างเร็วกับคุณภาพ |
| 👑 FLUX Pro | `black-forest-labs/flux-1.1-pro` | คุณภาพดีที่สุด |
| 🖼️ SDXL | `stability-ai/sdxl` | Classic Stable Diffusion |

## 📁 โครงสร้างไฟล์

```
app/
├── page.tsx          # Main UI + Model selector
├── page.module.css   # Kawaii styles
├── layout.tsx        # Root layout
├── globals.css       # Global styles
└── api/
    └── generate/
        └── route.ts  # API → OpenRouter
```

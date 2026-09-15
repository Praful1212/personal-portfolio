# Praful Saxena — Personal Portfolio Website

> **Executive Data Strategy & Senior Data Engineering Portfolio**  
> Custom Domain: [www.prafulsaxena.com](https://www.prafulsaxena.com)  
> Live Repository: [https://github.com/Praful1212/personal-portfolio](https://github.com/Praful1212/personal-portfolio)

---

## 🌟 Overview

A modern, high-performance, dark-mode portfolio engineered to showcase Praful Saxena's professional journey, streaming architectures, GenAI/RAG operational platforms, and executive data impact.

### ✨ Key Features:
- **Executive Design System**: Custom dark-mode aesthetic with ambient mesh glows, glassmorphic cards, and sleek typography (`Outfit`, `Plus Jakarta Sans`, `JetBrains Mono`).
- **Interactive Architecture Deep Dives**: Detailed case studies with CSS-rendered topology diagrams for:
  - *Autonomous AI-Powered Ops Monitoring & RCA Platform* (FastAPI, ChromaDB RAG, Spark/YARN failure detection, Slack bot).
  - *Real-Time Customer Location Enrichment Stream* (Apache Kafka, PySpark, GeoHash, CleverTap).
- **Quantified Impact Metrics**: Animated counters highlighting 99% uptime SLA, 40% ETL cost reduction, 35% runtime cut, and sub-minute automated RCA.
- **Interactive Resume Modal & One-Click PDF Download**: Direct integration of Praful's official resume PDF.
- **Recruiter Quick Connect**: 1-click clipboard copy for email & phone, direct social links (LinkedIn, GitHub), and quick-contact form.
- **100% Zero-Dependency Static Build**: Blazing fast, SEO-optimized with Schema.org Person JSON-LD, OpenGraph tags, and mobile responsiveness.

---

## 🚀 How to Preview Locally

You can preview the website locally using any static web server:

### Option 1: Python Built-in Server
```bash
python -m http.server 8080
```
Open your browser at `http://localhost:8080`.

### Option 2: Node.js (npx serve)
```bash
npx serve .
```

---

## 🌐 Publishing to GitHub Pages & Connecting `www.prafulsaxena.com`

Since this repository is already linked to `https://github.com/Praful1212/personal-portfolio.git`, you can publish it in 3 simple steps:

### 1. Commit and Push to GitHub
```bash
git add .
git commit -m "feat: complete executive portfolio website for Praful Saxena"
git push origin main
```

### 2. Enable GitHub Pages
1. Go to your repository settings on GitHub:  
   `https://github.com/Praful1212/personal-portfolio/settings/pages`
2. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
3. Select branch `main` and folder `/ (root)`, then click **Save**.
4. GitHub Pages will build and deploy the website within ~60 seconds at `https://praful1212.github.io/personal-portfolio/`.

### 3. Connect Custom Domain (`www.prafulsaxena.com`)
1. The repository already contains a `CNAME` file pointing to `www.prafulsaxena.com`.
2. In GitHub repository **Settings > Pages > Custom domain**, ensure `www.prafulsaxena.com` is entered, and check **Enforce HTTPS**.
3. In your domain registrar (GoDaddy, Namecheap, Google Domains/Squarespace, or Cloudflare), configure the following DNS records:
   - **CNAME Record**: Host `www` → points to `praful1212.github.io`
   - **A Records** (for apex domain `prafulsaxena.com`):
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

---

## 📁 Project Structure

```
personal-portfolio/
├── assets/
│   ├── docs/
│   │   └── Praful_Saxena_Resume.pdf    # Official Resume PDF
│   └── images/
│       └── praful.jpg                  # Profile Photo
├── CNAME                               # Domain configuration for www.prafulsaxena.com
├── index.html                          # Semantic HTML5 & Schema.org markup
├── style.css                           # Vanilla CSS Design System & Responsive layout
├── script.js                           # IntersectionObserver, animated counters, modal logic
└── README.md                           # Documentation & Deployment Guide
```

# Koin — Account Manager

A modern personal finance app for managing recurring accounts, tracking expenses, and visualizing cash flow over time.

## ✨ Features

-  **Account Management** — Full CRUD with tags, recurrence, and metadata
-  **Cash Flow Projection** — Visualize past months, current month, and the next 12 months
-  **Search & Filtering** — Text search and  filters by due date, status and tags
- **Notification Engine** — Automatic reminders via Email and Telegram
-  **Dark/Light Mode** — Persistent theme with smooth UX feedback (skeletons, toasts)

## 🧱 Tech Stack

| Concern | Technology |
|---|---|
| Framework | Next.js|
| Language | TypeScript |
| Styling | Tailwind CSS |
| Client State | Zustand |
| Server State | React Query |
| Forms & Validation | React Hook Form + Zod |
| i18n | next-intl |
| Testing | Vitest |
| Design system | Storybook |
| Auth | Supabase |


## 🏗️ Folder Architecture

This project follows **[Feature-Sliced Design (FSD)](https://feature-sliced.design)** — a methodology that organizes code by business domain and responsibility, not by file type.

```
app → pages → widgets → features → entities → shared
```

| Layer | Responsibility |
|---|---|
| `app` | providers, global styles, initialization |
| `pages` | Route-level composition — thin, only assembles widgets |
| `widgets` | Large self-contained UI blocks. feature + entity |
| `features` | User actions that bring business value (create, filter, pay) |
| `entities` | Core business models: `account`, `tag`, `user` |
| `shared` | Generic, domain-agnostic UI, utilities, and config |

Each layer can only import from layers **below** it. Each slice exposes a public API via `index.ts`.

> For deeper technical details, see [`docs/SYSTEM-DESIGN.md`](./docs/SYSTEM-DESIGN.md).


## 📦 Getting Started

**Prerequisites:** Node.js 18+, npm

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 🔗 Links

- 🎨 [Figma Design](https://www.figma.com/design/GWidckpZ8NDvWXEQnsXgmU/Untitled)
- 🧠 [High-Level Architecture Wireframe](https://gemini.google.com/share/d4dfaa223f0e)
- 📖 [System Design Document](./docs/SYSTEM-DESIGN.md)
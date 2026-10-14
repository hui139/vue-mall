# Yungoo Mall · Front-end Only E-commerce Platform

**English** | [简体中文](./README.md)

A complete, runnable e-commerce front-end demo project with **no backend service whatsoever**. All product, user, and order data comes from static data files inside the repository, while user-generated state (cart, favorites, addresses) is persisted in the browser's `localStorage`.

It is well suited for learning Vue 3 project organization, Pinia state management, component-driven development, and e-commerce business flows.

## Tech Stack

| Category | Choice |
| --- | --- |
| Framework | Vue 3 (Composition API + `<script setup>`) |
| Build | Vite 6 |
| Routing | Vue Router 4 (hash mode, zero-config static deployment) |
| State | Pinia 2 |
| UI | Element Plus 2 + @element-plus/icons-vue |
| Styling | Plain CSS + CSS-variable design tokens, no CSS framework |
| Charts | No chart library — pure CSS (bar chart / donut chart) |
| Persistence | localStorage (with in-memory fallback) |

## Quick Start

```bash
# 1. Install dependencies
pnpm install          # or npm install / yarn

# 2. Start the dev server
pnpm dev              # defaults to http://127.0.0.1:5173

# 3. Build for production
pnpm build            # output goes to dist/

# 4. Preview the production build locally
pnpm preview
```

> On Windows with pnpm, if you hit a prompt about esbuild's build script being blocked,
> run `pnpm approve-builds` to allow esbuild, or switch to `npm install`.

## Demo Account

| Username | Password |
| --- | --- |
| `demo` | `123456` |

You can also use the "Register" page — any username of 2–16 characters plus a password of 6+ characters creates a local account.

## Data Volume

| Data | Count |
| --- | --- |
| Products | 89 items across 9 business categories |
| Initial orders | 14 orders (spanning 6 months, covering all 5 statuses) |
| Coupons | 15 |
| Home banners | 6 |
| Brand wall | 10 brands |
| Upcoming releases | 4 |

## Features

**Product Browsing**
- Home: carousel banners, category grid, platform data overview, flash sale (with countdown and progress bar), authorized brand wall, upcoming releases, coupon center, best-seller ranking, 9 category floors, recommendations
- Product list: category switching, keyword search, price-range filter, 5 sort modes, 20/40/60 items per page, grid/list dual view, pagination — filter state syncs to the URL for sharing
- Product detail: image gallery, price, stock, color/spec selection, quantity stepper, spec table, related products
- Search: search history (stored locally), trending keywords, result sorting

**Data Dashboard**
- Metric cards: total spend, order count, average order value, items purchased, categories covered, total savings
- Monthly spending bar chart (toggle between last 6 / 12 months, hover for details)
- Category spending donut chart with legend
- Order status breakdown (horizontal bars), top purchased products (TOP 8)
- Product price-band distribution, category distribution (with per-category average price)

**Transaction Flow**
- Cart: multi-select, select all, quantity adjustment (bounded by stock), live subtotal, delete, bulk delete, shipping calculation (free over ¥99)
- Checkout: address selection and CRUD, coupon selection, order notes, cost breakdown, order submission
- Cashier: 4 payment methods, simulated payment success/failure, order cancellation, payment result page
- Orders: status tabs (pending payment / pending shipment / in transit / completed), pay, confirm receipt, cancel, order detail

**User Center**
- Login / register (locally simulated, with form validation)
- Profile and asset overview, spending overview (with a 6-month mini trend chart)
- Shipping address management (CRUD, set as default)
- Coupon wallet (15 coupons)
- Favorites and browsing history (up to 20 entries)

## Interface Form Factor

This is a **desktop (PC Web)** e-commerce site, laid out for desktop browsers:

- The top is a three-tier navigation: gray utility bar → logo and search area → category nav bar
- The bottom is an informational footer (service promises, link groups, copyright); there is **no mobile bottom tab bar**
- The product area uses a fixed 5-column grid with no responsive fallback
- `AppLayout` sets `min-width: 1100px`, so a narrow window produces horizontal scrolling rather than a collapsed layout

> A mobile or app form factor would require separate responsive work or packaging with Capacitor — this project does not include either.

## Project Structure

```
.
├── index.html
├── vite.config.js
├── package.json
└── src
    ├── main.js                 # App entry: registers Pinia / Router / Element Plus
    ├── App.vue                 # Root component, only hosts the router outlet
    ├── router/index.js         # Route table + auth guard + title handling
    ├── layouts/AppLayout.vue   # Global layout: header + content + footer
    ├── views/                  # Page components (one per route)
    │   ├── HomeView.vue            Home
    │   ├── ProductListView.vue     Product list (filter / sort / pagination / view mode)
    │   ├── ProductDetailView.vue   Product detail
    │   ├── SearchView.vue          Search
    │   ├── CartView.vue            Cart
    │   ├── CheckoutView.vue        Checkout
    │   ├── PayView.vue             Cashier
    │   ├── OrderListView.vue       Order list
    │   ├── OrderDetailView.vue     Order detail
    │   ├── DashboardView.vue       Data dashboard (spending stats / charts)
    │   ├── UserCenterView.vue      User center
    │   ├── FavoriteView.vue        Favorites
    │   ├── HistoryView.vue         Browsing history
    │   ├── AddressView.vue         Shipping addresses
    │   ├── CouponView.vue          Coupons
    │   ├── LoginView.vue           Login / register
    │   └── NotFoundView.vue        404
    ├── components
    │   ├── layout/AppHeader.vue        Three-tier header navigation
    │   ├── layout/AppFooter.vue        Informational footer
    │   └── common/                     Shared components
    │       ├── ProductCard.vue         Product card (grid / horizontal layouts)
    │       ├── PriceTag.vue            Price display (separate font sizes for int/dec)
    │       ├── StepperInput.vue        Quantity stepper
    │       ├── EmptyState.vue          Empty state
    │       └── DialogShell.vue         Dialog shell
    ├── stores                 # Pinia state
    │   ├── user.js                Auth state / profile / shipping addresses
    │   ├── cart.js                Shopping cart
    │   ├── favorite.js            Favorites + browsing history
    │   └── order.js               Order lifecycle
    ├── data                   # Static data (the single "source of truth")
    │   ├── products.js            89 products + 6 banners + brand wall + upcoming + platform stats
    │   ├── categories.js          9 business categories (+1 "All")
    │   ├── user.js                Demo account / addresses / 15 coupons / payment methods / spending trend
    │   └── orders.js              14 initial orders + status dictionary
    ├── utils
    │   ├── format.js              Money / discount / sales / date formatting
    │   ├── query.js               Pure product filter-sort functions + debounce/throttle
    │   ├── stats.js               Pure dashboard statistics (aggregation / ratios / ranking / donut)
    │   └── storage.js             localStorage wrapper (falls back to memory if unavailable)
    └── styles
        ├── tokens.css             Design tokens: color / spacing / radius / shadow / font size
        └── main.css               Global reset and utility classes
```

## Design Notes

### Styling: CSS variables as design tokens

`src/styles/tokens.css` defines every design variable; components reference them as `var(--c-brand)`:

```css
:root {
  --c-brand: #ff5a1f;
  --sp-4: 16px;
  --r-lg: 14px;
  --sh-sm: 0 2px 8px rgba(20, 22, 28, 0.06);
}
```

Changing the theme means editing this one file, with no component changes.

### State: Pinia + localStorage

The cart, favorites, browsing history, and shipping addresses live in stores and are synced to localStorage, so they survive a page refresh. `utils/storage.js` falls back to in-memory storage when storage is unavailable (private mode, etc.), preventing the page from crashing.

Orders are deliberately **not persisted** — they exist only in memory and reset to the 14 initial demo orders on refresh, so every demo starts from a clean slate.

### Data dashboard: statistics logic is pure functions

`src/utils/stats.js` contains all the calculations the dashboard needs, and likewise does not depend on Vue:

| Function | Purpose |
| --- | --- |
| `summarizeOrders` | Total spend, order count, average order value, item count (cancelled orders excluded from amounts) |
| `summarizeByCategory` | Aggregates spend and share by product category |
| `summarizeByMonth` | Aggregates monthly spend from the `YYYY-MM` part of `createdAt` |
| `topPurchasedProducts` | Ranks by **actual units purchased**, not the product's own `sales` field |
| `toStatusBreakdown` | Order status distribution |
| `toPercentHeights` | Maps values to bar-chart height percentages |
| `toConicGradient` | Generates the `conic-gradient` background for the donut chart |
| `growthRate` | Period-over-period growth; returns `null` when the previous period is 0 |

The benefit of this split: **no chart library is pulled in** (the bar chart is flexbox plus height percentages, and the donut is a `conic-gradient` ring layered over a white inner circle), so the bundle size is unaffected — and the statistics logic can be tested in isolation, outside a browser.

The dashboard data source has a deliberate **fallback strategy**: it prefers live aggregation from the in-memory orders, but when there are too few order months or categories to support a chart (for example right after clearing orders), it automatically falls back to the `monthlySpending` / `categorySpending` demo data in `data/user.js`, so charts are always complete and never render empty.

### Routing: hash mode + auth guard

Hash mode lets `dist/` be dropped onto any static server (or even opened by double-clicking `index.html`) without rewrite configuration. Routes requiring login are intercepted centrally in the guard, which records a `redirect` parameter for post-login navigation.

### Product querying is a pure function

`queryProducts()` in `utils/query.js` does not depend on Vue: it takes a product array and filter conditions and returns a new array. It can be extracted for unit testing on its own, and makes it easy to swap in real API response handling later.

## Replacing Mock Data with a Real API

This project intentionally has no `api/` directory, but the migration path is clear:

1. Create `src/api/products.js` alongside `src/utils/query.js` and call the real endpoints with `fetch` or axios;
2. Convert the synchronous getters in the stores into `async` actions, holding loading state in `ref`s;
3. `components/common/EmptyState.vue` can be swapped directly for Element Plus's `<el-skeleton>` or `<el-empty>`;
4. In the `router/index.js` guard, replace `localStorage.getItem('mall_user')` with real token validation;
5. In `DashboardView.vue`, switch the statistics inputs to API responses — the pure functions in `utils/stats.js` can be reused as-is.

## Notes

- Product images use Unsplash placeholders and **require network access** to display; offline environments show a built-in placeholder icon.
- All prices, sales figures, and order numbers are fictional demo data, unrelated to real products.
- The payment flow is a pure front-end simulation and **no real transaction ever occurs**.

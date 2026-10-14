# 云购商城 · 纯前端电商平台

[English](./README.en.md) | **简体中文**

一个完整可运行的电商前端演示项目，**没有任何后端服务**。所有商品、用户、订单数据都来自仓库内的静态数据文件，用户操作产生的购物车、收藏、地址等状态保存在浏览器 `localStorage` 中。

适合用来学习 Vue 3 工程组织、Pinia 状态管理、组件化开发与电商业务流。

## 技术栈

| 类别 | 选型 |
| --- | --- |
| 框架 | Vue 3（Composition API + `<script setup>`） |
| 构建 | Vite 6 |
| 路由 | Vue Router 4（hash 模式，静态部署零配置） |
| 状态 | Pinia 2 |
| UI | Element Plus 2 + @element-plus/icons-vue |
| 样式 | 原生 CSS + CSS 变量设计令牌，无 CSS 框架 |
| 图表 | 无图表库，纯 CSS 实现（柱状图 / 环形图） |
| 持久化 | localStorage（带内存兜底） |

## 快速开始

```bash
# 1. 安装依赖
pnpm install          # 或 npm install / yarn

# 2. 启动开发服务器
pnpm dev              # 默认 http://127.0.0.1:5173

# 3. 构建生产版本
pnpm build            # 产物输出到 dist/

# 4. 本地预览构建产物
pnpm preview
```

> 如果在 Windows 上使用 pnpm 且遇到 esbuild 的构建脚本被拦截提示，
> 可执行 `pnpm approve-builds` 允许 esbuild，或改用 `npm install`。

## 演示账号

| 用户名 | 密码 |
| --- | --- |
| `demo` | `123456` |

也可以走「注册」页，任意 2-16 位用户名 + 6 位以上密码即可创建本地账号。

## 数据规模

| 数据 | 数量 |
| --- | --- |
| 商品 | 89 件，覆盖 9 个业务分类 |
| 初始订单 | 14 笔（跨 6 个月，含全部 5 种状态） |
| 优惠券 | 15 张 |
| 首页 Banner | 6 张 |
| 品牌墙 | 10 个品牌 |
| 新品预告 | 4 款 |

## 功能一览

**商品浏览**
- 首页：轮播 banner、分类金刚区、平台数据概览、限时秒杀（带倒计时与进度条）、大牌直供品牌墙、即将开售预告、领券中心、热销榜单、9 个分类楼层、猜你喜欢
- 商品列表：分类切换、关键词搜索、价格区间筛选、5 种排序、每页 20/40/60 条切换、网格 / 列表双视图、分页，筛选状态同步到 URL 可分享
- 商品详情：图集、价格、库存、颜色/规格选择、数量步进、规格参数表、同类推荐
- 搜索页：搜索历史（本地保存）、热门词、结果排序

**数据看板**
- 消费指标卡：累计消费、订单总数、客单价、购买件数、覆盖品类、累计优惠
- 月度消费走势柱状图（支持近 6 / 12 个月切换，hover 显示明细）
- 消费品类占比环形图 + 图例
- 订单状态分布（横向条形）、购买商品排行（TOP 8）
- 商品价格带分布、分类商品分布（含各分类均价）

**交易流程**
- 购物车：多选、全选、数量增减（受库存限制）、实时小计、删除、批量删除、运费计算（满 99 免运）
- 确认订单：地址选择与增删改、优惠券选择、留言、费用明细、提交订单
- 收银台：4 种支付方式、模拟支付成功/失败、取消订单、支付结果页
- 订单：状态标签页（待付款/待发货/待收货/已完成）、去支付、确认收货、取消订单、订单详情

**个人中心**
- 登录 / 注册（本地模拟，带表单校验）
- 用户资料与资产概览、消费数据概览（含近 6 个月迷你走势图）
- 收货地址管理（增删改、设为默认）
- 优惠券包（15 张券）
- 我的收藏、浏览记录（最多 20 条）

## 界面形态

这是一个**电脑端（PC Web）**电商网站，布局按桌面浏览器设计：

- 顶部是三段式导航：灰色工具条 → Logo 与搜索区 → 分类导航条
- 页面底部是信息型页脚（服务承诺、链接分组、版权），**没有移动端底部标签栏**
- 商品区固定 5 列栅格，不做响应式降级
- `AppLayout` 设了 `min-width: 1100px`，窗口过窄时出现横向滚动而不是布局塌陷

> 如果需要移动端或 App 形态，需要另行做响应式适配或用 Capacitor 打包，本项目未包含这些。

## 目录结构

```
.
├── index.html
├── vite.config.js
├── package.json
└── src
    ├── main.js                 # 应用入口：注册 Pinia / Router / Element Plus
    ├── App.vue                 # 根组件，仅承载路由出口
    ├── router/index.js         # 路由表 + 登录守卫 + 标题设置
    ├── layouts/AppLayout.vue   # 全局布局：顶部栏 + 内容区 + 页脚
    ├── views/                  # 页面组件（按路由一一对应）
    │   ├── HomeView.vue            首页
    │   ├── ProductListView.vue     商品列表（筛选 / 排序 / 分页 / 视图切换）
    │   ├── ProductDetailView.vue   商品详情
    │   ├── SearchView.vue          搜索
    │   ├── CartView.vue            购物车
    │   ├── CheckoutView.vue        确认订单
    │   ├── PayView.vue             收银台
    │   ├── OrderListView.vue       订单列表
    │   ├── OrderDetailView.vue     订单详情
    │   ├── DashboardView.vue       数据看板（消费统计 / 图表）
    │   ├── UserCenterView.vue      个人中心
    │   ├── FavoriteView.vue        我的收藏
    │   ├── HistoryView.vue         浏览记录
    │   ├── AddressView.vue         收货地址
    │   ├── CouponView.vue          优惠券
    │   ├── LoginView.vue           登录 / 注册
    │   └── NotFoundView.vue        404
    ├── components
    │   ├── layout/AppHeader.vue        顶部三段式导航
    │   ├── layout/AppFooter.vue        底部信息页脚
    │   └── common/                     通用组件
    │       ├── ProductCard.vue         商品卡片（网格 / 横向两种布局）
    │       ├── PriceTag.vue            价格展示（整数与小数分字号）
    │       ├── StepperInput.vue        数量步进器
    │       ├── EmptyState.vue          空状态
    │       └── DialogShell.vue         弹窗外壳
    ├── stores                 # Pinia 状态
    │   ├── user.js                登录态 / 用户资料 / 收货地址
    │   ├── cart.js                购物车
    │   ├── favorite.js            收藏 + 浏览记录
    │   └── order.js               订单生命周期
    ├── data                   # 静态数据（唯一的"数据源"）
    │   ├── products.js            89 件商品 + 6 张 banner + 品牌墙 + 新品预告 + 平台数据概览
    │   ├── categories.js          9 个业务分类（+1 个"全部"）
    │   ├── user.js                演示账号 / 地址 / 15 张优惠券 / 支付方式 / 消费走势
    │   └── orders.js              14 笔初始订单 + 状态字典
    ├── utils
    │   ├── format.js              金额 / 折扣 / 销量 / 时间格式化
    │   ├── query.js               商品过滤排序的纯函数 + 防抖节流
    │   ├── stats.js               数据看板统计纯函数（聚合 / 占比 / 排行 / 环形图）
    │   └── storage.js             localStorage 封装（不可用时降级为内存）
    └── styles
        ├── tokens.css             设计令牌：颜色 / 间距 / 圆角 / 阴影 / 字号
        └── main.css               全局重置与工具类
```

## 设计说明

### 样式：CSS 变量做设计令牌

`src/styles/tokens.css` 定义了全部设计变量，组件里只写 `var(--c-brand)` 这类引用：

```css
:root {
  --c-brand: #ff5a1f;
  --sp-4: 16px;
  --r-lg: 14px;
  --sh-sm: 0 2px 8px rgba(20, 22, 28, 0.06);
}
```

改主题只需改这一个文件，不动任何组件。

### 状态：Pinia + localStorage

购物车、收藏、浏览记录、收货地址在 store 中维护，并同步写入 localStorage，刷新页面不丢失。`utils/storage.js` 对存储不可用的情况（隐私模式等）降级为内存存储，避免页面崩溃。

订单刻意**不持久化**——它只在内存中，刷新后回到 14 笔初始演示订单，这样每次演示都是干净的起点。

### 数据看板：统计逻辑是纯函数

`src/utils/stats.js` 汇总了看板用到的全部计算，同样不依赖 Vue：

| 函数 | 作用 |
| --- | --- |
| `summarizeOrders` | 消费总额、订单数、客单价、件数（已取消单不计入金额） |
| `summarizeByCategory` | 按商品分类聚合消费额与占比 |
| `summarizeByMonth` | 按 `createdAt` 的 `YYYY-MM` 聚合月度消费 |
| `topPurchasedProducts` | 按**实际购买件数**排行，而非商品自带的 `sales` 字段 |
| `toStatusBreakdown` | 订单状态分布 |
| `toPercentHeights` | 把数值映射为柱状图高度百分比 |
| `toConicGradient` | 生成环形图的 `conic-gradient` 背景 |
| `growthRate` | 环比增长率，上期为 0 时返回 `null` |

这样拆分的好处是：**图表不引入任何图表库**（柱状图是 flex + 高度百分比，环形图是一个 `conic-gradient` 圆环叠白色内圈），构建体积不受影响；同时统计逻辑可以脱离浏览器单独测试。

看板的数据源有一个刻意的**回退策略**：优先用内存中的订单实时聚合，当订单月份或品类数量不足以支撑图表时（例如刚清空订单），自动回退到 `data/user.js` 里的 `monthlySpending` / `categorySpending` 演示数据，保证图表在任何状态下都是完整的，不会出现空图。

### 路由：hash 模式 + 登录守卫

用 hash 模式是为了让 `dist/` 可以直接丢到任意静态服务器（甚至双击 `index.html`）而不需要 rewrite 配置。需要登录的路由在守卫里统一拦截，并记录 `redirect` 参数用于登录后回跳。

### 商品查询是纯函数

`utils/query.js` 的 `queryProducts()` 不依赖 Vue，只接收商品数组和筛选条件，返回新数组。它可以单独提取出来做单元测试，也便于将来替换成真实接口的响应处理。

## 如何替换成真实接口

这个项目刻意没有 `api/` 目录，但改造路径很清晰：

1. 在 `src/utils/query.js` 旁边新建 `src/api/products.js`，用 `fetch` 或 axios 请求真实接口；
2. 把 store 里的同步 getter 改成 `async` action，用 `ref` 保存 loading 状态；
3. `components/common/EmptyState.vue` 可以直接替换成 Element Plus 的 `<el-skeleton>` 或 `<el-empty>`；
4. `router/index.js` 的守卫里把 `localStorage.getItem('mall_user')` 换成真实的 token 校验；
5. `DashboardView.vue` 里的统计口径改为接口返回值，`utils/stats.js` 的纯函数可原样复用。

## 说明

- 商品图片使用 Unsplash 占位图，**需要联网**才能显示；离线环境会显示内置的占位图标。
- 所有价格、销量、订单号均为演示用虚构数据，与真实商品无关。
- 支付流程为纯前端模拟，**不会发生任何真实交易**。

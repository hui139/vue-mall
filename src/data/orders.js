/**
 * 订单静态数据（用于"我的订单"演示）
 * 状态取值：pending(待付款) / paid(待发货) / shipped(待收货) / done(已完成) / cancelled(已取消)
 */

export const initialOrders = [
  {
    id: '202501180001',
    status: 'pending',
    createdAt: '2025-01-18 14:22:31',
    items: [
      { productId: 'p3003', spec: '白色', count: 2, price: 299, checked: true }
    ],
    total: 598,
    freight: 0,
    address: {
      name: '张伟',
      phone: '13800138000',
      region: '广东省 深圳市 南山区',
      detail: '科技园南路 88 号 腾讯大厦 15 楼'
    },
    couponDiscount: 0,
    remark: ''
  },
  {
    id: '202501120008',
    status: 'shipped',
    createdAt: '2025-01-12 09:10:05',
    items: [
      { productId: 'p1001', spec: '曜石黑', count: 1, price: 6499, checked: true },
      { productId: 'p3004', spec: '', count: 1, price: 1099, checked: true }
    ],
    total: 7598,
    freight: 0,
    address: {
      name: '张伟',
      phone: '13800138000',
      region: '浙江省 杭州市 西湖区',
      detail: '文三路 100 号 阿里巴巴西溪园区 3 号楼'
    },
    couponDiscount: 100,
    remark: '麻烦发顺丰'
  },
  {
    id: '202501050003',
    status: 'done',
    createdAt: '2025-01-05 19:35:48',
    items: [
      { productId: 'p6002', spec: '单支装', count: 1, price: 268, checked: true }
    ],
    total: 268,
    freight: 0,
    address: {
      name: '张伟',
      phone: '13800138000',
      region: '广东省 深圳市 南山区',
      detail: '科技园南路 88 号 腾讯大厦 15 楼'
    },
    couponDiscount: 0,
    remark: ''
  },
  {
    id: '202412280012',
    status: 'done',
    createdAt: '2024-12-28 11:08:17',
    items: [
      { productId: 'p3001', spec: '黑色', count: 1, price: 2299, checked: true },
      { productId: 'p3002', spec: '石墨灰', count: 1, price: 699, checked: true },
      { productId: 'p3003', spec: '白色', count: 1, price: 299, checked: true }
    ],
    total: 3297,
    freight: 0,
    address: {
      name: '张伟',
      phone: '13800138000',
      region: '广东省 深圳市 南山区',
      detail: '科技园南路 88 号 腾讯大厦 15 楼'
    },
    couponDiscount: 120,
    remark: '工作日送达'
  },
  {
    id: '202412150007',
    status: 'done',
    createdAt: '2024-12-15 20:41:02',
    items: [
      { productId: 'p5001', spec: 'L 码 / 男款', count: 2, price: 199, checked: true },
      { productId: 'p5002', spec: '41 码 / 男款', count: 1, price: 599, checked: true }
    ],
    total: 997,
    freight: 0,
    address: {
      name: '李娜',
      phone: '13900139000',
      region: '北京市 北京市 朝阳区',
      detail: '建国路 87 号 华贸中心 2 号写字楼 1808 室'
    },
    couponDiscount: 50,
    remark: ''
  },
  {
    id: '202412030021',
    status: 'done',
    createdAt: '2024-12-03 15:27:44',
    items: [
      { productId: 'p7001', spec: '750g / 30包', count: 3, price: 79, checked: true },
      { productId: 'p7002', spec: '5 斤 / 整箱', count: 2, price: 49, checked: true }
    ],
    total: 335,
    freight: 0,
    address: {
      name: '张伟',
      phone: '13800138000',
      region: '浙江省 杭州市 西湖区',
      detail: '文三路 100 号 阿里巴巴西溪园区 3 号楼'
    },
    couponDiscount: 0,
    remark: ''
  },
  {
    id: '202411200005',
    status: 'cancelled',
    createdAt: '2024-11-20 09:52:10',
    items: [
      { productId: 'p8001', spec: '标准版', count: 1, price: 1099, checked: true }
    ],
    total: 1099,
    freight: 0,
    address: {
      name: '张伟',
      phone: '13800138000',
      region: '广东省 深圳市 南山区',
      detail: '科技园南路 88 号 腾讯大厦 15 楼'
    },
    couponDiscount: 0,
    remark: '拍错了，取消重拍'
  },
  {
    id: '202411080014',
    status: 'done',
    createdAt: '2024-11-08 13:19:36',
    items: [
      { productId: 'p4001', spec: '1.5匹 / 变频', count: 1, price: 2699, checked: true },
      { productId: 'p4003', spec: '4L / 3-4人', count: 1, price: 399, checked: true }
    ],
    total: 3098,
    freight: 0,
    address: {
      name: '张伟',
      phone: '13800138000',
      region: '广东省 深圳市 南山区',
      detail: '科技园南路 88 号 腾讯大厦 15 楼'
    },
    couponDiscount: 300,
    remark: '需要预约安装'
  },
  {
    id: '202410260009',
    status: 'done',
    createdAt: '2024-10-26 17:03:55',
    items: [
      { productId: 'p2001', spec: '32GB+1TB', count: 1, price: 5499, checked: true }
    ],
    total: 5499,
    freight: 0,
    address: {
      name: '张伟',
      phone: '13800138000',
      region: '广东省 深圳市 南山区',
      detail: '科技园南路 88 号 腾讯大厦 15 楼'
    },
    couponDiscount: 200,
    remark: ''
  },
  {
    id: '202410120002',
    status: 'done',
    createdAt: '2024-10-12 10:44:29',
    items: [
      { productId: 'p6001', spec: '100ml / 面部精华', count: 1, price: 760, checked: true },
      { productId: 'p6003', spec: '75ml / 面部精华', count: 2, price: 329, checked: true }
    ],
    total: 1418,
    freight: 0,
    address: {
      name: '李娜',
      phone: '13900139000',
      region: '北京市 北京市 朝阳区',
      detail: '建国路 87 号 华贸中心 2 号写字楼 1808 室'
    },
    couponDiscount: 80,
    remark: ''
  },
  {
    id: '202409280016',
    status: 'done',
    createdAt: '2024-09-28 21:15:08',
    items: [
      { productId: 'p3004', spec: '2TB / M.2', count: 1, price: 1099, checked: true },
      { productId: 'p2004', spec: '23.8 英寸 / 1080P', count: 2, price: 899, checked: true }
    ],
    total: 2897,
    freight: 0,
    address: {
      name: '张伟',
      phone: '13800138000',
      region: '浙江省 杭州市 西湖区',
      detail: '文三路 100 号 阿里巴巴西溪园区 3 号楼'
    },
    couponDiscount: 0,
    remark: '装机用'
  },
  {
    id: '202409150011',
    status: 'done',
    createdAt: '2024-09-15 08:36:21',
    items: [
      { productId: 'p7003', spec: '500ml×2 / 53度', count: 1, price: 798, checked: true },
      { productId: 'p7001', spec: '750g / 30包', count: 2, price: 79, checked: true }
    ],
    total: 956,
    freight: 0,
    address: {
      name: '张伟',
      phone: '13800138000',
      region: '广东省 深圳市 南山区',
      detail: '科技园南路 88 号 腾讯大厦 15 楼'
    },
    couponDiscount: 10,
    remark: '中秋节送礼'
  },
  {
    id: '202408200004',
    status: 'done',
    createdAt: '2024-08-20 14:57:43',
    items: [
      { productId: 'p1002', spec: '12GB+256GB', count: 1, price: 4299, checked: true }
    ],
    total: 4299,
    freight: 0,
    address: {
      name: '张伟',
      phone: '13800138000',
      region: '广东省 深圳市 南山区',
      detail: '科技园南路 88 号 腾讯大厦 15 楼'
    },
    couponDiscount: 0,
    remark: ''
  },
  {
    id: '202408060018',
    status: 'done',
    createdAt: '2024-08-06 12:22:37',
    items: [
      { productId: 'p3003', spec: '白色', count: 3, price: 299, checked: true },
      { productId: 'p3002', spec: '白色', count: 1, price: 699, checked: true }
    ],
    total: 1596,
    freight: 0,
    address: {
      name: '李娜',
      phone: '13900139000',
      region: '北京市 北京市 朝阳区',
      detail: '建国路 87 号 华贸中心 2 号写字楼 1808 室'
    },
    couponDiscount: 25,
    remark: ''
  }
]

/** 订单状态文案与配色（type 对应 .tag-line--* ） */
export const orderStatusMap = {
  pending: { label: '待付款', type: 'warning', desc: '请在 30 分钟内完成支付' },
  paid: { label: '待发货', type: 'info', desc: '商家正在备货' },
  shipped: { label: '待收货', type: 'success', desc: '包裹已在路上' },
  done: { label: '已完成', type: 'plain', desc: '交易已完成' },
  cancelled: { label: '已取消', type: 'plain', desc: '订单已取消' }
}

/** 可筛选的订单状态标签页 */
export const orderTabs = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待付款' },
  { key: 'paid', label: '待发货' },
  { key: 'shipped', label: '待收货' },
  { key: 'done', label: '已完成' }
]

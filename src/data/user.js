/**
 * 用户、收货地址、优惠券等与"账号"相关的静态数据
 * 演示用的账号：任意用户名 + 密码 123456 即可登录
 */

export const demoAccount = {
  username: 'demo',
  password: '123456',
  nickname: '演示用户',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
  phone: '138****8888',
  level: '黄金会员',
  points: 2860,
  balance: 128.5,
  couponCount: 4,
  /** 会员成长值：距离下一等级（铂金会员）还差多少 */
  growth: 7420,
  growthNext: 10000,
  /** 注册天数，用于个人中心展示 */
  joinedDays: 386
}

/** 可选收货地址 */
export const initialAddresses = [
  {
    id: 'addr1',
    name: '张伟',
    phone: '13800138000',
    region: '广东省 深圳市 南山区',
    detail: '科技园南路 88 号 腾讯大厦 15 楼',
    isDefault: true,
    tag: '公司'
  },
  {
    id: 'addr2',
    name: '张伟',
    phone: '13800138000',
    region: '浙江省 杭州市 西湖区',
    detail: '文三路 100 号 阿里巴巴西溪园区 3 号楼',
    isDefault: false,
    tag: '家'
  },
  {
    id: 'addr3',
    name: '李娜',
    phone: '13900139000',
    region: '北京市 北京市 朝阳区',
    detail: '建国路 87 号 华贸中心 2 号写字楼 1808 室',
    isDefault: false,
    tag: ''
  }
]

/** 优惠券：threshold 为使用门槛，discount 为减免金额 */
export const coupons = [
  { id: 'c1', name: '新人专享券', threshold: 99, discount: 20, expire: '2025-12-31', scope: '全品类' },
  { id: 'c2', name: '手机数码券', threshold: 1000, discount: 100, expire: '2025-12-31', scope: '手机 / 数码' },
  { id: 'c3', name: '家电大额券', threshold: 3000, discount: 300, expire: '2025-12-31', scope: '家用电器' },
  { id: 'c4', name: '服饰品类券', threshold: 299, discount: 60, expire: '2025-12-31', scope: '服饰鞋包' },
  { id: 'c5', name: '满 200 减 15', threshold: 200, discount: 15, expire: '2025-12-31', scope: '全品类' },
  { id: 'c6', name: '电脑办公券', threshold: 3000, discount: 200, expire: '2025-12-31', scope: '电脑办公' },
  { id: 'c7', name: '美妆个护券', threshold: 500, discount: 80, expire: '2025-12-31', scope: '美妆护肤' },
  { id: 'c8', name: '食品生鲜券', threshold: 99, discount: 10, expire: '2025-12-31', scope: '食品生鲜' },
  { id: 'c9', name: '运动户外券', threshold: 300, discount: 50, expire: '2025-12-31', scope: '运动户外' },
  { id: 'c10', name: '母婴玩具券', threshold: 199, discount: 30, expire: '2025-12-31', scope: '母婴玩具' },
  { id: 'c11', name: '数码配件券', threshold: 199, discount: 25, expire: '2025-12-31', scope: '数码配件' },
  { id: 'c12', name: '大额满减券', threshold: 5000, discount: 500, expire: '2025-12-31', scope: '全品类' },
  { id: 'c13', name: '会员专享券', threshold: 1500, discount: 150, expire: '2025-12-31', scope: '全品类' },
  { id: 'c14', name: '周末狂欢券', threshold: 800, discount: 100, expire: '2025-12-31', scope: '全品类' },
  { id: 'c15', name: '满 1000 减 120', threshold: 1000, discount: 120, expire: '2025-12-31', scope: '全品类' }
]

/**
 * 每月消费走势（用于数据看板）。
 * 纯静态演示数据，代表该用户在平台上的历史消费金额，与 initialOrders 无关。
 * @type {{month: string, amount: number, orders: number}[]}
 */
export const monthlySpending = [
  { month: '2024-09', amount: 3853, orders: 3 },
  { month: '2024-10', amount: 6917, orders: 2 },
  { month: '2024-11', amount: 3098, orders: 2 },
  { month: '2024-12', amount: 4294, orders: 2 },
  { month: '2025-01', amount: 7598, orders: 2 },
  { month: '2025-02', amount: 5620, orders: 3 },
  { month: '2025-03', amount: 9340, orders: 4 },
  { month: '2025-04', amount: 4180, orders: 2 },
  { month: '2025-05', amount: 7260, orders: 3 },
  { month: '2025-06', amount: 11480, orders: 5 },
  { month: '2025-07', amount: 6320, orders: 3 },
  { month: '2025-08', amount: 8910, orders: 4 }
]

/** 消费品类占比（数据看板环形图数据源） */
export const categorySpending = [
  { key: 'phone', name: '手机通讯', amount: 28690, color: '#ff5a1f' },
  { key: 'computer', name: '电脑办公', amount: 19496, color: '#3a7afe' },
  { key: 'digital', name: '数码配件', amount: 12680, color: '#16b364' },
  { key: 'home', name: '家用电器', amount: 9840, color: '#f5a524' },
  { key: 'fashion', name: '服饰鞋包', amount: 6420, color: '#9254de' },
  { key: 'beauty', name: '美妆护肤', amount: 5180, color: '#eb2f96' },
  { key: 'food', name: '食品生鲜', amount: 3860, color: '#36cfc9' },
  { key: 'sports', name: '运动户外', amount: 2240, color: '#597ef7' },
  { key: 'baby', name: '母婴玩具', amount: 1620, color: '#faad14' }
]

/** 支付方式 */
export const payMethods = [
  { id: 'alipay', name: '支付宝', desc: '推荐有支付宝账户的用户使用', color: '#1677ff' },
  { id: 'wechat', name: '微信支付', desc: '亿万用户的选择，安全快捷', color: '#07c160' },
  { id: 'unionpay', name: '银联云闪付', desc: '银行卡快捷支付', color: '#e60012' },
  { id: 'balance', name: '余额支付', desc: '当前余额 ¥128.50', color: '#ff5a1f' }
]

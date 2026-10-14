/**
 * 商品分类
 * icon 使用 Element Plus 内置图标组件名，首页/列表页通过 <component :is> 渲染
 */
export const categories = [
  { id: 'all', name: '全部', icon: 'Grid', banner: '', desc: '精选好物全场特惠' },
  { id: 'phone', name: '手机通讯', icon: 'Iphone', banner: '新机首发 12 期免息', desc: '旗舰机型 · 以旧换新' },
  { id: 'computer', name: '电脑办公', icon: 'Monitor', banner: '轻薄本 直降 800', desc: '学生党 / 职场精选' },
  { id: 'digital', name: '数码配件', icon: 'Headset', banner: '配件狂欢季', desc: '耳机 · 充电 · 存储' },
  { id: 'home', name: '家用电器', icon: 'Refrigerator', banner: '以旧换新 至高 1000', desc: '大家电 · 厨房小电' },
  { id: 'fashion', name: '服饰鞋包', icon: 'Handbag', banner: '换季大促 5 折起', desc: '当季新款 低至 5 折' },
  { id: 'beauty', name: '美妆护肤', icon: 'MagicStick', banner: '买一赠一', desc: '正品保障 专柜同款' },
  { id: 'food', name: '食品生鲜', icon: 'Cherry', banner: '产地直发 次日达', desc: '新鲜看得见' },
  { id: 'sports', name: '运动户外', icon: 'Basketball', banner: '运动季 满 300 减 50', desc: '跑步 · 健身 · 露营' },
  { id: 'baby', name: '母婴玩具', icon: 'Present', banner: '母婴专区 品质之选', desc: '安心选购 育儿好物' }
]

/** 分类 id -> 名称 的映射 */
export const categoryMap = categories.reduce((map, item) => {
  map[item.id] = item
  return map
}, {})

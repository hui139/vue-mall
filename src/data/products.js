/**
 * 商品数据（本地静态数据，无后端）
 *
 * 字段说明：
 *  - id        商品唯一标识
 *  - name      商品名
 *  - category  所属分类 id，对应 data/categories.js
 *  - price     售价（元）
 *  - origin    原价（元），用于展示折扣
 *  - sales     销量
 *  - stock     库存
 *  - image     图片占位地址（unsplash 源，可离线替换为本地图片）
 *  - colors    可选颜色
 *  - specs     规格描述
 *  - tags      角标
 *  - desc      商品详情
 *  - detail    详情参数键值对
 */

export const products = [
  {
    id: 'p1001',
    name: '华为 Mate 70 Pro 5G 全网通智能手机',
    category: 'phone',
    price: 6499,
    origin: 6999,
    sales: 12800,
    stock: 42,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
    colors: ['雅川青', '曜石黑', '冰霜银'],
    specs: '12GB+512GB',
    tags: ['12期免息', '以旧换新'],
    desc: '搭载新一代麒麟芯片，6.9 英寸超视网膜全面屏，1.5K 分辨率带来细腻 display 效果。5000 万像素超聚光影像系统，支持 3 倍光学变焦与 100 倍数字变焦。',
    detail: {
      屏幕: '6.9 英寸 OLED，1.5K 分辨率，120Hz 自适应刷新率',
      处理器: '麒麟 9010 旗舰芯片',
      内存: '12GB LPDDR5X',
      存储: '512GB NMZ 闪存',
      电池: '5200mAh，100W 有线快充 / 50W 无线快充',
      后置: '5000 万像素超聚光主摄 + 4000 万超广角',
      前置: '1300 万像素超广角',
      系统: 'HarmonyOS 5.0'
    }
  },
  {
    id: 'p1002',
    name: '小米 15 徕卡光学 Summilux 高速镜头',
    category: 'phone',
    price: 4299,
    origin: 4999,
    sales: 21600,
    stock: 88,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80',
    colors: ['黑色', '白色', '绿色'],
    specs: '12GB+256GB',
    tags: ['新品', '国补立减'],
    desc: '骁龙 8 至尊版旗舰芯片，徕卡三摄系统，2K 等深微曲屏。全新澎湃 OS，AI 写作、AI 字幕等实用功能一应俱全。',
    detail: {
      屏幕: '6.36 英寸 2K 等深微曲屏，120Hz',
      处理器: '骁龙 8 Elite',
      内存: '12GB',
      存储: '256GB / 512GB',
      电池: '5410mAh，90W 有线 + 50W 无线快充',
      后置: '5000 万主摄 + 5000 万超长焦 + 5000 万超广角',
      系统: '澎湃 OS'
    }
  },
  {
    id: 'p1003',
    name: 'Apple iPhone 16 Pro 256GB 原色钛金属',
    category: 'phone',
    price: 7999,
    origin: 8999,
    sales: 9800,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80',
    colors: ['原色钛金属', '黑色钛金属', '白色钛金属'],
    specs: '8GB+256GB',
    tags: ['国补', '免息'],
    desc: 'A18 Pro 仿生芯片，6.3 英寸超视网膜 XDR 显示屏。四摄影像系统，支持 4K 120fps 杜比视界录制。',
    detail: {
      屏幕: '6.3 英寸超视网膜 XDR，ProMotion 自适应 120Hz',
      处理器: 'A18 Pro',
      摄像头: '4800 万主摄 + 4800 万超广角 + 1200 万长焦',
      视频: '4K 120fps 杜比视界',
      电池: '3582mAh，USB-C 接口',
      系统: 'iOS 18'
    }
  },
  {
    id: 'p1004',
    name: '荣耀 Magic7 绿洲护眼 骁龙 8 Elite 手机',
    category: 'phone',
    price: 3799,
    origin: 4299,
    sales: 7300,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&q=80',
    colors: ['月影灰', '黑色'],
    specs: '12GB+256GB',
    tags: ['热卖'],
    desc: '6.78 英寸绿洲护眼屏，5800mAh 青海湖电池，100W 超快充。AI 智能抠图与一键成片，拍照更省心。',
    detail: {
      屏幕: '6.78 英寸绿洲护眼屏，1.5K',
      处理器: '骁龙 8 Elite',
      电池: '5800mAh + 100W 超快充',
      后置: '5000 万三摄 + 2000 万长焦',
      系统: 'MagicOS 9'
    }
  },
  {
    id: 'p2001',
    name: '联想 ThinkBook 14+ 2025 酷睿 Ultra 笔记本',
    category: 'computer',
    price: 5499,
    origin: 6299,
    sales: 5600,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
    colors: ['银灰', '深空灰'],
    specs: '32GB+1TB',
    tags: ['12期免息', '学生优惠'],
    desc: '14.5 英寸 3K 120Hz 高色域屏，酷睿 Ultra 7 处理器，32GB LPDDR5X 大内存，1TB 固态。1.3kg 轻薄机身，通勤便携。',
    detail: {
      屏幕: '14.5 英寸 3K，120Hz，100% sRGB',
      处理器: '酷睿 Ultra 7 155H',
      内存: '32GB LPDDR5X',
      存储: '1TB PCIe 4.0 SSD',
      接口: '2×USB-C（雷电4）+ HDMI 2.1 + USB-A',
      重量: '约 1.3kg'
    }
  },
  {
    id: 'p2002',
    name: '华为 MateBook D 16 2024 16英寸轻薄本',
    category: 'computer',
    price: 4299,
    origin: 4999,
    sales: 8900,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    colors: ['皓月银', '深空灰'],
    specs: '16GB+512GB',
    tags: ['大屏'],
    desc: '16 英寸 16:10 全面屏，视野开阔。全新 13 代酷睿处理器，40Wh 电池，支持指纹解锁。',
    detail: {
      屏幕: '16 英寸 16:10，1920×1200',
      处理器: '酷睿 i5-13420H',
      内存: '16GB',
      存储: '512GB SSD',
      电池: '40Wh',
      重量: '约 1.68kg'
    }
  },
  {
    id: 'p2003',
    name: 'Apple MacBook Air 13 M4 8+256GB 深空灰',
    category: 'computer',
    price: 8999,
    origin: 9499,
    sales: 4200,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80',
    colors: ['深空灰', '天空蓝', '星光色', '午夜色'],
    specs: '8GB+256GB',
    tags: ['新品', '教育优惠'],
    desc: 'M4 芯片，13.6 英寸 Liquid Retina 显示屏，18 小时超长续航，1.24kg 轻薄无风扇设计，静音运行。',
    detail: {
      屏幕: '13.6 英寸 Liquid Retina，500 尼特',
      处理器: 'Apple M4',
      内存: '8GB 统一内存',
      存储: '256GB SSD',
      电池: '最长 18 小时视频播放',
      重量: '1.24kg',
      系统: 'macOS'
    }
  },
  {
    id: 'p2004',
    name: '戴尔 DELL P2422H 23.8 英寸 IPS 显示器',
    category: 'computer',
    price: 899,
    origin: 1299,
    sales: 12400,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80',
    colors: ['黑色'],
    specs: '23.8 英寸 / 1080P',
    tags: ['包邮', '办公'],
    desc: '23.8 英寸 IPS 面板，1080P 分辨率，100Hz 刷新率。内置 USB-C 65W 反向供电，一线连接笔记本。',
    detail: {
      尺寸: '23.8 英寸',
      分辨率: '1920×1080（IPS）',
      刷新率: '100Hz',
      接口: 'HDMI / DP / USB-C 65W / USB Hub',
      认证: 'TÜV 低蓝光认证'
    }
  },
  {
    id: 'p3001',
    name: '索尼 WH-1000XM5 头戴式主动降噪耳机',
    category: 'digital',
    price: 2299,
    origin: 2899,
    sales: 18700,
    stock: 55,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    colors: ['黑色', '铂金银', '午夜蓝'],
    specs: '头戴式 / 无线',
    tags: ['降噪', '包邮'],
    desc: '双处理器降噪，30 小时续航，LDAC 高解析音频。轻量 250g 佩戴舒适，通勤与办公都合适。',
    detail: {
      类型: '头戴式无线降噪',
      续航: '30 小时（降噪开启）',
      蓝牙: '5.2，支持 LDAC / AAC / SBC',
      重量: '约 250g',
      充电: 'USB-C 快充，3 分钟播放 3 分钟'
    }
  },
  {
    id: 'p3002',
    name: '罗技 MX Master 3S 无线办公鼠标',
    category: 'digital',
    price: 699,
    origin: 899,
    sales: 15200,
    stock: 95,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80',
    colors: ['石墨灰', '白色'],
    specs: '无线 / USB-C',
    tags: ['静音', '办公'],
    desc: '8K DPI 传感器，MagSpeed 电磁滚轮，静音按键。支持连接三台设备，一键切换。70 天续航。',
    detail: {
      传感器: 'Darkfield 8000 DPI',
      滚轮: 'MagSpeed 电磁滚轮',
      连接: 'Bolt USB 接收器 + 蓝牙，支持 3 台设备',
      续航: '70 天',
      充电: 'USB-C'
    }
  },
  {
    id: 'p3003',
    name: 'Anker 安克 100W 氮化镓充电器 四口',
    category: 'digital',
    price: 299,
    origin: 399,
    sales: 34000,
    stock: 200,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80',
    colors: ['白色', '黑色'],
    specs: '100W / 四口',
    tags: ['热销', '便携'],
    desc: 'GaN 氮化镓技术，体积小巧。100W 总功率，3 个 USB-C + 1 个 USB-A，可同时给笔记本手机充电。',
    detail: {
      总功率: '100W',
      接口: 'USB-C × 3 + USB-A × 1',
      协议: 'PD 3.0 / PPS / QC 4+',
      尺寸: '约 68×45×30mm',
      适用: '笔记本 / 手机 / 平板'
    }
  },
  {
    id: 'p3004',
    name: '三星 990 PRO 2TB NVMe 固态硬盘 PCIe4.0',
    category: 'digital',
    price: 1099,
    origin: 1399,
    sales: 9800,
    stock: 70,
    image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=600&q=80',
    colors: ['黑色'],
    specs: '2TB / M.2',
    tags: ['装机'],
    desc: '顺序读取 7450MB/s，PCIe 4.0 接口。2TB 大容量，五年质保。适合游戏与创作。',
    detail: {
      容量: '2TB',
      接口: 'M.2 2280 PCIe 4.0 ×4',
      读取速度: '最高 7450MB/s',
      写入速度: '最高 6900MB/s',
      质保: '五年有限质保'
    }
  },
  {
    id: 'p4001',
    name: '美的（Midea）变频空调 1.5匹 挂机 KFR-35GW',
    category: 'home',
    price: 2699,
    origin: 3299,
    sales: 45000,
    stock: 80,
    image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&q=80',
    colors: ['白色'],
    specs: '1.5匹 / 变频',
    tags: ['包安装', '国补'],
    desc: '新一级能效，1.5 匹适用 15-23㎡。智能自清洁，静音送风，遥控 + App 双重控制。',
    detail: {
      类型: '变频挂机',
      能效: '新一级能效 APF 5.27',
      适用面积: '15-23㎡',
      噪音: '最低 22dB',
      保修: '整机 6 年 / 压缩机 10 年'
    }
  },
  {
    id: 'p4002',
    name: '小米 米家空气净化器 4 Pro 除甲醛',
    category: 'home',
    price: 1499,
    origin: 1799,
    sales: 21000,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
    colors: ['白色'],
    specs: '除甲醛 / 除菌',
    tags: ['健康'],
    desc: 'CADR 颗粒物洁净空气量 500m³/h，适用 35-60㎡。H13 级 HEPA 滤网，滤芯寿命长。',
    detail: {
      洁净量: '颗粒物 CADR 500m³/h',
      适用面积: '35-60㎡',
      滤网: 'H13 HEPA + 活性炭',
      噪音: '33-58dB',
      滤芯寿命: '12 个月'
    }
  },
  {
    id: 'p4003',
    name: '苏泊尔 SUPOR 电饭煲 4L IH 电磁加热',
    category: 'home',
    price: 399,
    origin: 599,
    sales: 28000,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80',
    colors: ['白色', '黑色'],
    specs: '4L / 3-4人',
    tags: ['热卖'],
    desc: 'IH 电磁加热，受热均匀。24 小时预约，多种米种程序。球釜内胆，煮饭更香。',
    detail: {
      容量: '4L（3-4 人）',
      加热方式: 'IH 电磁加热',
      内胆: '球釜铝胆',
      功率: '1100W',
      特色: '24 小时预约'
    }
  },
  {
    id: 'p5001',
    name: '优衣库 UNIQLO 男装摇粒绒外套 抓绒外套',
    category: 'fashion',
    price: 199,
    origin: 299,
    sales: 56000,
    stock: 300,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    colors: ['黑色', '米白', '藏青'],
    specs: 'L 码 / 男款',
    tags: ['基础款', '打折'],
    desc: '柔软保暖摇粒绒面料，轻量舒适。可外穿也可内搭，多色可选，经典百搭。',
    detail: {
      面料: '100% 聚酯纤维摇粒绒',
      版型: '常规',
      尺码: 'S / M / L / XL / XXL',
      洗涤: '机洗 不可漂白'
    }
  },
  {
    id: 'p5002',
    name: '耐克 Nike Air Zoom Pegasus 41 跑步鞋',
    category: 'sports',
    price: 599,
    origin: 899,
    sales: 23000,
    stock: 90,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    colors: ['白黑', '蓝白', '绿白'],
    specs: '41 码 / 男款',
    tags: ['运动', '热卖'],
    desc: '全掌 Air 缓震，回弹更轻盈。ReactX 泡棉中底，日常慢跑与训练两相宜。',
    detail: {
      缓震: '全掌 Air ZOOM 气囊',
      中底: 'ReactX 泡棉',
      适用: '日常跑步 / 通勤',
      鞋面: '透气工程网布'
    }
  },
  {
    id: 'p5003',
    name: '李宁 中国李宁 运动休闲鞋 悟道 3',
    category: 'sports',
    price: 469,
    origin: 799,
    sales: 18000,
    stock: 75,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80',
    colors: ['白色', '灰色'],
    specs: '42 码 / 男款',
    tags: ['国货'],
    desc: '䨻科技轻弹中底，脚感柔软。复古国潮设计风格，通勤与运动皆可。',
    detail: {
      中底: '䨻 轻弹科技',
      鞋面: '网布 + 合成革拼接',
      适用: '休闲 / 轻运动',
      风格: '国潮复古'
    }
  },
  {
    id: 'p6001',
    name: '兰蔻 Lancôme 小黑瓶 精华肌底液 100ml',
    category: 'beauty',
    price: 760,
    origin: 1080,
    sales: 32000,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    colors: ['30ml', '50ml', '100ml'],
    specs: '100ml / 面部精华',
    tags: ['正品', '专柜'],
    desc: '经典小黑瓶，专利二裂酵母发酵产物溶胞物，强韧肌底。适合熬夜与初老肌肤。',
    detail: {
      规格: '100ml',
      质地: '精华水感',
      主要成分: '二裂酵母发酵产物溶胞物',
      适用肤质: '全肤质 / 抗初老',
      保质期: '3 年'
    }
  },
  {
    id: 'p6002',
    name: '薇诺娜 舒敏保湿特护霜 50g',
    category: 'beauty',
    price: 268,
    origin: 328,
    sales: 26000,
    stock: 110,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80',
    colors: ['单支装'],
    specs: '50g / 面霜',
    tags: ['敏感肌', '国货'],
    desc: '敏感肌修护面霜，含青刺油、马齿苋提取物，舒缓泛红。临床测试，敏感肌可用。',
    detail: {
      规格: '50g',
      功效: '舒缓 / 修护 / 保湿',
      适用肤质: '敏感肌 / 屏障受损',
      无添加: '酒精 / 香精',
      产地: '云南昆明'
    }
  },
  {
    id: 'p7001',
    name: '三只松鼠 每日坚果 30包 750g 混合装',
    category: 'food',
    price: 79,
    origin: 129,
    sales: 88000,
    stock: 500,
    image: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=600&q=80',
    colors: ['原味'],
    specs: '750g / 30包',
    tags: ['零食', '囤货'],
    desc: '每日坚果 30 包独立包装，六种坚果果干搭配。营养丰富，办公室零食首选。',
    detail: {
      净含量: '750g（25g×30 包）',
      配料: '巴旦木、腰果、核桃仁、榛子仁、葡萄干蔓越莓',
      保质期: '180 天',
      储存: '阴凉干燥处'
    }
  },
  {
    id: 'p7002',
    name: '褚橙 新鲜橙子 5斤 云南冰糖橙 整箱包邮',
    category: 'food',
    price: 49,
    origin: 89,
    sales: 62000,
    stock: 800,
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=600&q=80',
    colors: ['中果', '大果'],
    specs: '5 斤 / 整箱',
    tags: ['产地直发', '包邮'],
    desc: '云南褚家寨冰糖橙，皮薄肉厚，汁水充足。产地直发，坏果包赔。',
    detail: {
      净重: '5 斤（±0.5 斤）',
      产地: '云南玉溪褚家寨',
      特点: '冰糖心 / 皮薄 / 多汁',
      包装: '防撞纸箱装',
      发货: '产地直发'
    }
  },
  {
    id: 'p7003',
    name: '茅台镇 贵州酱香型白酒 53度 500ml 双瓶装',
    category: 'food',
    price: 798,
    origin: 1580,
    sales: 6800,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&q=80',
    colors: ['双瓶装'],
    specs: '500ml×2 / 53度',
    tags: ['正品', '礼盒'],
    desc: '贵州茅台镇产区酱香型白酒，53 度，飞酱口感，回味悠长。礼盒包装，适合送礼。',
    detail: {
      规格: '500ml × 2 瓶',
      度数: '53%vol',
      香型: '酱香型',
      产地: '贵州茅台镇',
      保质期: '长期'
    }
  },
  {
    id: 'p8001',
    name: '乐高 LEGO 科技组 42115 兰博基尼urus',
    category: 'baby',
    price: 1099,
    origin: 1399,
    sales: 3200,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&q=80',
    colors: ['标准版'],
    specs: '389 片 / 6-12 岁',
    tags: ['益智', '收藏'],
    desc: '兰博基尼 Sián FKP 37 跑车模型，389 片零件。可开合车门与引擎盖，还原度极高。',
    detail: {
      零件数: '389 片',
      适龄: '6-12 岁',
      尺寸: '成品约 24×12×7cm',
      系列: 'LEGO TECH 科技组',
      特点: '可动引擎盖 / 可开合车门'
    }
  },
  {
    id: 'p8002',
    name: '好孩子 婴儿推车 D819 轻便可登机',
    category: 'baby',
    price: 899,
    origin: 1399,
    sales: 5600,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&q=80',
    colors: ['星空灰', '雾霾蓝'],
    specs: '可登机 / 0-3 岁',
    tags: ['好物', '出行'],
    desc: '航空铝车架，单手收车，5.2kg 超轻。可折叠登机，适合经常出行的家庭。',
    detail: {
      适用年龄: '0-3 岁',
      整车重量: '约 5.2kg',
      车架: '航空铝合金',
      折叠: '单手一键收车',
      特点: '可登机 / 一键刹车'
    }
  },
  {
    id: 'p1005',
    name: 'Redmi K80 骁龙 8 Gen3 2K 直屏 5500mAh',
    category: 'phone',
    price: 2499,
    origin: 2999,
    sales: 31000,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1580554530778-ca36943938b2?w=600&q=80',
    colors: ['白色', '黑色', '蓝色'],
    specs: '12GB+256GB',
    tags: ['性价比', '热卖'],
    desc: '骁龙 8 Gen3 处理器，2K 中国星屏幕，5500mAh 大电池 + 90W 快充。性能与续航兼顾。',
    detail: {
      屏幕: '6.67 英寸 2K 直屏，120Hz',
      处理器: '骁龙 8 Gen3',
      电池: '5500mAh，90W 快充',
      后置: '5000 万三摄',
      系统: 'HyperOS'
    }
  },
  {
    id: 'p2005',
    name: 'ROG 玩家国度 魔霸 RTX4060 游戏本 16 英寸',
    category: 'computer',
    price: 8999,
    origin: 10999,
    sales: 2100,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80',
    colors: ['灰色'],
    specs: 'i7-13650HX/4060/16G/512G',
    tags: ['电竞', '新品'],
    desc: 'RTX 4060 独显，13 代酷睿处理器，16 英寸 240Hz 电竞屏。165W RTX 满功耗释放。',
    detail: {
      屏幕: '16 英寸 2560×1600，240Hz',
      处理器: 'i7-13650HX',
      显卡: 'RTX 4060 Laptop 8GB（满功耗）',
      内存: '16GB DDR5 4800',
      存储: '512GB SSD',
      重量: '约 2.5kg'
    }
  },
  {
    id: 'p3005',
    name: '华为 FreeBuds Pro 4 真无线降噪耳机',
    category: 'digital',
    price: 899,
    origin: 1299,
    sales: 27000,
    stock: 130,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&q=80',
    colors: ['陶瓷白', '深海蓝'],
    specs: '入耳式 / 主动降噪',
    tags: ['降噪', '新品'],
    desc: '双单元声学系统，支持智慧动态降噪 3.0。HD Audio 无损音质，续航 33 小时。',
    detail: {
      类型: '真无线主动降噪',
      降噪: '智慧动态降噪 3.0，最高 48dB',
      续航: '综合 33 小时',
      防水: 'IP54',
      音质: '支持 LDAC / LHDC'
    }
  },
  {
    id: 'p4004',
    name: '戴森 Dyson V12 Detect Slim 无绳吸尘器',
    category: 'home',
    price: 3999,
    origin: 4999,
    sales: 4200,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&q=80',
    colors: ['金铜色'],
    specs: '轻量版 / 无绳',
    tags: ['高端', '包邮'],
    desc: '激光探测微尘，吸力 150AW。整机重量仅 2.2kg，握持轻便。60 分钟续航。',
    detail: {
      吸力: '150AW',
      重量: '约 2.2kg',
      续航: '60 分钟',
      探测: '激光微尘感应',
      配件: '缝隙吸头 / 软毛滚筒'
    }
  },
  {
    id: 'p5004',
    name: '安踏 ANTA 运动短袖T恤 男夏季速干透气',
    category: 'fashion',
    price: 99,
    origin: 199,
    sales: 72000,
    stock: 400,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
    colors: ['黑色', '白色', '宝蓝'],
    specs: 'L 码 / 男款',
    tags: ['基础款', '速干'],
    desc: '冰感速干面料，透气排汗。多色可选，日常运动与休闲百搭。',
    detail: {
      面料: '聚酯纤维速干面料',
      功能: '速干 / 透气 / 排汗',
      版型: '宽松',
      尺码: 'S / M / L / XL / 2XL'
    }
  },
  {
    id: 'p6003',
    name: '欧莱雅 复颜玻尿酸水光充盈导入精华 75ml',
    category: 'beauty',
    price: 329,
    origin: 460,
    sales: 41000,
    stock: 200,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80',
    colors: ['75ml'],
    specs: '75ml / 面部精华',
    tags: ['补水'],
    desc: '高浓度玻尿酸，导入精华质地。补水保湿，令肌肤饱满水润。',
    detail: {
      规格: '75ml',
      主要成分: '玻尿酸（透明质酸钠）',
      功效: '补水 / 保湿 / 焕亮',
      肤质: '干性 / 中性 / 混合性'
    }
  },
  {
    id: 'p8003',
    name: '小米 米家智能体脂秤 3 Pro 体脂称',
    category: 'sports',
    price: 199,
    origin: 299,
    sales: 19000,
    stock: 260,
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&q=80',
    colors: ['黑色', '白色'],
    specs: '体脂 / 肌肉量',
    tags: ['健康', '智能'],
    desc: '23 项身体成分分析，米家 App 同步。支持多人识别，玻璃面板易清洁。',
    detail: {
      测量项: '23 项身体成分',
      材质: '钢化玻璃',
      蓝牙: 'Bluetooth 5.0',
      供电: '3 节 AAA 电池',
      体重范围: '0-150kg'
    }
  },

  // ==================== 手机通讯 ====================
  {
    id: 'p1006',
    name: 'vivo X200 Pro 蔡司超级长焦 6000mAh',
    category: 'phone',
    price: 5299,
    origin: 5999,
    sales: 15600,
    stock: 66,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
    colors: ['宝石蓝', '钛色', '白色'],
    specs: '16GB+512GB',
    tags: ['新品', '蔡司影像'],
    desc: '蔡司 2 亿 APO 超级长焦，天玑 9400 旗舰芯片。6000mAh 蓝海电池，90W 闪充。',
    detail: {
      屏幕: '6.78 英寸 2K 微曲屏，120Hz',
      处理器: '天玑 9400',
      内存: '16GB LPDDR5X',
      存储: '512GB UFS 4.0',
      电池: '6000mAh，90W 有线 / 30W 无线',
      后置: '5000 万主摄 + 2 亿长焦 + 5000 万超广角'
    }
  },
  {
    id: 'p1007',
    name: 'OPPO Find X8 Pro 哈苏影像 双潜望长焦',
    category: 'phone',
    price: 5999,
    origin: 6499,
    sales: 11200,
    stock: 38,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80',
    colors: ['大漠银月', '浮光紫', '黑色'],
    specs: '16GB+512GB',
    tags: ['哈苏', '双潜望'],
    desc: '哈苏影像系统，双潜望长焦覆盖 3×/6× 光学变焦。天玑 9400 处理器，5910mAh 电池。',
    detail: {
      屏幕: '6.78 英寸 2K 四微曲屏，120Hz',
      处理器: '天玑 9400',
      内存: '16GB',
      存储: '512GB',
      电池: '5910mAh，80W 有线 / 50W 无线',
      后置: '5000 万主摄 + 5000 万双潜望长焦'
    }
  },
  {
    id: 'p1008',
    name: '一加 OnePlus 13 骁龙 8 Elite 东方屏',
    category: 'phone',
    price: 4499,
    origin: 4999,
    sales: 19800,
    stock: 105,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80',
    colors: ['黑曜石', '白露', '蓝调时刻'],
    specs: '12GB+256GB',
    tags: ['性能', '热卖'],
    desc: '骁龙 8 Elite 顶级性能，第二代东方屏 2K 分辨率。6000mAh 冰川电池，100W 超级闪充。',
    detail: {
      屏幕: '6.82 英寸 2K 东方屏，120Hz LTPO',
      处理器: '骁龙 8 Elite',
      内存: '12GB LPDDR5X',
      存储: '256GB',
      电池: '6000mAh，100W 有线 / 50W 无线',
      系统: 'ColorOS 15'
    }
  },
  {
    id: 'p1009',
    name: '三星 Galaxy S25 Ultra 2 亿像素旗舰',
    category: 'phone',
    price: 9699,
    origin: 10999,
    sales: 5400,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&q=80',
    colors: ['钛灰', '钛黑', '钛蓝'],
    specs: '12GB+512GB',
    tags: ['旗舰', 'S Pen'],
    desc: '2 亿像素主摄，内置 S Pen 手写笔。骁龙 8 Elite for Galaxy 定制芯片，钛金属边框。',
    detail: {
      屏幕: '6.9 英寸 QHD+ 动态 AMOLED 2X，120Hz',
      处理器: '骁龙 8 Elite for Galaxy',
      内存: '12GB',
      存储: '512GB',
      电池: '5000mAh，45W 快充',
      特色: '内置 S Pen / 钛金属中框'
    }
  },
  {
    id: 'p1010',
    name: 'realme 真我 GT7 Pro 骁龙 8 Elite 电竞旗舰',
    category: 'phone',
    price: 3299,
    origin: 3999,
    sales: 24600,
    stock: 140,
    image: 'https://images.unsplash.com/photo-1580554530778-ca36943938b2?w=600&q=80',
    colors: ['火星橙', '星际黑'],
    specs: '12GB+256GB',
    tags: ['性价比', '电竞'],
    desc: '骁龙 8 Elite + 电竞独显芯片，6500mAh 泰坦电池。三星 Eco² 苍穹屏，6000nit 峰值亮度。',
    detail: {
      屏幕: '6.78 英寸 1.5K 苍穹屏，120Hz',
      处理器: '骁龙 8 Elite',
      电池: '6500mAh，120W 光速秒充',
      后置: '5000 万主摄 + 5000 万潜望长焦',
      散热: '11480mm² 双层 VC 散热'
    }
  },
  {
    id: 'p1011',
    name: '荣耀 X60 Pro 抗摔耐用电竞屏手机',
    category: 'phone',
    price: 1699,
    origin: 1999,
    sales: 42000,
    stock: 220,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
    colors: ['天海青', '燃橙色', '月影白'],
    specs: '12GB+256GB',
    tags: ['长续航', '抗摔'],
    desc: '6600mAh 超大电池，两天一充。十面抗摔设计，6600nit 护眼屏。适合学生与长辈使用。',
    detail: {
      屏幕: '6.78 英寸 1.5K 护眼屏，120Hz',
      处理器: '骁龙 6 Gen 1',
      电池: '6600mAh，66W 快充',
      后置: '1.08 亿像素主摄',
      特点: '十面抗摔 / 双向北斗卫星消息'
    }
  },
  {
    id: 'p1012',
    name: 'Redmi Note 14 Pro+ 2 亿像素影像手机',
    category: 'phone',
    price: 1999,
    origin: 2299,
    sales: 38600,
    stock: 180,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80',
    colors: ['子夜黑', '浅茄紫', '冰川蓝'],
    specs: '12GB+512GB',
    tags: ['大内存', '热卖'],
    desc: '2 亿像素光学防抖主摄，6200mAh 金沙江电池。1.5K 高光护眼屏，支持 IP68 防尘防水。',
    detail: {
      屏幕: '6.67 英寸 1.5K 护眼屏，120Hz',
      处理器: '骁龙 7s Gen 3',
      电池: '6200mAh，90W 快充',
      后置: '2 亿像素 OIS 主摄',
      防护: 'IP68 防尘防水'
    }
  },

  // ==================== 电脑办公 ====================
  {
    id: 'p2006',
    name: '联想 拯救者 Y9000P 2025 RTX4060 电竞本',
    category: 'computer',
    price: 9499,
    origin: 10999,
    sales: 3800,
    stock: 16,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80',
    colors: ['碳晶灰'],
    specs: 'i9-14900HX/4060/32G/1T',
    tags: ['电竞', '满血释放'],
    desc: 'i9-14900HX 处理器 + RTX 4060 独显，16 英寸 2.5K 240Hz 电竞屏。霜刃 Pro 散热系统。',
    detail: {
      屏幕: '16 英寸 2560×1600，240Hz，500nit',
      处理器: 'i9-14900HX',
      显卡: 'RTX 4060 Laptop 8GB（140W 满血）',
      内存: '32GB DDR5 5600',
      存储: '1TB PCIe 4.0 SSD',
      重量: '约 2.5kg'
    }
  },
  {
    id: 'p2007',
    name: '华为 MateBook X Pro 2025 微绒典藏本',
    category: 'computer',
    price: 13999,
    origin: 15999,
    sales: 1600,
    stock: 9,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
    colors: ['拂晓粉', '宣白', '雅川青'],
    specs: 'Ultra 9/32G/1T',
    tags: ['轻薄', '商务'],
    desc: '14.2 英寸 3.1K 原色全面屏，1.0kg 超轻机身。酷睿 Ultra 9 处理器，微绒金属工艺。',
    detail: {
      屏幕: '14.2 英寸 3.1K 原色屏，120Hz',
      处理器: '酷睿 Ultra 9 185H',
      内存: '32GB LPDDR5X',
      存储: '1TB SSD',
      重量: '约 1.0kg',
      特色: '微绒金属 / 超级终端'
    }
  },
  {
    id: 'p2008',
    name: 'Apple MacBook Pro 14 M4 Pro 24G+512G',
    category: 'computer',
    price: 15999,
    origin: 17499,
    sales: 2200,
    stock: 11,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    colors: ['深空黑', '银色'],
    specs: 'M4 Pro/24G/512G',
    tags: ['专业', '剪辑'],
    desc: 'M4 Pro 芯片，14.2 英寸 Liquid Retina XDR 显示屏。雷雳 5 接口，22 小时续航。',
    detail: {
      屏幕: '14.2 英寸 Liquid Retina XDR，120Hz ProMotion',
      处理器: 'Apple M4 Pro（12 核 CPU / 16 核 GPU）',
      内存: '24GB 统一内存',
      存储: '512GB SSD',
      接口: '3×雷雳 5 + HDMI + SD 卡槽',
      续航: '最长 22 小时'
    }
  },
  {
    id: 'p2009',
    name: '戴尔 DELL U2724D 27 英寸 2K 专业显示器',
    category: 'computer',
    price: 2199,
    origin: 2699,
    sales: 6800,
    stock: 55,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80',
    colors: ['黑色', '银色'],
    specs: '27 英寸 / 2K / 120Hz',
    tags: ['设计', '护眼'],
    desc: '27 英寸 2K IPS Black 面板，120Hz 刷新率。98% DCI-P3 广色域，出厂色彩校准。',
    detail: {
      尺寸: '27 英寸',
      分辨率: '2560×1440（IPS Black）',
      刷新率: '120Hz',
      色域: '98% DCI-P3',
      接口: 'HDMI / DP / USB-C 90W / USB Hub',
      认证: 'TÜV 硬件低蓝光'
    }
  },
  {
    id: 'p2010',
    name: '罗技 Logitech MX Keys S 无线背光键盘',
    category: 'computer',
    price: 799,
    origin: 999,
    sales: 12600,
    stock: 88,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80',
    colors: ['石墨黑', '珍珠白'],
    specs: '无线 / 背光',
    tags: ['办公', '静音'],
    desc: '智能背光按键，手部靠近自动点亮。支持三设备切换，Flow 跨电脑复制粘贴。',
    detail: {
      连接: 'Bolt USB 接收器 + 蓝牙，3 台设备',
      背光: '智能感应背光',
      续航: '背光开启 10 天 / 关闭 5 个月',
      布局: '全尺寸带数字键盘',
      充电: 'USB-C'
    }
  },
  {
    id: 'p2011',
    name: '西部数据 WD Black SN850X 1TB 游戏固态',
    category: 'computer',
    price: 649,
    origin: 899,
    sales: 14200,
    stock: 130,
    image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=600&q=80',
    colors: ['黑色'],
    specs: '1TB / M.2 PCIe4.0',
    tags: ['游戏', '高速'],
    desc: '顺序读取 7300MB/s，专为游戏优化。Game Mode 2.0 预加载技术，五年质保。',
    detail: {
      容量: '1TB',
      接口: 'M.2 2280 PCIe 4.0 ×4',
      读取速度: '最高 7300MB/s',
      写入速度: '最高 6300MB/s',
      质保: '五年有限质保'
    }
  },
  {
    id: 'p2012',
    name: '惠普 激光打印机 M232dw 无线双面',
    category: 'computer',
    price: 1099,
    origin: 1399,
    sales: 9400,
    stock: 62,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&q=80',
    colors: ['白色'],
    specs: '黑白激光 / 无线',
    tags: ['办公', '双面'],
    desc: '自动双面打印，无线连接手机直打。每分钟 29 页，支持 HP Smart App 远程打印。',
    detail: {
      类型: '黑白激光',
      速度: '29 页/分钟',
      功能: '打印 / 复印 / 扫描',
      连接: 'WiFi / USB / 手机直连',
      特色: '自动双面打印'
    }
  },

  // ==================== 数码配件 ====================
  {
    id: 'p3006',
    name: 'Apple AirPods Pro 2 主动降噪无线耳机',
    category: 'digital',
    price: 1599,
    origin: 1899,
    sales: 46000,
    stock: 175,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&q=80',
    colors: ['白色'],
    specs: 'USB-C / 主动降噪',
    tags: ['降噪', '热销'],
    desc: 'H2 芯片驱动，主动降噪能力翻倍。自适应通透模式，个性化空间音频。USB-C 充电盒。',
    detail: {
      芯片: 'Apple H2',
      降噪: '主动降噪 / 自适应通透',
      续航: '单次 6 小时，综合 30 小时',
      防护: 'IP54 防尘防水',
      充电: 'USB-C / MagSafe / 无线充电'
    }
  },
  {
    id: 'p3007',
    name: '小米 无线蓝牙音箱 Pro 便携防水',
    category: 'digital',
    price: 399,
    origin: 499,
    sales: 23400,
    stock: 160,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80',
    colors: ['深灰', '米白'],
    specs: '便携 / IP67',
    tags: ['户外', '防水'],
    desc: '双全频扬声器 + 无源辐射器，低音澎湃。IP67 防尘防水，14 小时续航，可串联立体声。',
    detail: {
      单元: '双全频 + 双无源辐射器',
      续航: '14 小时',
      防护: 'IP67 防尘防水',
      蓝牙: '5.3，支持双设备连接',
      特色: '支持立体声串联'
    }
  },
  {
    id: 'p3008',
    name: '绿联 UGREEN 雷电 4 扩展坞 11 合 1',
    category: 'digital',
    price: 599,
    origin: 799,
    sales: 11800,
    stock: 95,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&q=80',
    colors: ['深空灰'],
    specs: '雷电4 / 11 合 1',
    tags: ['扩展', '办公'],
    desc: '雷电 4 接口，支持双 4K 60Hz 输出。11 个接口一线扩展，96W 反向供电。',
    detail: {
      接口: '雷电4 ×1 / USB-C ×2 / USB-A ×3 / HDMI / SD / TF / 网口',
      视频输出: '双 4K 60Hz',
      供电: '96W PD 反向供电',
      传输: '40Gbps',
      材质: '全铝合金外壳'
    }
  },
  {
    id: 'p3009',
    name: 'Anker 安克 MagGo 磁吸无线充电宝 10000mAh',
    category: 'digital',
    price: 349,
    origin: 449,
    sales: 28600,
    stock: 210,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80',
    colors: ['白色', '黑色'],
    specs: '10000mAh / 磁吸',
    tags: ['便携', '磁吸'],
    desc: '磁吸即贴即充，无需线缆。10000mAh 大容量，自带支架可当手机立架使用。',
    detail: {
      容量: '10000mAh',
      无线输出: '磁吸 15W',
      有线输出: 'USB-C 30W',
      特色: '自带可折叠支架',
      重量: '约 220g'
    }
  },
  {
    id: 'p3010',
    name: '大疆 DJI Osmo Mobile 7 手机云台稳定器',
    category: 'digital',
    price: 799,
    origin: 999,
    sales: 7600,
    stock: 48,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80',
    colors: ['浅灰'],
    specs: '三轴 / 可折叠',
    tags: ['Vlog', '防抖'],
    desc: '三轴机械增稳，内置延长杆与三脚架。智能跟随 6.0，一键成片，折叠便携。',
    detail: {
      稳定: '三轴机械增稳',
      续航: '约 10 小时',
      特色: '内置延长杆 + 三脚架',
      跟随: 'ActiveTrack 6.0 智能跟随',
      适配: '手机宽度 67-84mm'
    }
  },
  {
    id: 'p3011',
    name: '闪迪 SanDisk 至尊超极速 128GB TF 卡',
    category: 'digital',
    price: 129,
    origin: 199,
    sales: 52000,
    stock: 400,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80',
    colors: ['标准版'],
    specs: '128GB / A2 V30',
    tags: ['热销', '存储'],
    desc: '读取速度 200MB/s，A2 应用性能等级。适用手机、平板、运动相机与无人机。',
    detail: {
      容量: '128GB',
      读取速度: '最高 200MB/s',
      写入速度: '最高 140MB/s',
      等级: 'U3 / V30 / A2',
      质保: '终身有限质保'
    }
  },
  {
    id: 'p3012',
    name: '雷蛇 Razer 炼狱蝰蛇 V3 电竞游戏鼠标',
    category: 'digital',
    price: 549,
    origin: 699,
    sales: 13400,
    stock: 82,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80',
    colors: ['黑色', '白色'],
    specs: '无线 / 30000DPI',
    tags: ['电竞', '轻量'],
    desc: 'Focus Pro 30K 光学传感器，仅 63g 轻量机身。第三代光学微动，9000 万次寿命。',
    detail: {
      传感器: 'Focus Pro 30K DPI',
      重量: '约 63g',
      微动: '第三代光学微动',
      续航: '最长 90 小时',
      连接: 'HyperSpeed 2.4G / 蓝牙 / 有线'
    }
  },

  // ==================== 家用电器 ====================
  {
    id: 'p4005',
    name: '海尔 501L 十字对开门冰箱 一级能效',
    category: 'home',
    price: 4299,
    origin: 5499,
    sales: 16800,
    stock: 42,
    image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=600&q=80',
    colors: ['星空银', '黑色'],
    specs: '501L / 十字四门',
    tags: ['国补', '包安装'],
    desc: '501L 大容量十字四门，风冷无霜。一级能效变频压缩机，干湿分储保鲜。',
    detail: {
      容积: '501L（冷藏 310L / 冷冻 191L）',
      能效: '一级能效',
      制冷: '风冷无霜',
      噪音: '35dB',
      保修: '整机 3 年 / 压缩机 10 年'
    }
  },
  {
    id: 'p4006',
    name: '小天鹅 滚筒洗衣机 10 公斤 洗烘一体',
    category: 'home',
    price: 3199,
    origin: 4199,
    sales: 12600,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80',
    colors: ['白色', '钛灰'],
    specs: '10kg / 洗烘一体',
    tags: ['国补', '热卖'],
    desc: '10 公斤大容量洗烘一体，BLDC 变频电机。高温筒自洁，除螨洗程序。',
    detail: {
      容量: '10kg 洗涤 / 7kg 烘干',
      电机: 'BLDC 变频电机',
      能效: '一级能效',
      特色: '高温筒自洁 / 除螨洗',
      噪音: '洗涤 52dB'
    }
  },
  {
    id: 'p4007',
    name: '九阳 破壁机 Y88 静音免手洗豆浆机',
    category: 'home',
    price: 899,
    origin: 1299,
    sales: 24800,
    stock: 108,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80',
    colors: ['白色', '灰色'],
    specs: '1.75L / 免手洗',
    tags: ['厨房', '静音'],
    desc: '免手洗自清洁，高温除菌。静音罩降噪设计，可打豆浆、米糊、果蔬汁。',
    detail: {
      容量: '1.75L',
      功率: '1500W',
      功能: '豆浆 / 米糊 / 果蔬 / 浓汤',
      特色: '免手洗自清洁 / 静音罩',
      转速: '38000 转/分'
    }
  },
  {
    id: 'p4008',
    name: '科沃斯 T50 Pro 扫地机器人 自动集尘',
    category: 'home',
    price: 3599,
    origin: 4599,
    sales: 8200,
    stock: 36,
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=600&q=80',
    colors: ['白色', '黑色'],
    specs: '扫拖一体 / 自集尘',
    tags: ['智能', '解放双手'],
    desc: '15000Pa 大吸力，双胶刷防缠绕。自动集尘基站，75 天免倒垃圾。',
    detail: {
      吸力: '15000Pa',
      导航: 'dToF 激光导航',
      基站: '自动集尘 / 自动洗拖布',
      续航: '约 180 分钟',
      集尘: '75 天免倒垃圾'
    }
  },
  {
    id: 'p4009',
    name: '美的 电热水器 60L 一级能效 速热',
    category: 'home',
    price: 1399,
    origin: 1899,
    sales: 15600,
    stock: 72,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
    colors: ['白色'],
    specs: '60L / 速热',
    tags: ['包安装', '安全'],
    desc: '60L 大容量，3300W 双管速热。一级能效，专利防电墙技术保障洗浴安全。',
    detail: {
      容量: '60L',
      功率: '3300W',
      能效: '一级能效',
      安全: '专利防电墙',
      保修: '整机 8 年'
    }
  },
  {
    id: 'p4010',
    name: '松下 电吹风 EH-NA0J 纳诺怡护发',
    category: 'home',
    price: 1299,
    origin: 1699,
    sales: 9400,
    stock: 58,
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=80',
    colors: ['玫瑰金', '白色'],
    specs: '大功率 / 纳诺怡',
    tags: ['护发', '高端'],
    desc: '纳诺怡双倍矿物质负离子，深层滋润秀发。速干大风量，智能温控防过热。',
    detail: {
      功率: '1200W',
      技术: '纳诺怡 X 双倍矿物质',
      风量: '1.6m³/分',
      模式: '智能温控 / 冷热交替',
      重量: '约 545g'
    }
  },

  // ==================== 服饰鞋包 ====================
  {
    id: 'p5005',
    name: '波司登 男士羽绒服 90 绒鹅绒中长款',
    category: 'fashion',
    price: 1299,
    origin: 2199,
    sales: 32000,
    stock: 180,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    colors: ['黑色', '藏青', '军绿'],
    specs: 'L 码 / 男款',
    tags: ['冬季', '90 绒'],
    desc: '90% 鹅绒填充，蓬松度 800+。防钻绒面料，中长款设计，保暖又显瘦。',
    detail: {
      填充物: '90% 白鹅绒',
      蓬松度: '800+',
      充绒量: '约 180g',
      面料: '防钻绒高密面料',
      尺码: 'M / L / XL / 2XL / 3XL'
    }
  },
  {
    id: 'p5006',
    name: '优衣库 女装 高级轻型羽绒服 便携款',
    category: 'fashion',
    price: 399,
    origin: 599,
    sales: 48000,
    stock: 260,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
    colors: ['米白', '黑色', '浅粉'],
    specs: 'M 码 / 女款',
    tags: ['轻薄', '便携'],
    desc: '高级轻型羽绒，可收纳进随身小袋。750 蓬松度，轻至 200g，通勤内搭皆宜。',
    detail: {
      填充物: '90% 羽绒',
      蓬松度: '750',
      重量: '约 200g',
      特色: '可收纳便携袋',
      尺码: 'S / M / L / XL'
    }
  },
  {
    id: 'p5007',
    name: 'Coach 蔻驰 女士单肩托特包 大容量',
    category: 'fashion',
    price: 1899,
    origin: 2999,
    sales: 8600,
    stock: 46,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    colors: ['棕色', '黑色'],
    specs: '均码 / 牛皮',
    tags: ['轻奢', '正品'],
    desc: '经典 Signature 涂层帆布，头层牛皮拼接。大容量可装 14 寸笔记本，通勤实用。',
    detail: {
      材质: '涂层帆布 + 头层牛皮',
      尺寸: '约 32×26×12cm',
      容量: '可放 14 英寸笔记本',
      背法: '单肩 / 手提',
      附件: '防尘袋 / 吊牌'
    }
  },
  {
    id: 'p5008',
    name: 'Levi\'s 李维斯 511 男士修身牛仔裤',
    category: 'fashion',
    price: 459,
    origin: 799,
    sales: 36000,
    stock: 220,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
    colors: ['深蓝', '浅蓝', '黑色'],
    specs: '32 码 / 男款',
    tags: ['经典', '修身'],
    desc: '经典 511 修身版型，弹力舒适面料。水洗工艺自然，四季百搭。',
    detail: {
      版型: '511 修身直筒',
      面料: '99% 棉 + 1% 氨纶',
      工艺: '水洗做旧',
      腰型: '中腰',
      尺码: '28-38 码'
    }
  },
  {
    id: 'p5009',
    name: 'New Balance NB 574 复古休闲运动鞋',
    category: 'fashion',
    price: 599,
    origin: 899,
    sales: 21400,
    stock: 130,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
    colors: ['灰色', '藏青', '米白'],
    specs: '42 码 / 男女同款',
    tags: ['复古', '经典'],
    desc: '经典 574 鞋型，ENCAP 中底缓震。麂皮与网布拼接鞋面，复古百搭。',
    detail: {
      中底: 'ENCAP 缓震科技',
      鞋面: '麂皮 + 网布拼接',
      鞋底: '耐磨橡胶大底',
      版型: '标准楦型',
      尺码: '36-45 码'
    }
  },
  {
    id: 'p5010',
    name: '海澜之家 男士商务衬衫 免烫长袖',
    category: 'fashion',
    price: 239,
    origin: 399,
    sales: 52000,
    stock: 320,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
    colors: ['白色', '浅蓝', '条纹'],
    specs: 'L 码 / 男款',
    tags: ['免烫', '商务'],
    desc: 'DP 免烫工艺，洗后平整如新。100 支高支棉，亲肤透气，商务通勤首选。',
    detail: {
      面料: '100 支纯棉',
      工艺: 'DP 免烫',
      版型: '修身',
      领型: '八字领',
      尺码: 'S-4XL'
    }
  },

  // ==================== 美妆护肤 ====================
  {
    id: 'p6004',
    name: '雅诗兰黛 小棕瓶精华 第七代 100ml',
    category: 'beauty',
    price: 1180,
    origin: 1580,
    sales: 28400,
    stock: 88,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    colors: ['100ml'],
    specs: '100ml / 面部精华',
    tags: ['正品', '经典'],
    desc: '第七代小棕瓶，专利 Chronolux 科技。夜间修护，改善细纹与暗沉。',
    detail: {
      规格: '100ml',
      核心成分: '二裂酵母发酵产物溶胞物',
      功效: '修护 / 抗老 / 提亮',
      适用肤质: '全肤质',
      产地: '美国'
    }
  },
  {
    id: 'p6005',
    name: 'SK-II 神仙水 护肤精华露 230ml',
    category: 'beauty',
    price: 1690,
    origin: 2140,
    sales: 14200,
    stock: 52,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80',
    colors: ['230ml'],
    specs: '230ml / 精华水',
    tags: ['高端', '正品'],
    desc: '含 90% 以上 PITERA 成分，调理肌肤水油平衡。改善粗糙，令肌肤透亮细腻。',
    detail: {
      规格: '230ml',
      核心成分: 'PITERA 发酵精华',
      功效: '调理 / 保湿 / 透亮',
      适用肤质: '全肤质',
      保质期: '3 年'
    }
  },
  {
    id: 'p6006',
    name: '花西子 玉容纱柔雾蜜粉饼 定妆控油',
    category: 'beauty',
    price: 219,
    origin: 299,
    sales: 38600,
    stock: 240,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
    colors: ['自然色', '象牙白'],
    specs: '8g / 定妆',
    tags: ['国货', '定妆'],
    desc: '玉容纱柔雾质地，轻薄贴合不卡粉。控油持妆 8 小时，自带粉扑便携。',
    detail: {
      净含量: '8g',
      质地: '柔雾粉质',
      功效: '定妆 / 控油 / 遮瑕',
      适用肤质: '油性 / 混合性',
      特色: '自带镜面与粉扑'
    }
  },
  {
    id: 'p6007',
    name: '完美日记 动物眼影盘 十二色大地色',
    category: 'beauty',
    price: 129,
    origin: 199,
    sales: 46000,
    stock: 300,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80',
    colors: ['大地色', '粉调'],
    specs: '12 色 / 眼影盘',
    tags: ['国货', '平价'],
    desc: '12 色哑光与珠光搭配，粉质细腻显色。日常通勤与约会妆容都能驾驭。',
    detail: {
      色号: '12 色大地盘',
      质地: '哑光 + 珠光',
      粉质: '细腻易晕染',
      适用: '日常 / 通勤妆',
      保质期: '3 年'
    }
  },
  {
    id: 'p6008',
    name: '理肤泉 B5 多效修复霜 40ml 舒缓修护',
    category: 'beauty',
    price: 189,
    origin: 259,
    sales: 32400,
    stock: 190,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    colors: ['40ml'],
    specs: '40ml / 修复霜',
    tags: ['敏感肌', '修护'],
    desc: '5% 泛醇 + 积雪草苷，修护受损屏障。舒缓泛红干痒，敏感肌安心使用。',
    detail: {
      规格: '40ml',
      核心成分: '5% 泛醇 / 积雪草苷',
      功效: '修护 / 舒缓 / 保湿',
      适用肤质: '敏感肌 / 屏障受损',
      无添加: '香精 / 酒精'
    }
  },
  {
    id: 'p6009',
    name: '毛戈平 光韵柔纱粉底液 持久遮瑕',
    category: 'beauty',
    price: 380,
    origin: 480,
    sales: 17600,
    stock: 115,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80',
    colors: ['自然色', '象牙白', '暖调'],
    specs: '30ml / 粉底液',
    tags: ['国货', '持妆'],
    desc: '光韵柔纱质地，轻薄服帖。中高遮瑕，持妆 12 小时不暗沉。',
    detail: {
      规格: '30ml',
      遮瑕度: '中高遮瑕',
      质地: '轻薄水润',
      持妆: '约 12 小时',
      适用肤质: '干性 / 混合性'
    }
  },

  // ==================== 食品生鲜 ====================
  {
    id: 'p7004',
    name: '五常大米 稻花香 2 号 10 斤 当季新米',
    category: 'food',
    price: 89,
    origin: 139,
    sales: 76000,
    stock: 620,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
    colors: ['10 斤装'],
    specs: '5kg / 真空装',
    tags: ['产地直发', '包邮'],
    desc: '黑龙江五常稻花香 2 号，当季新米。米粒饱满，蒸煮后香气浓郁，口感软糯。',
    detail: {
      净含量: '5kg（10 斤）',
      产地: '黑龙江五常',
      品种: '稻花香 2 号',
      包装: '真空砖包装',
      保质期: '12 个月'
    }
  },
  {
    id: 'p7005',
    name: '伊利 金典有机纯牛奶 250ml×12 盒',
    category: 'food',
    price: 69,
    origin: 99,
    sales: 92000,
    stock: 800,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80',
    colors: ['12 盒装'],
    specs: '250ml×12 / 有机',
    tags: ['有机', '囤货'],
    desc: '有机认证牧场奶源，每 100ml 含 3.8g 优质乳蛋白。无添加，全家适用。',
    detail: {
      规格: '250ml × 12 盒',
      蛋白质: '3.8g/100ml',
      认证: '中国有机产品认证',
      保质期: '6 个月',
      储存: '常温阴凉处'
    }
  },
  {
    id: 'p7006',
    name: '良品铺子 猪肉脯 靖江特产 200g×2',
    category: 'food',
    price: 59,
    origin: 89,
    sales: 58000,
    stock: 460,
    image: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=600&q=80',
    colors: ['原味', '蜜汁'],
    specs: '200g×2 / 独立装',
    tags: ['零食', '特产'],
    desc: '靖江传统工艺猪肉脯，选用后腿精肉。炭火烘烤，肉香浓郁有嚼劲。',
    detail: {
      净含量: '400g（200g×2）',
      配料: '猪后腿肉、白砂糖、酱油',
      工艺: '炭火烘烤',
      保质期: '180 天',
      产地: '江苏靖江'
    }
  },
  {
    id: 'p7007',
    name: '海南树上熟 贵妃芒 5 斤 新鲜水果',
    category: 'food',
    price: 59,
    origin: 109,
    sales: 44000,
    stock: 520,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80',
    colors: ['5 斤装', '9 斤装'],
    specs: '5 斤 / 整箱',
    tags: ['产地直发', '包邮'],
    desc: '海南三亚树上熟贵妃芒，果肉细腻无纤维。自然成熟采摘，香甜多汁。',
    detail: {
      净重: '5 斤（±0.3 斤）',
      产地: '海南三亚',
      品种: '贵妃芒',
      特点: '树上熟 / 无纤维',
      发货: '产地顺丰直发'
    }
  },
  {
    id: 'p7008',
    name: '三顿半 精品速溶咖啡 冻干粉 24 颗',
    category: 'food',
    price: 199,
    origin: 259,
    sales: 36800,
    stock: 280,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    colors: ['混合装'],
    specs: '3g×24 / 冻干',
    tags: ['咖啡', '办公'],
    desc: '冷萃冻干技术，3 秒溶于水与牛奶。6 种风味数字装，随时随地一杯好咖啡。',
    detail: {
      规格: '3g × 24 颗',
      工艺: '冷萃冻干',
      风味: '1-6 号六种烘焙度',
      保质期: '12 个月',
      冲泡: '冷水 / 热水 / 牛奶'
    }
  },
  {
    id: 'p7009',
    name: '青岛啤酒 经典 1903 听装 500ml×12',
    category: 'food',
    price: 79,
    origin: 119,
    sales: 52000,
    stock: 380,
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&q=80',
    colors: ['12 听装'],
    specs: '500ml×12 / 听装',
    tags: ['聚会', '囤货'],
    desc: '青岛啤酒经典 1903，百年酵母酿造。麦芽浓度 10 度，泡沫细腻口感醇厚。',
    detail: {
      规格: '500ml × 12 听',
      酒精度: '≥4.0%vol',
      原麦汁浓度: '10°P',
      保质期: '360 天',
      产地: '山东青岛'
    }
  },

  // ==================== 运动户外 ====================
  {
    id: 'p5011',
    name: '迪卡侬 露营帐篷 速开 3-4 人 防雨',
    category: 'sports',
    price: 599,
    origin: 899,
    sales: 12800,
    stock: 88,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80',
    colors: ['蓝色', '绿色'],
    specs: '3-4 人 / 速开',
    tags: ['露营', '防雨'],
    desc: '2 秒速开设计，新手也能轻松搭建。3000mm 防水涂层，防晒 UPF50+。',
    detail: {
      容纳人数: '3-4 人',
      展开尺寸: '约 240×210×130cm',
      防水: 'PU3000mm',
      防晒: 'UPF50+',
      重量: '约 4.2kg'
    }
  },
  {
    id: 'p5012',
    name: 'Keep 智能动感单车 C1 家用静音健身车',
    category: 'sports',
    price: 1499,
    origin: 2199,
    sales: 9600,
    stock: 54,
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&q=80',
    colors: ['白色', '黑色'],
    specs: '家用 / 静音',
    tags: ['健身', '智能'],
    desc: '磁控静音飞轮，噪音低于 40dB。连接 Keep App 跟练，实时记录运动数据。',
    detail: {
      飞轮: '6kg 磁控飞轮',
      阻力: '32 档磁控调节',
      噪音: '低于 40dB',
      承重: '最大 120kg',
      特色: 'Keep App 联动跟练'
    }
  },
  {
    id: 'p5013',
    name: '阿迪达斯 男士运动长裤 速干训练裤',
    category: 'sports',
    price: 269,
    origin: 429,
    sales: 34000,
    stock: 240,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80',
    colors: ['黑色', '藏青'],
    specs: 'L 码 / 男款',
    tags: ['速干', '运动'],
    desc: 'AEROREADY 吸湿排汗科技，保持身体干爽。弹力面料，训练与日常皆宜。',
    detail: {
      面料: '再生聚酯纤维',
      科技: 'AEROREADY 排汗',
      版型: '锥形收口',
      口袋: '双侧拉链口袋',
      尺码: 'S-3XL'
    }
  },
  {
    id: 'p5014',
    name: '骆驼 CAMEL 户外冲锋衣 三合一防风防水',
    category: 'sports',
    price: 599,
    origin: 1099,
    sales: 26400,
    stock: 168,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    colors: ['黑色', '岩灰', '橙红'],
    specs: 'L 码 / 三合一',
    tags: ['户外', '防风'],
    desc: '三合一可拆卸设计，抓绒内胆 + 防风外壳。防水指数 10000mm，登山徒步适用。',
    detail: {
      防水: '10000mm 静水压',
      透湿: '5000g/m²/24h',
      结构: '三合一可拆内胆',
      面料: '聚酯纤维 + 抓绒',
      尺码: 'S-3XL'
    }
  },
  {
    id: 'p5015',
    name: '李宁 羽毛球拍 全碳素超轻双拍套装',
    category: 'sports',
    price: 329,
    origin: 499,
    sales: 18600,
    stock: 140,
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&q=80',
    colors: ['黑红', '蓝白'],
    specs: '双拍 / 全碳素',
    tags: ['入门', '套装'],
    desc: '全碳素一体成型拍框，超轻 78g。附赠球拍包与 3 只训练球，入门首选。',
    detail: {
      材质: '全碳素纤维',
      重量: '约 78g（4U）',
      磅数: '22-26 lbs',
      套装: '双拍 + 拍包 + 3 球',
      适用: '入门 / 休闲'
    }
  },

  // ==================== 母婴玩具 ====================
  {
    id: 'p8004',
    name: '爱他美 卓萃幼儿配方奶粉 3 段 800g',
    category: 'baby',
    price: 329,
    origin: 429,
    sales: 42000,
    stock: 320,
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&q=80',
    colors: ['800g'],
    specs: '3 段 / 12-36 月',
    tags: ['正品', '进口'],
    desc: '德国原装进口，含天然乳脂与益生元组合。助力宝宝肠道健康与免疫发育。',
    detail: {
      规格: '800g 罐装',
      适用年龄: '12-36 个月',
      产地: '德国',
      核心成分: '天然乳脂 / GOS/FOS 益生元',
      保质期: '2 年'
    }
  },
  {
    id: 'p8005',
    name: '帮宝适 一级帮纸尿裤 L 码 超薄透气',
    category: 'baby',
    price: 189,
    origin: 269,
    sales: 68000,
    stock: 520,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80',
    colors: ['L 码'],
    specs: 'L 码 / 9-14kg',
    tags: ['囤货', '超薄'],
    desc: '3D 透气孔设计，超薄干爽。柔软亲肤表层，弹力腰围贴合不勒肚。',
    detail: {
      尺码: 'L（9-14kg）',
      片数: '共 108 片',
      特点: '超薄 / 透气 / 弹力腰围',
      适用: '昼夜通用',
      保质期: '3 年'
    }
  },
  {
    id: 'p8006',
    name: '费雪 Fisher-Price 婴儿安抚海马玩具',
    category: 'baby',
    price: 129,
    origin: 199,
    sales: 32000,
    stock: 280,
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&q=80',
    colors: ['蓝色', '粉色'],
    specs: '0-2 岁 / 安抚',
    tags: ['益智', '安抚'],
    desc: '柔和灯光与白噪音，帮助宝宝入睡。可水洗柔软材质，妈妈安心之选。',
    detail: {
      适用年龄: '0-2 岁',
      功能: '音乐 / 白噪音 / 柔光',
      材质: '短绒 + ABS',
      供电: '3 节 AA 电池',
      清洗: '外罩可拆洗'
    }
  },
  {
    id: 'p8007',
    name: '布鲁可 大颗粒积木 百变机甲套装',
    category: 'baby',
    price: 199,
    origin: 299,
    sales: 24800,
    stock: 190,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80',
    colors: ['标准版'],
    specs: '3-6 岁 / 大颗粒',
    tags: ['益智', '国货'],
    desc: '大颗粒圆润无毛刺，适合小手抓握。可拼搭多种机甲造型，锻炼动手能力。',
    detail: {
      零件数: '168 片',
      适龄: '3-6 岁',
      材质: '食品级 ABS',
      造型: '可拼 5 种机甲',
      认证: '3C 认证'
    }
  },
  {
    id: 'p8008',
    name: '好孩子 儿童安全座椅 0-12 岁 ISOFIX',
    category: 'baby',
    price: 1599,
    origin: 2299,
    sales: 7400,
    stock: 42,
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&q=80',
    colors: ['星空灰', '雾霾蓝'],
    specs: '0-12 岁 / ISOFIX',
    tags: ['安全', '出行'],
    desc: 'ISOFIX 硬接口 + 支撑腿，安装稳固。0-12 岁全阶段适用，侧撞防护系统。',
    detail: {
      适用年龄: '0-12 岁',
      安装: 'ISOFIX 硬接口 + 支撑腿',
      认证: 'i-Size / 3C',
      调节: '12 档头枕高度',
      面料: '亲肤透气可拆洗'
    }
  },
  {
    id: 'p8009',
    name: 'babycare 婴儿湿巾 手口专用 80 抽×6',
    category: 'baby',
    price: 59,
    origin: 99,
    sales: 88000,
    stock: 700,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80',
    colors: ['6 包装'],
    specs: '80 抽×6 / 手口',
    tags: ['囤货', '无添加'],
    desc: '纯水配方，无香精无酒精。加厚珍珠纹无纺布，手口专用，宝宝放心用。',
    detail: {
      规格: '80 抽 × 6 包',
      材质: '珍珠纹无纺布',
      成分: '纯水 + 木糖醇',
      无添加: '香精 / 酒精 / 荧光剂',
      保质期: '3 年'
    }
  },
  {
    id: 'p8010',
    name: '乐高 LEGO 城市系列 60380 市中心',
    category: 'baby',
    price: 1599,
    origin: 1999,
    sales: 3200,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80',
    colors: ['标准版'],
    specs: '2010 片 / 8 岁+',
    tags: ['收藏', '旗舰'],
    desc: '乐高城市市中心旗舰套装，2010 片零件。含咖啡馆、公寓、社区花园等模块。',
    detail: {
      零件数: '2010 片',
      适龄: '8 岁以上',
      人仔数: '14 个',
      系列: 'LEGO City',
      成品尺寸: '约 46×38×33cm'
    }
  }
]

/** 商品 id -> 商品 映射，避免列表页 O(n^2) 查找 */
export const productMap = products.reduce((map, item) => {
  map[item.id] = item
  return map
}, {})

/** 首页推荐位（轮播） */
export const banners = [
  {
    id: 'b1',
    title: '超级品类日',
    subtitle: '手机电脑 直降 800 元',
    cta: '立即抢购',
    to: '/products?category=phone',
    bg: 'linear-gradient(135deg, #ff7a45 0%, #f5333f 100%)'
  },
  {
    id: 'b2',
    title: '新家焕新季',
    subtitle: '大家电 以旧换新至高补贴 1000',
    cta: '逛逛家电',
    to: '/products?category=home',
    bg: 'linear-gradient(135deg, #36cfc9 0%, #08979c 100%)'
  },
  {
    id: 'b3',
    title: '换季衣橱',
    subtitle: '服饰鞋包 低至 5 折',
    cta: '去挑选',
    to: '/products?category=fashion',
    bg: 'linear-gradient(135deg, #9254de 0%, #722ed1 100%)'
  },
  {
    id: 'b4',
    title: '生鲜到家',
    subtitle: '产地直发 次日达 坏果包赔',
    cta: '买水果',
    to: '/products?category=food',
    bg: 'linear-gradient(135deg, #ffc53d 0%, #fa8c16 100%)'
  },
  {
    id: 'b5',
    title: '运动户外季',
    subtitle: '装备满 300 减 50 露营正当时',
    cta: '去看看',
    to: '/products?category=sports',
    bg: 'linear-gradient(135deg, #40a9ff 0%, #096dd9 100%)'
  },
  {
    id: 'b6',
    title: '母婴安心购',
    subtitle: '大牌奶粉纸尿裤 正品保障',
    cta: '逛母婴',
    to: '/products?category=baby',
    bg: 'linear-gradient(135deg, #ff85c0 0%, #eb2f96 100%)'
  }
]

/**
 * 首页品牌墙（纯静态文案，用于首页"大牌直供"区块）
 * logo 使用文字首字渲染，不依赖外部图片资源。
 */
export const brands = [
  { id: 'br1', name: '华为', slogan: 'HarmonyOS 全场景', bg: 'linear-gradient(135deg, #ff7a45 0%, #f5333f 100%)' },
  { id: 'br2', name: '小米', slogan: '让每个人享受科技', bg: 'linear-gradient(135deg, #ff9a2e 0%, #ff5a1f 100%)' },
  { id: 'br3', name: 'Apple', slogan: 'Think Different', bg: 'linear-gradient(135deg, #8c8c8c 0%, #434343 100%)' },
  { id: 'br4', name: '联想', slogan: '智慧中国 联想未来', bg: 'linear-gradient(135deg, #4d8bff 0%, #1a5fd6 100%)' },
  { id: 'br5', name: '索尼', slogan: 'Make Believe', bg: 'linear-gradient(135deg, #5b6b8c 0%, #2b3550 100%)' },
  { id: 'br6', name: '美的', slogan: '科技尽善 生活尽美', bg: 'linear-gradient(135deg, #36cfc9 0%, #08979c 100%)' },
  { id: 'br7', name: '海尔', slogan: '美好生活 智家定制', bg: 'linear-gradient(135deg, #597ef7 0%, #2f54eb 100%)' },
  { id: 'br8', name: '兰蔻', slogan: 'Lancôme Paris', bg: 'linear-gradient(135deg, #d3adf7 0%, #9254de 100%)' },
  { id: 'br9', name: '耐克', slogan: 'Just Do It', bg: 'linear-gradient(135deg, #595959 0%, #1f1f1f 100%)' },
  { id: 'br10', name: '乐高', slogan: 'Inspire and Develop', bg: 'linear-gradient(135deg, #ffd666 0%, #faad14 100%)' }
]

/**
 * 首页新品预告（静态排期，用于"即将开售"区块）
 * date 为演示排期文案，不代表真实上架时间。
 */
export const upcoming = [
  {
    id: 'u1',
    name: '华为 MateBook Fold 折叠屏笔记本',
    date: '03-18 10:00',
    tag: '预约中',
    stock: '首批 200 台',
    reserve: 12840
  },
  {
    id: 'u2',
    name: 'Apple iPhone 17 Air 超薄机型',
    date: '03-22 20:00',
    tag: '即将开售',
    stock: '首批 500 台',
    reserve: 46200
  },
  {
    id: 'u3',
    name: '小米 YU7 智能座舱周边套装',
    date: '03-25 10:00',
    tag: '预约中',
    stock: '首批 800 套',
    reserve: 8960
  },
  {
    id: 'u4',
    name: '戴森 V16 无绳吸尘器旗舰版',
    date: '03-28 00:00',
    tag: '即将开售',
    stock: '首批 300 台',
    reserve: 5240
  }
]

/**
 * 首页平台数据条：由真实商品数据推导（件数、销量、分类数等），
 * 不写死数字，避免与商品库不一致。
 */
export const platformStats = (() => {
  const totalSales = products.reduce((sum, p) => sum + (p.sales || 0), 0)
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0)
  const onSale = products.filter((p) => p.origin > p.price).length
  const categoriesUsed = new Set(products.map((p) => p.category)).size
  return [
    { key: 'products', label: '在架商品', value: products.length, unit: '件', icon: 'Goods' },
    { key: 'sales', label: '累计销量', value: (totalSales / 10000).toFixed(1), unit: '万件', icon: 'TrendCharts' },
    { key: 'promo', label: '促销中', value: onSale, unit: '款', icon: 'Discount' },
    { key: 'stock', label: '现货库存', value: (totalStock / 10000).toFixed(1), unit: '万件', icon: 'Box' },
    { key: 'cats', label: '覆盖品类', value: categoriesUsed, unit: '个', icon: 'Grid' }
  ]
})()

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/user.model.js'
import Product from '../models/product.model.js'
import Coupon from '../models/coupon.model.js'
import Order from '../models/order.model.js'
dotenv.config()

// 用户
const users = [
  {
    name: 'admin',
    email: 'root@123.com',
    password: 'root123',
    role: 'admin'
  },
  {
    name: 'testcust',
    email: 'testcust@123.com',
    password: 'testcust',
    role: 'customer'
  }
]

// 商品
const products = [
  {
    name: '联想Thinkbook 14锐龙版',
    description: 'ThinkPad联想ThinkBook14/16锐龙R7 1TB固态硬盘高色域银灰色学生商务办公游戏笔记本电脑官方旗舰店',
    price: 2000,
    image: 'https://img.alicdn.com/i1/2955374408/O1CN01OmaX0c1iQugDE0fKX_!!2955374408.jpg',
    category: 'electronics',
    isFeatured: true
  },
  {
    name: '长城512G固态硬盘',
    description: '采用高性能的NAND闪存和先进的控制芯片，提供快速的数据传输速度，极大提升电脑启动和应用加载速度。凭借512GB的大容量，可以满足日常存储需求，轻松存储操作系统、软件和大量数据文件。',
    price: 100,
    image: 'https://ts1.cn.mm.bing.net/th/id/R-C.718bceadd93d331a92d509507663493b?rik=YWPSoPmoAz%2fmeQ&riu=http%3a%2f%2fimg.pddpic.com%2fmms-material-img%2f2023-01-14%2fcfe9ea75-e621-4687-865f-da18ad7dff15.png.a.jpeg&ehk=E5BRRnh493zIpd7zyBltI5rJHhxo1jeRwUEYxsoronI%3d&risl=&pid=ImgRaw&r=0',
    category: 'electronics',
  },
  {
    name: '小米11 青春版',
    description: '搭载最新的高通骁龙888处理器，强劲性能与流畅体验完美结合。配备一块6.81英寸AMOLED曲面屏，支持120Hz刷新率，色彩鲜艳，细腻清晰，带来极致视觉享受。',
    price: 1500,
    image: 'https://img1.wushang.com/pn/wsec-img1/2021/4/26/631bfcfe-f1a3-484a-a3a7-00f1c9978b9e.jpg?x-oss-process=image/resize,w_800,h_800',
    category: 'electronics',
    isFeatured: true
  },
  {
    name: '华为(HUAWEI)nova8SE',
    description: '搭载强劲的联发科天玑 720 处理器，性能强劲，轻松应对多任务处理和高性能应用。支持66W超级快充，轻松实现快速充电，确保长时间使用不受电量困扰。',
    price: 2000,
    image: 'https://ts1.cn.mm.bing.net/th/id/R-C.f6d898728faf8d3c9dc2b62bb3b0db75?rik=v%2bZx6K5YupPEsQ&riu=http%3a%2f%2fimg.dixintong.com%2fInUpImg%2fProImg%2f2020-11-09%2f201109143133905936.jpg&ehk=n0ltAlE0YFpdobndo2DNQV0ZJnTepXh%2fSC03Jex4sJo%3d&risl=&pid=ImgRaw&r=0',
    category: 'electronics',
  },
  {
    name: 'Beats Studio Wireless 头戴式 蓝牙无线耳机',
    description: '，凭借其出色的音质和时尚设计，成为音乐爱好者的理想选择。采用高级噪声取消技术，有效隔绝外界噪音，让您沉浸在纯粹的音乐世界中。',
    price: 900,
    image: 'https://m.360buyimg.com/n12/jfs/t1984/26/1971059024/215399/47a263f2/56988bfeN89c02ad3.jpg!q70.jpg',
    category: 'electronics',
    isFeatured: true
  },
  {
    name: 'Switch游戏手柄 NS Switch Pro',
    description: '为 Nintendo Switch 提供卓越的游戏体验，采用符合人体工学的设计，手感舒适，即使长时间游戏也能保持良好的操控感。',
    price: 800,
    image: 'https://cbu01.alicdn.com/img/ibank/2018/268/548/8882845862_986152284.jpg',
    category: 'electronics',
    isFeatured: true
  },
  {
    name: '简约白色上衣',
    description: '设计简洁大方，采用优质面料，舒适透气。经典白色配色，百搭时尚',
    price: 30,
    image: 'https://cdn.pixabay.com/photo/2016/03/25/09/04/t-shirt-1278404_1280.jpg',
    category: 'clothing'
  },
  {
    name: '经典皮鞋',
    description: '经典款式，采用优质皮革材料，手工精细缝制，舒适耐用。外观简洁大方，适合各种场合。',
    price: 80,
    image: 'https://cdn.pixabay.com/photo/2021/03/08/12/31/oxford-shoes-6078993_1280.jpg',
    category: 'clothing',
    isFeatured: true
  },
  {
    name: '太阳镜',
    description: '采用高品质镜片，有效防紫外线，保护眼睛免受强光刺激。经典设计，简洁时尚，适合各种户外活动与日常佩戴。',
    price: 10,
    image: 'https://cdn.pixabay.com/photo/2016/03/27/19/33/sunset-1283872_1280.jpg',
    category: 'clothing'
  },
  {
    name: '卡其色夹克',
    description: '经典耐看的卡其色设计，适合多种季节穿搭。采用优质面料，结实耐用，透气性好，保持舒适感的同时展现简约风格。',
    price: 50,
    image: 'https://cdn.pixabay.com/photo/2017/09/07/04/54/khaki-2723896_1280.jpg',
    category: 'clothing'
  },
  {
    name: '男士西装',
    description: '经典剪裁与现代设计的完美结合，采用高品质面料，舒适透气，展现精致与优雅。无论是正式场合还是重要聚会，合身的版型与精湛的工艺让您始终保持干练与自信。',
    price: 300,
    image: 'https://cdn.pixabay.com/photo/2017/08/28/02/59/suit-2688317_1280.jpg',
    isFeatured: true,
    category: 'clothing'
  },
  {
    name: '书包',
    description: '简约实用的设计，采用耐用材质，确保长时间使用不易磨损。宽敞的内部空间可容纳书本、笔记本和其他日常物品，多个分隔设计方便物品分类收纳。',
    price: 40,
    image: 'https://cdn.pixabay.com/photo/2020/09/03/12/25/school-supplies-5541102_1280.jpg',
    category: 'clothing'
  },
  {
    name: '【美的MB-FB40Star301】美的电饭煲',
    description: '采用先进的技术与精密的设计，具有4L大容量，满足家庭日常烹饪需求。其内胆采用高科技涂层，耐磨防粘，方便清洁，确保每次烹饪都能保留食材原味。',
    price: 40,
    image: 'https://pic.midea.cn/ImageStore/156138/pic/027b8fd966297317A19466/027b8fd966297317A19466.jpg',
    category: 'homeliving'
  },
  {
    name: '美的滚筒洗衣机',
    description: '融合先进技术与现代设计，提供高效且节能的洗涤体验。采用智能感知系统，根据衣物重量和污渍程度自动调节水量、洗涤时间和力度，确保每次洗涤都能达到最佳效果。',
    price: 40,
    image: 'https://ts1.cn.mm.bing.net/th/id/R-C.2df5433d697be4a0b6fb970529ed586e?rik=rVWuEC%2bun59iDQ&riu=http%3a%2f%2fdesignmoma.com%2fupload%2f202007%2f03%2f202007031743460743.png&ehk=Evyppanx8Lt0sn8wfVgXR6zXUD2UwrzqmxeeE32BrQo%3d&risl=&pid=ImgRaw&r=0',
    category: 'homeliving'
  },
  {
    name: '扫地机器人',
    description: '采用先进的智能导航系统，能够高效清洁家中每个角落。通过激光或视觉传感器，自动规划最优清扫路径，有效避开障碍物并覆盖每个清洁区域。',
    price: 40,
    image: 'https://pic4.zhimg.com/v2-ebcac8a3a83d20e59a814f6b861159c9_r.jpg?source=172ae18b',
    isFeatured: true,
    category: 'homeliving'
  },
  {
    name: '【美的GDC18FR】美的电风扇',
    description: '设计简洁时尚，采用高效电机，提供强劲的风力与静音运行，确保您在炎热的夏季享受清凉的同时，保持安静舒适的环境。',
    price: 40,
    image: 'https://dsdcp.smartmidea.net/mcsp/prod/20210422/1619034944243.jpg',
    category: 'homeliving'
  },
  {
    name: '【美的M1-L213C黑色】美的微波炉',
    description: '以时尚简约的黑色外观设计，完美融入现代厨房风格。拥有智能微波加热技术，能够快速均匀地加热食物，节省时间的同时保留食物的原汁原味。',
    price: 40,
    image: 'https://pic.midea.cn/ImageStore/110299/pic/0694a4f7c6aa8a0cA22614/0694a4f7c6aa8a0cA22614.jpg',
    category: 'homeliving'
  },
  {
    name: '立新玻璃化妆品护肤品套装',
    description: '套装内含多种护肤精华，如洁面乳、爽肤水、精华液和面霜等，能全面满足不同肤质的护理需求。其独特配方融合天然植物精华，温和滋养肌肤，深层保湿并有效改善肌肤暗沉、干燥等问题。',
    price: 40,
    image: 'https://cbu01.alicdn.com/img/ibank/2017/271/621/6488126172_1526037907.jpg',
    category: 'beauty'
  },
  {
    name: '飘柔洗发水',
    description: '采用先进的护发科技，专为各种发质设计，帮助清洁头发同时深层滋养。其温和的配方能够有效去除污垢和多余油脂，保持头发清爽不油腻，赋予头发自然的光泽和顺滑感。',
    price: 40,
    image: 'https://cbu01.alicdn.com/img/ibank/O1CN01j8AzsY1MUBvzOiTNz_!!2208581041437-0-cib.jpg',
    isFeatured: true,
    category: 'beauty'
  },
  {
    name: '舒肤佳沐浴露',
    description: '，以其温和清爽的配方，提供全方位的肌肤呵护，帮助深层清洁肌肤的同时保持水润。富含天然保湿成分，能有效滋养干燥肌肤，令肌肤柔软光滑，远离紧绷感。',
    price: 40,
    image: 'https://imgservice.suning.cn/uimg1/b2c/image/FVngqjua_0-Tcq7ap8ssWQ.jpg_800w_800h_4e',
    category: 'beauty'
  },
  {
    name: '欧诗漫洗面奶',
    description: '融合珍珠粉与天然植物精华，专为深层洁净和提亮肤色设计。其丰富的泡沫质地，轻柔地去除肌肤表面的污垢和多余油脂，清洁同时不伤害肌肤屏障，令肌肤保持清爽透亮。',
    price: 40,
    image: 'https://img.alicdn.com/i3/2206409873889/O1CN01PvAQQM1ebD2hplE71_!!2206409873889.jpg',
    category: 'beauty'
  },
  {
    name: '乐事得克萨斯烧烤味薯片',
    description: '精选优质马铃薯，搭配浓郁的得克萨斯烧烤风味调料，带来香辣适中、咸甜平衡的美味体验。',
    price: 40,
    image: 'https://imgservice.suning.cn/uimg1/b2c/image/J2PSxj2RX4JtsOip3B8JOg.jpg_800w_800h_4e',
    isFeatured: true,
    category: 'food'
  },
  {
    name: '西兰花400g',
    description: '，营养丰富、清香脆嫩，是家庭健康饮食的首选食材。富含膳食纤维、维生素C、钙和抗氧化成分，有助于提升免疫力、促进消化和维护骨骼健康。',
    price: 40,
    image: 'https://ts1.cn.mm.bing.net/th/id/R-C.eecab2e259791b0bd256fe267f5d0143?rik=BXS1TZRQcDSd1A&riu=http%3a%2f%2fimg.365diandao.com%2fStorage%2fShop%2f528%2fProducts%2f8145%2f1.png&ehk=zdI%2fjzt4Arx55%2f%2fJbrYgzzmphlgVH%2fhweF4IB0M4yok%3d&risl=&pid=ImgRaw&r=0',
    isFeatured: true,
    category: 'food'
  },
  {
    name: '可口可乐罐装',
    description: '精美铝罐包装，便于携带与存储，轻松开启，即刻畅享清凉与满足。独特的气泡感搭配浓郁的甜香味道，为聚会、户外活动或日常生活增添欢乐氛围。',
    price: 40,
    image: 'https://cbu01.alicdn.com/img/ibank/2020/985/704/13829407589_733394383.jpg',
    isFeatured: true,
    category: 'food'
  },
  {
    name: '松子',
    description: '颗粒饱满，香脆可口，富含优质植物蛋白、不饱和脂肪酸、维生素E和多种矿物质，具有极高的营养价值。',
    price: 40,
    image: 'https://pic.616pic.com/ys_bnew_img/00/17/12/BubgWmmLrL.jpg',
    category: 'food'
  },
  {
    name: '自行车',
    description: '设计结构科学，采用轻量化车架与高强度材质，骑行更轻松、安全。适用于多种场景，无论是日常通勤、户外休闲还是长途旅行，都能满足需求。',
    price: 40,
    image: 'https://image.bitautoimg.com/appimage-1500-w1/mapi/media/2019/08/22/1a63a3f5da5f42cba2a035f468a5b070.jpeg',
    category: 'sports'
  },
  {
    name: '户外帐篷',
    description: '野外露营的必备装备，专为户外爱好者设计，兼具便携性与耐用性。采用高强度防水面料和稳定支撑结构，无惧风雨，为您提供安全舒适的临时居所。',
    price: 40,
    image: 'https://www.ourqm.com/upload/2020/04/01/20200401142853361.jpg',
    category: 'sports'
  },
  {
    name: '匹克跑鞋',
    description: '为跑者量身打造的专业运动鞋，以舒适性与性能兼具的设计，助力每一步的精彩表现。鞋面采用透气网布材质，轻盈贴合，保持双脚干爽舒适。',
    price: 40,
    image: 'https://ts1.cn.mm.bing.net/th/id/R-C.30227a5416458acb7c18e1ad1138ae17?rik=4Mc3L086u1JFAw&riu=http%3a%2f%2fimage.epeaksport.com%2fimage%2fProduct%2f2016%2fE64761H%2fE64761H_16.jpg&ehk=WyJLdVkpf3u8Hwo9ZYER11rnZSklhBBlqPxhrf8ODL4%3d&risl=&pid=ImgRaw&r=0',
    category: 'sports'
  },
  {
    name: '威克多比赛1号羽毛球',
    description: '专业比赛级羽毛球，专为羽毛球爱好者和职业选手设计。采用高品质鹅毛与复合软木球头制作，确保飞行轨迹稳定，击球手感舒适。',
    price: 40,
    image: 'https://ts1.cn.mm.bing.net/th/id/R-C.0f85a4f30d1ec17a39ceba0a82ccaf7e?rik=LHnosphrovxoIw&riu=http%3a%2f%2fr.ctsports.com.cn%2fimages%2f201605%2fgoods_img%2f3540_P_1462580531040.jpg&ehk=3fn256pKtoYIIdC3jiTMtioMNmrgJN3MqWbkcctgSA0%3d&risl=&pid=ImgRaw&r=0',
    isFeatured: true,
    category: 'sports'
  },
  {
    name: '欧比佳婴儿奶粉',
    description: '专为宝宝成长阶段科学配比，提供全面营养支持。精选优质奶源，采用先进生产工艺，确保奶粉的安全与品质。',
    price: 40,
    image: 'https://m.baobei360.com/upfile/product/202007/202007011450042166_1600x1600.png',
    category: 'baby'
  },
  {
    name: '婴儿床木制',
    description: '采用天然木材精心打造，环保无毒，坚固耐用，为宝宝提供一个安全舒适的睡眠环境。木材质感温暖，能够调节室内湿度，适合宝宝娇嫩的肌肤。',
    price: 40,
    image: 'https://m.360buyimg.com/n12/jfs/t2041/92/2811385152/256826/bede6c02/56f4e1d2Nb198d9fe.jpg!q70.jpg',
    category: 'baby'
  },
  {
    name: '可心柔婴儿用保湿抽纸',
    description: '专为宝宝娇嫩肌肤设计，采用天然植物纤维和温和配方，柔软细腻，亲肤无刺激。',
    price: 40,
    image: 'https://img.alicdn.com/i3/2793799007/TB2rccHdxdkpuFjy0FbXXaNnpXa_!!2793799007.jpg',
    category: 'baby'
  },
  {
    name: '《Node.js实战 (第2版)》',
    description: '一本深入浅出、全面讲解 Node.js 的实用书籍，适合从初学者到进阶开发者。',
    price: 40,
    image: 'https://www.linuxprobe.com/wp-content/uploads/2021/03/25329015-1_u_2.jpg',
    category: 'books'
  },
  {
    name: '钢笔',
    description: '融合现代技术与经典设计，致力于为书写者提供流畅、舒适的书写体验。每支钢笔均采用高质量的材料精工制造，笔尖光滑，确保墨水均匀流出，书写更加顺畅。',
    price: 40,
    image: 'https://pic3.zhimg.com/v2-1f2b6a2a474ae13a0c50f9c90c9fe5ca_r.jpg',
    isFeatured: true,
    category: 'books'
  },
  {
    name: '《操作系统导论》',
    description: '一本经典的操作系统教材，系统地介绍了操作系统的基本原理、核心概念和技术细节，涵盖了进程管理、内存管理、文件系统、输入输出管理、并发控制等方面的内容。',
    price: 40,
    image: 'https://img.alicdn.com/bao/uploaded/i2/2145487409/O1CN01BjwLkg24bNFe3OEwc_!!0-item_pic.jpg',
    category: 'books'
  },
]

// 优惠券
const coupons = [
  {
    code: "111111",
    discountPercentage: 10,
    expirationDate: new Date("2030-12-31"),
  },
]

// 连接数据库
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })

const seedData = async () => {
  try {
    // 删除数据库中的数据
    await User.deleteMany()
    await Product.deleteMany()
    await Coupon.deleteMany()
    await Order.deleteMany()

    // 填充用户数据
    await User.create(users)
    console.log('Seed Users Data Success!')

    // 填充商品数据
    await Product.create(products)
    console.log('Seed Products Data Success!')

    // 获取顾客id（优惠券数据需要）
    const couponUser = await User.findOne(
      { name: 'testcust' },
      { projection: { _id: 1 } }
    )
    // 填充优惠券数据（属于顾客）
    const completedCoupons = coupons.map(item => ({
      ...item, userId: couponUser._id
    }))
    await Coupon.create(completedCoupons)
    console.log('Seed Coupons Data Success!')

    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

seedData()

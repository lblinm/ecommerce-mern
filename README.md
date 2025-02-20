
## 功能

1. 顾客
   1. 顾客的 注册，登录，注销
   2. 展示产品列表
   3. 用户购买流程（浏览/查询 -> 添加至购物车 -> 付款 -> 确认发货）
   4. 可以查看订单状态和历史
2. 管理员
   1. 商品目录的 管理（包括最基本的添加，删除，修改等操作）
   2. 订单管理、以及销售统计报表
   3. 客户管理、以及客户的购买日志记录(历史订单)

## 相关技术

- 前端：react
  - css 框架：tailwind css
  - 状态管理：zustand
  - 构建：vite
- 后端：express
  - ORM: mongoose、ioredis
  - 身份验证：access token + fresh token
  - 图片上传：cloudinary
- 数据库
  - 常规数据：MongoDB
  - 精品商品、身份认证: Redis
- 部署
  - 容器化：docker
  - web 服务器：nginx

## 文件说明

```r
ecommerce-mern
├── Dockerfile                          # Docker构建文件，定义容器化配置
├── README.md                           # 项目简介
├── backend                             # 后端代码目录
│   ├── controllers                     # 处理具体业务逻辑
│   │   ├── analytics.controller.js     # 后台数据业务逻辑
│   │   ├── auth.controller.js          # 用户认证与授权
│   │   ├── cart.controller.js          # 购物车相关业务逻辑
│   │   ├── coupon.controller.js        # 优惠券相关业务逻辑
│   │   ├── order.controller.js         # 订单相关业务逻辑
│   │   ├── payment.controller.js       # 支付相关业务逻辑
│   │   └── product.controller.js       # 产品相关业务逻辑
│   ├── lib                             # 封装工具和服务
│   │   ├── cloudinary.js               # 云存储服务（Cloudinary）配置
│   │   ├── db.js                       # 数据库连接管理
│   │   ├── mongo-seed.js               # MongoDB 数据填充脚本
│   │   ├── redis.js                    # Redis 配置与连接管理
│   │   └── seed.js                     # 数据库种子数据初始化脚本
│   ├── middleware                      # 中间件，处理请求拦截和逻辑
│   │   └── auth.middleware.js          # 用户认证中间件
│   ├── models                          # 数据模型定义，基于 Mongoose
│   │   ├── coupon.model.js             # 优惠券数据模型
│   │   ├── order.model.js              # 订单数据模型
│   │   ├── product.model.js            # 产品数据模型
│   │   └── user.model.js               # 用户数据模型
│   ├── routes                          # 路由定义，分模块定义接口
│   │   ├── analytics.route.js          # 分析相关接口路由
│   │   ├── auth.route.js               # 用户认证路由
│   │   ├── cart.route.js               # 购物车相关接口路由
│   │   ├── coupon.route.js             # 优惠券接口路由
│   │   ├── order.route.js              # 订单接口路由
│   │   ├── payment.route.js            # 支付接口路由
│   │   └── product.route.js            # 产品接口路由
│   └── server.js                       # 服务器入口文件
├── docker-compose.yml                  # Docker Compose 配置文件，定义服务编排
├── frontend                            # 前端代码目录
│   ├── README.md                       # 前端部分的项目说明文件
│   ├── eslint.config.js                # ESLint 配置文件，用于代码规范检查
│   ├── index.html                      # 前端单页面 HTML 模板
│   ├── package-lock.json               # npm 锁文件，记录依赖的具体版本
│   ├── package.json                    # npm 配置文件，记录依赖及脚本
│   ├── postcss.config.js               # PostCSS 配置文件
│   ├── public                          # 静态资源目录
│   │   └── ...                         # 商品类别图片
│   ├── src                             # 前端核心代码目录
│   │   ├── App.jsx                     # 应用的主入口组件
│   │   ├── components                  # 组件目录，封装功能模块
│   │   │   ├── AnalyticsTab.jsx        # 分析页标签组件
│   │   │   ├── CartItem.jsx            # 购物车条目组件
│   │   │   ├── CategoryItem.jsx        # 分类条目组件
│   │   │   ├── CreateProductForm.jsx   # 产品创建表单组件
│   │   │   ├── FeaturedProducts.jsx    # 推荐产品组件
│   │   │   ├── GiftCouponCard.jsx      # 优惠券卡片组件
│   │   │   ├── LoadingSpinner.jsx      # 加载动画组件
│   │   │   ├── Navbar.jsx              # 导航栏组件
│   │   │   ├── OrderSummary.jsx        # 订单总结组件
│   │   │   ├── OrdersManage.jsx        # 订单管理组件
│   │   │   ├── PeopleAlsoBought.jsx    # 推荐产品组件
│   │   │   ├── ProductCard.jsx         # 产品卡片组件
│   │   │   ├── ProductsList.jsx        # 产品列表组件
│   │   │   ├── SearchInput.jsx         # 搜索输入组件
│   │   │   └── UsersManage.jsx         # 用户管理组件
│   │   ├── index.css                   # 全局样式文件
│   │   ├── lib                         # 工具库目录
│   │   │   ├── axios.js                # Axios 配置文件，用于 API 请求
│   │   │   └── constants.js            # 常量定义文件
│   │   ├── main.jsx                    # 应用入口文件，挂载根组件
│   │   ├── pages                       # 页面组件目录
│   │   │   ├── AdminPage.jsx           # 管理员页面
│   │   │   ├── CartPage.jsx            # 购物车页面
│   │   │   ├── CategoryPage.jsx        # 分类页面
│   │   │   ├── HomePage.jsx            # 首页
│   │   │   ├── LoginPage.jsx           # 登录页面
│   │   │   ├── OrdersHistoryPage.jsx   # 订单历史页面
│   │   │   ├── PaymentPage.jsx         # 支付页面
│   │   │   ├── PurchaseCancelPage.jsx  # 购买取消页面
│   │   │   ├── PurchaseSuccessPage.jsx # 购买成功页面
│   │   │   ├── SearchResultPage.jsx    # 搜索结果页面
│   │   │   └── SignUpPage.jsx          # 注册页面
│   │   └── stores                      # 全局状态管理（使用 Zustand）
│   │       ├── useCartStore.js         # 购物车状态管理
│   │       ├── useProductStore.js      # 产品状态管理
│   │       └── useUserStore.js         # 用户状态管理
│   ├── tailwind.config.js              # TailwindCSS 配置文件
│   └── vite.config.js                  # Vite 项目配置文件
├── nginx.conf                          # Nginx 配置文件
├── package-lock.json                   # 后端 npm 锁文件
└── package.json                        # 后端 npm 配置文件
```

## 本地运行

### 1. 配置数据库

安装 mongodb 和 redis

项目根目录下创建`.env`文件

### 2. 配置环境变量

```bash
PORT=5000

MONGO_URI=mongodb://name:pwd@net:port/dbname?authSource=admin
REDIS_URI=redis://:pwd@net:port/0

ADMIN_PASSWORD=

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

STRIPE_SECRET_KEY=

CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 3. 安装与运行

```shell
npm i

npm run dev
```

## 部署

### 1. 安装 docker、git

```bash
sudo apt update
sudo apt-get install  curl

# 安装 docker
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER # 为普通用户启用 docker 权限
sudo systemctl enable docker
sudo systemctl start docker
docker info

# 安装 docker compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-
# 或 本地在github上下载上传到服务器
# powershell 中: scp local_docker_compose_path username@ip:/home/ubuntu
# sudo mv /home/username/docker-compose-linux-x86_64 /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

# 安装 git
sudo apt install git
```

### 2. 配置 docker、git

```bash
# git user email
git config --global user.name "name"
git config --global user.email "name@example.com"

# 配置 ssh 密钥
ssh-keygen -t rsa -C "name@example.com"
# Enter file in which to save the key (/home/ubuntu/.ssh/id_rsa):
# Enter passphrase (empty for no passphrase):
# Enter same passphrase again:

# 公钥添加到 github
cat ~/.ssh/id_rsa.pub
# 验证
ssh -T git@github.com


# 使用腾讯云 Docker 镜像源
sudo vim /etc/docker/daemon.json
# {
#    "registry-mirrors": [
#    "https://mirror.ccs.tencentyun.com"
#   ]
# }
sudo systemctl restart docker
```

### 3. 构建项目

```bash
mkdir mern-project && cd mern-project
git clone git@github.com:lblinm/ecommerce-mern.git
cd ecommerce-mern

# 创建 env 文件, 改MONGO_URI REDIS_URI NODE_ENV
touch .env
nano .env
# ... ctrl+x y
# shell: scp env_path username@ip:/home/ubuntu/mern-project/ecommerce-mern

cd ecommerce-mern
docker-compose up -d
```

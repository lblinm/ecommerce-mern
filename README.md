<h1 align="center">ECommerce 电商网站</h1>

## 技术栈

- 前端：react
- 后端：express
- 数据库：MongoDB + Redis

## 功能

- 顾客
  - 用户注册、登录、登出
  - 展示商品列表
  - 用户购买流程：浏览 -> 添加到购物车 -> 付款
- 销售管理
  - 商品目录的 管理（包括最基本的添加，删除，修改等操作）
  - 订单管理、以及销售统计报表

## 配置环境变量

```bash
PORT=5000
MONGO_URI=your_mongo_uri

UPSTASH_REDIS_URL=your_redis_url

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 配置数据库

使用 docker 安装 mongodb 和 redis

```shell
docker-compose up -d
```

### 安装与运行

```shell
# 安装项目依赖包
npm i

# 启动服务
npm run dev
```

<h1 align="center">ECommerce 电商网站</h1>

- 前端：react
  - 状态管理：zustand
  - i18n: i18next
- 后端：express
  - 身份验证：access token + fresh token
  - 支付：stripe
  - 图片上传：cloudinary
- 数据库：MongoDB + Redis

## 功能

- 顾客
  - 用户注册、登录、登出
  - 展示商品列表
  - 用户购买流程：浏览/搜索 -> 添加到购物车 -> 付款
- 销售管理
  - 商品目录的 管理（包括最基本的添加，删除，修改等操作）
  - 订单管理、以及销售统计报表

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

### 1. 安装

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

### 2. 配置

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

### 3. 运行

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

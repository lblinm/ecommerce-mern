# 安装 Node 精简版
FROM node:18.17.0-alpine

# 防止中文打印信息显示乱码
ENV LANG="C.UTF-8"

# 拷贝项目文件到容器内的 app/server 目录下
WORKDIR /app/server
COPY package.json /app/server
COPY package-lock.json /app/server
COPY backend/ /app/server/backend
COPY frontend/ /app/server/frontend
COPY .env /app/server

# 设置 npm 镜像源
RUN npm config set registry https://mirrors.cloud.tencent.com/npm/

RUN npm run build

# 对外暴露5000端口
EXPOSE 5000

# 安装 pm2 用来做服务器的进程守护
RUN npm install -g pm2

# seed data  big运行 pm2 启动打包之后的项目, pm2在容器中运行需要用 pm2-runtime 命令
CMD node backend/lib/seed.js && pm2-runtime backend/server.js
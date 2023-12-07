# 使用 debian:bullseye 作为构建阶段的基础镜像
FROM debian:bullseye as builder

ARG NODE_VERSION=16.14.2
ARG YARN_VERSION=1.22.18

# 安装 curl 并清理缓存以减小镜像大小
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# 安装 Volta
RUN curl https://get.volta.sh | bash
ENV VOLTA_HOME /root/.volta
ENV PATH /root/.volta/bin:$PATH

# 安装 Node.js 和 Yarn
RUN volta install node@${NODE_VERSION} yarn@${YARN_VERSION}

WORKDIR /app

# 设置 NODE_ENV 环境变量
ENV NODE_ENV production

# 首先复制 package.json 和 yarn.lock 文件并运行 yarn install。
# 这样，只有这两个文件发生变化时才会运行此步骤，从而提高缓存利用率。
COPY package.json yarn.lock ./
RUN yarn install 

# 现在复制剩余的文件并构建应用
COPY . .
RUN yarn run build
# RUN bash scripts/replace-cdn.sh

# 使用 debian:bullseye 作为生产阶段的基础镜像
FROM debian:bullseye

LABEL fly_launch_runtime="nodejs"

# 从构建阶段复制 Volta 和应用文件
COPY --from=builder /root/.volta /root/.volta
COPY --from=builder /app /app

WORKDIR /app
ENV NODE_ENV production
ENV PATH /root/.volta/bin:$PATH

CMD [ "yarn", "run", "serve" ]
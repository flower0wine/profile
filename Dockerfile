# 构建阶段
FROM node:18 AS builder
WORKDIR /app

COPY next.config.js ./
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile

# 然后复制其他源代码
COPY . .

# 构建应用
RUN pnpm build

# 生产阶段
FROM node:18 AS runner
WORKDIR /app

# 设置环境变量
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# 只复制生产环境需要的文件
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# 安装生产依赖
RUN npm install -g pnpm && \
    pnpm install --prod --frozen-lockfile

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "start"]

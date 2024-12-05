import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import path from "path"

import authRoutes from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import couponRoutes from "./routes/coupon.route.js"
import paymentRoutes from "./routes/payment.route.js"
import analyticsRoutes from "./routes/analytics.route.js"
import ordersRoutes from "./routes/order.route.js"

import { connectDB } from "./lib/db.js"

dotenv.config()  // 加载环境变量

const app = express()
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

// 解析请求中的 JSON 数据，并限制请求体大小为 10MB
app.use(express.json({ limit: "50mb" }))

// 解析请求中的 Cookie
app.use(cookieParser())

// 注册各功能模块的路由
app.use("/api/auth", authRoutes)  // 身份认证路由
app.use("/api/products", productRoutes)  // 商品管理路由
app.use("/api/cart", cartRoutes)  // 购物车路由
app.use("/api/coupons", couponRoutes)  // 优惠券路由
app.use("/api/payments", paymentRoutes)  // 支付路由
app.use("/api/analytics", analyticsRoutes)  // 后台数据路由
app.use("/api/orders", ordersRoutes)  // 订单管理路由

// 如果运行环境是生产环境，启用静态文件服务
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "backend", "dist")))

	// 处理 SPA 路由，返回前端的 index.html 文件
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "backend", "dist", "index.html"))
	})
}

app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT)
	connectDB()  // 连接数据库
})

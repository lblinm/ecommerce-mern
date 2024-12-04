import express from "express"
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js"
import { getAllOrders, getOrdersByUser, updateOrderStatus } from "../controllers/order.controller.js"

const router = express.Router()

router.get("/get-orders-by-user/:id", protectRoute, getOrdersByUser)
router.get("/get-all-orders", protectRoute, adminRoute, getAllOrders)
router.put("/update-order-status/:id", protectRoute, updateOrderStatus)
export default router

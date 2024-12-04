import Order from "../models/order.model.js"

export const getOrdersByUser = async (req, res) => {
  try {
    const ordersInfo = await Order.find({ user: req.params.id })
      .select('products totalAmount payment_status createdAt')
      .populate('products.product', 'name')
      .sort({ createdAt: -1 })
      .lean()
    res.status(200).json(ordersInfo)
  } catch (error) {
    console.error("获取个人订单出错", error)
    res.status(500).json({ message: "获取个人订单出错", error: error.message })
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const ordersInfo = await Order.find()
      .populate('user', 'name')
      .populate('products.product', 'name')
      .sort({ createdAt: -1 })
      .lean()
    res.status(200).json(ordersInfo)
  } catch (error) {
    console.error('获取所有订单出错')
    res.status(500).json({ message: "获取所有订单出错", error: error.message })
  }
}

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findById(req.params.id)

    order.payment_status = status
    const updatedOrder = await order.save()
    res.status(200).json({
      message: "更新订单状态成功",
      status: updatedOrder.payment_status
    })
  } catch (error) {
    console.error("更新订单状态出错: ", error.message)
    res.status(500).json({ message: "更新订单状态失败", error: error.message })
  }
}
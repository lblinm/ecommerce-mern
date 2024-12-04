import Coupon from "../models/coupon.model.js"
import Order from "../models/order.model.js"

export const createCheckoutSession = async (req, res) => {
	try {
		const { cart, couponCode } = req.body

		if (!Array.isArray(cart) || cart.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" })
		}

		const tmpOrder = {
			user: req.user._id,
			products: cart.map((product) => ({
				product: product._id,
				quantity: product.quantity,
				price: product.price,
			})),
			payment_status: 'pending'
		}

		let totalAmount = cart.reduce((all, product) => {
			return all + product.price * product.quantity
		}, 0)

		let coupon = null
		if (couponCode) {
			coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true })
			if (coupon) {
				totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100)
				tmpOrder.coupon = coupon._id
			}
		}

		tmpOrder.totalAmount = totalAmount
		const newOrder = new Order(tmpOrder)
		await newOrder.save()

		if (totalAmount >= 500) {
			await createNewCoupon(req.user._id)
		}
		res.status(200).json({ orderId: newOrder._id, coupon: coupon?._id })
	} catch (error) {
		console.error("Error processing checkout:", error)
		res.status(500).json({ message: "创建订单失败", error: error.message })
	}
}

export const checkoutSuccess = async (req, res) => {
	try {
		const { orderId, couponId } = req.body
		if (couponId) {
			await Coupon.findByIdAndUpdate(
				couponId,
				{
					isActive: false,
				}
			)
		}

		await Order.findByIdAndUpdate(
			orderId,
			{ payment_status: 'processing' },
			{ new: true }
		)

		res.status(200).json({
			success: true,
			message: "Payment successful, order created, and coupon deactivated if used.",
			orderId: orderId,
		})
	} catch (error) {
		console.error("Error processing successful checkout:", error)
		res.status(500).json({ message: "处理已支付订单失败", error: error.message })
	}
}


async function createNewCoupon (userId) {
	await Coupon.findOneAndDelete({ userId })

	const newCoupon = new Coupon({
		code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
		discountPercentage: 10,
		expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
		userId: userId,
	})

	await newCoupon.save()

	return newCoupon
}

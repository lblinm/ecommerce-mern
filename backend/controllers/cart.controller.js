import Product from "../models/product.model.js"
import User from "../models/user.model.js"

export const getCartProducts = async (req, res) => {
	try {
		const products = await Product.find({ _id: { $in: req.user.cartItems } })

		// add quantity for each product
		const cartItems = products.map((product) => {
			const item = req.user.cartItems.find((cartItem) => cartItem.id === product.id)
			return { ...product.toJSON(), quantity: item.quantity }
		})

		res.json(cartItems)
	} catch (error) {
		console.log("Error in getCartProducts controller", error.message)
		res.status(500).json({ message: "获取购物车物品失败", error: error.message })
	}
}

export const addToCart = async (req, res) => {
	try {
		const { productId } = req.body
		const user = req.user

		const existingItem = user.cartItems.find((item) => item.id === productId)
		if (existingItem) {
			existingItem.quantity += 1
		} else {
			user.cartItems.push(productId)
		}

		await user.save()
		res.json(user.cartItems)
	} catch (error) {
		console.log("Error in addToCart controller", error.message)
		res.status(500).json({ message: "添加到购物车失败", error: error.message })
	}
}

export const removeAllFromCart = async (req, res) => {
	try {
		const { productId } = req.body
		const user = req.user
		if (!productId) {
			user.cartItems = []
		} else {
			user.cartItems = user.cartItems.filter((item) => item._id !== productId)
		}
		// await user.save();
		await User.findByIdAndUpdate(user._id, { cartItems: user.cartItems })
		res.json(user.cartItems)
	} catch (error) {
		res.status(500).json({ message: "移除购物车物品失败", error: error.message })
	}
}

export const updateQuantity = async (req, res) => {
	try {
		const { id: productId } = req.params
		const { quantity } = req.body
		const user = req.user
		const existingItem = user.cartItems.find((item) => item.id === productId)

		if (existingItem) {
			if (quantity === 0) {
				user.cartItems = user.cartItems.filter((item) => item.id !== productId)
				await user.save()
				return res.json(user.cartItems)
			}

			existingItem.quantity = quantity
			await user.save()
			res.json(user.cartItems)
		} else {
			res.status(404).json({ message: "Product not found" })
		}
	} catch (error) {
		console.log("Error in updateQuantity controller", error.message)
		res.status(500).json({ message: "更新购物车物品数量失败", error: error.message })
	}
}

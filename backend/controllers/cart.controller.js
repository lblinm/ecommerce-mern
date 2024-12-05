import Product from "../models/product.model.js"
import User from "../models/user.model.js"

// 获取购物车中的商品
export const getCartProducts = async (req, res) => {
	try {
		// 根据用户的 cartItems 字段中的商品 ID 列表查询购物车中包含的商品
		const products = await Product.find({ _id: { $in: req.user.cartItems } })

		// 为每个商品添加其对应的数量信息
		const cartItems = products.map((product) => {
			const item = req.user.cartItems.find((cartItem) => cartItem.id === product.id)
			// 返回商品信息以及数量
			return { ...product.toJSON(), quantity: item.quantity }
		})

		res.json(cartItems)
	} catch (error) {
		console.log("Error in getCartProducts controller", error.message)
		res.status(500).json({ message: "获取购物车物品失败", error: error.message })
	}
}

// 添加商品到购物车
export const addToCart = async (req, res) => {
	try {
		const { productId } = req.body
		const user = req.user

		// 检查购物车中是否已存在该商品
		const existingItem = user.cartItems.find((item) => item.id === productId)
		if (existingItem) {
			// 如果商品已存在，则增加其数量
			existingItem.quantity += 1
		} else {
			// 如果商品不存在，则添加到购物车并设置初始数量为 1
			user.cartItems.push(productId)
		}

		await user.save()  // 保存用户的购物车数据
		res.json(user.cartItems)  // 返回更新后的购物车列表
	} catch (error) {
		console.log("Error in addToCart controller", error.message)
		res.status(500).json({ message: "添加到购物车失败", error: error.message })
	}
}

// 从购物车中移除商品
export const removeAllFromCart = async (req, res) => {
	try {
		const { productId } = req.body
		const user = req.user
		if (!productId) {
			// 如果没有提供商品 ID，则清空购物车
			user.cartItems = []
		} else {
			// 否则移除指定商品
			user.cartItems = user.cartItems.filter((item) => item._id !== productId)
		}
		// await user.save();
		await User.findByIdAndUpdate(user._id, { cartItems: user.cartItems })
		res.json(user.cartItems)
	} catch (error) {
		res.status(500).json({ message: "移除购物车物品失败", error: error.message })
	}
}

// 更新购物车中某个商品的数量
export const updateQuantity = async (req, res) => {
	try {
		const { id: productId } = req.params
		const { quantity } = req.body
		const user = req.user
		const existingItem = user.cartItems.find((item) => item.id === productId)

		// 查找购物车中是否存在该商品
		if (existingItem) {
			if (quantity === 0) {
				// 如果数量为 0，则从购物车中移除该商品
				user.cartItems = user.cartItems.filter((item) => item.id !== productId)
				await user.save()
				return res.json(user.cartItems)
			}

			// 如果数量不为 0，则更新商品数量
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

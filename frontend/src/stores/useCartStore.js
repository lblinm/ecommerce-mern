import { create } from "zustand"
import axios from "../lib/axios"
import { toast } from "react-hot-toast"
export const useCartStore = create((set, get) => ({
	cart: [],
	coupon: null,
	total: 0,
	subtotal: 0,
	isCouponApplied: false,

	getMyCoupon: async () => {
		try {
			const response = await axios.get("/coupons")
			set({ coupon: response.data })
		} catch (error) {
			console.error("操作失败", error)
		}
	},
	applyCoupon: async (code) => {
		try {
			const response = await axios.post("/coupons/validate", { code })
			set({ coupon: response.data, isCouponApplied: true })
			get().calculateTotals()
			toast.success('优惠券使用成功')
		} catch (error) {
			toast.error(error.response?.data?.message || '操作失败')
		}
	},
	removeCoupon: () => {
		set({ coupon: null, isCouponApplied: false })
		get().calculateTotals()
		toast.success('已取消使用该优惠券')
	},

	getCartItems: async () => {
		try {
			const res = await axios.get("/cart")
			set({ cart: res.data })
			get().calculateTotals()
		} catch (error) {
			set({ cart: [] })
			toast.error(error.response.data.message || '操作失败')
		}
	},
	clearCart: async () => {
		try {
			await axios.delete('/cart')
			set({ cart: [], coupon: null, total: 0, subtotal: 0 })
		} catch (error) {
			toast.error(error.response.data.message || "清空购物车失败")
		}
	},
	addToCart: async (product) => {
		try {
			await axios.post("/cart", { productId: product._id })
			toast.success("已添加到购物车")

			set((prevState) => {
				const existingItem = prevState.cart.find((item) => item._id === product._id)
				const newCart = existingItem
					? prevState.cart.map((item) =>
						item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
					)
					: [...prevState.cart, { ...product, quantity: 1 }]
				return { cart: newCart }
			})
			get().calculateTotals()
		} catch (error) {
			toast.error(error.response.data.message || "添加到购物车失败")
		}
	},
	removeFromCart: async (productId) => {
		await axios.delete(`/cart`, { data: { productId } })
		set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }))
		get().calculateTotals()
	},
	updateQuantity: async (productId, quantity) => {
		if (quantity === 0) {
			get().removeFromCart(productId)
			return
		}

		await axios.put(`/cart/${productId}`, { quantity })
		set((prevState) => ({
			cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
		}))
		get().calculateTotals()
	},
	calculateTotals: () => {
		const { cart, coupon } = get()
		const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
		let total = subtotal

		if (coupon) {
			const discount = subtotal * (coupon.discountPercentage / 100)
			total = subtotal - discount
		}

		set({ subtotal, total })
	},
}))

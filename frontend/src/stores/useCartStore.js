import { create } from "zustand"
import axios from "../lib/axios"
import { toast } from "react-hot-toast"
import { t } from 'i18next'
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
			console.error(t('error_fetching_coupon'), error)
		}
	},
	applyCoupon: async (code) => {
		try {
			const response = await axios.post("/coupons/validate", { code })
			set({ coupon: response.data, isCouponApplied: true })
			get().calculateTotals()
			toast.success(t('coupon_success'))
		} catch (error) {
			toast.error(error.response?.data?.message || t('coupon_failed'))
		}
	},
	removeCoupon: () => {
		set({ coupon: null, isCouponApplied: false })
		get().calculateTotals()
		toast.success(t('coupon_removed'))
	},

	getCartItems: async () => {
		try {
			const res = await axios.get("/cart")
			set({ cart: res.data })
			get().calculateTotals()
		} catch (error) {
			set({ cart: [] })
			toast.error(error.response.data.message || t('an_error_occurred'))
		}
	},
	clearCart: async () => {
		set({ cart: [], coupon: null, total: 0, subtotal: 0 })
	},
	addToCart: async (product) => {
		try {
			await axios.post("/cart", { productId: product._id })
			toast.success(t('add_to_cart'))

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
			toast.error(error.response.data.message || t('an_error_occurred'))
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

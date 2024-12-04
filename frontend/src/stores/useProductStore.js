import { create } from "zustand"
import toast from "react-hot-toast"
import axios from "../lib/axios"

export const useProductStore = create((set) => ({
	products: [],
	loading: false,

	setProducts: (products) => set({ products }),
	createProduct: async (productData) => {
		set({ loading: true })
		try {
			const res = await axios.post("/products", productData)
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}))
		} catch (error) {
			toast.error(error.response.data.error)
			set({ loading: false })
		}
	},
	fetchAllProducts: async () => {
		set({ loading: true })
		try {
			const response = await axios.get("/products")
			set({ products: response.data.products, loading: false })
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false })
			toast.error(error.response.data.error || "Failed to fetch products")
		}
	},
	fetchProductsByCategory: async (category) => {
		set({ loading: true })
		try {
			const response = await axios.get(`/products/category/${category}`)
			set({ products: response.data.products, loading: false })
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false })
			toast.error(error.response.data.error || "Failed to fetch products")
		}
	},
	// 搜索
	fetchProductsByKeyword: async (keyword) => {
		set({ loading: true })
		try {
			const response = await axios.get(`/products/search?keyword=${keyword}`)
			set({ products: response.data.products, loading: false })
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false })
			toast.error(error.response?.data?.error || "Failed to fetch products")
		}
	},
	// 更新
	updateProduct: async (updatedProduct) => {
		set({ loading: true })
		try {
			const res = await axios.put(`/products/${updatedProduct._id}`, updatedProduct)
			const newProduct = res.data.product
			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === newProduct._id ? newProduct : product
				),
				loading: false,
			}))
			toast.success("更新商品信息成功！")
		} catch (error) {
			set({ loading: false })
			toast.error(error.response.data.error || "更新商品信息失败")
		}
	},

	deleteProduct: async (productId) => {
		set({ loading: true })
		try {
			const toastId = toast.loading("正在删除该商品，请稍等")
			await axios.delete(`/products/${productId}`)
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}))
			toast.dismiss(toastId)
			toast.success("商品删除成功！")
		} catch (error) {
			set({ loading: false })
			toast.error(error.response.data.error || "商品删除失败")
		}
	},
	toggleFeaturedProduct: async (productId) => {
		set({ loading: true })
		try {
			const response = await axios.patch(`/products/${productId}`)
			// this will update the isFeatured prop of the product
			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				),
				loading: false,
			}))
		} catch (error) {
			set({ loading: false })
			toast.error(error.response.data.error || "Failed to update product")
		}
	},
	fetchFeaturedProducts: async () => {
		set({ loading: true })
		try {
			const response = await axios.get("/products/featured")
			set({ products: response.data, loading: false })
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false })
			console.log("Error fetching featured products:", error)
		}
	},
}))

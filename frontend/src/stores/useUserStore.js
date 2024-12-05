import { create } from "zustand"
import axios from "../lib/axios"
import { toast } from "react-hot-toast"

export const useUserStore = create((set, get) => ({
	user: null,
	loading: false,
	checkingAuth: true,
	// 用户注册
	signup: async ({ name, email, password, confirmPassword }) => {
		set({ loading: true })
		// 判断两次密码输入是否一致
		if (password !== confirmPassword) {
			set({ loading: false })
			return toast.error("两次输入的密码不同")
		}

		try {
			const res = await axios.post("/auth/signup", { name, email, password })
			set({ user: res.data, loading: false })
			toast.success('注册成功')
		} catch (error) {
			set({ loading: false })
			toast.error(error.response.data.message || "账户注册失败")
		}
	},
	// 用户登录
	login: async (email, password) => {
		set({ loading: true })

		try {
			const res = await axios.post("/auth/login", { email, password })

			set({ user: res.data, loading: false })
			toast.success('登录成功')
		} catch (error) {
			set({ loading: false })
			toast.error(error.response.data.message || "账户登录失败")
		}
	},
	// 用户登出
	logout: async () => {
		try {
			await axios.post("/auth/logout")
			set({ user: null })
			toast.success('登出成功')
		} catch (error) {
			toast.error(error.response?.data?.message || "账户登出失败")
		}
	},
	// 获取用户资料
	checkAuth: async () => {
		set({ checkingAuth: true })
		try {
			const response = await axios.get("/auth/profile")
			set({ user: response.data, checkingAuth: false })
		} catch (error) {
			console.log(error.message)
			set({ checkingAuth: false, user: null })
		}
	},
	// 获取用户 refreshToken
	refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return

		set({ checkingAuth: true })
		try {
			const response = await axios.post("/auth/refresh-token")
			set({ checkingAuth: false })
			return response.data
		} catch (error) {
			set({ user: null, checkingAuth: false })
			throw error
		}
	},
}))


// Axios拦截器，用于处理Token刷新
let refreshPromise = null  // 用于保存刷新Token的Promise，以避免重复刷新

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			try {
				// 如果刷新Token的操作已经在进行中，等待完成
				if (refreshPromise) {
					await refreshPromise
					return axios(originalRequest)
				}

				// 开始新的Token刷新操作
				refreshPromise = useUserStore.getState().refreshToken()
				await refreshPromise
				refreshPromise = null

				return axios(originalRequest)
			} catch (refreshError) {
				// 如果刷新Token失败，执行登出操作或其他错误处理
				useUserStore.getState().logout()
				return Promise.reject(refreshError)
			}
		}
		return Promise.reject(error)
	}
)

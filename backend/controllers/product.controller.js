import { redis } from "../lib/redis.js"
import cloudinary from "../lib/cloudinary.js"
import Product from "../models/product.model.js"

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({}) // find all products
		res.json({ products })
	} catch (error) {
		console.log("Error in getAllProducts controller", error.message)
		res.status(500).json({ message: "获取所有商品失败", error: error.message })
	}
}

export const getFeaturedProducts = async (req, res) => {
	try {
		let featuredProducts = await redis.get("featured_products")
		if (featuredProducts) {
			return res.json(JSON.parse(featuredProducts))
		}

		// if not in redis, fetch from mongodb
		// .lean() is gonna return a plain javascript object instead of a mongodb document
		// which is good for performance
		featuredProducts = await Product.find({ isFeatured: true }).lean()

		if (!featuredProducts) {
			return res.status(404).json({ message: "未找到特色商品" })
		}

		// store in redis for future quick access

		await redis.set("featured_products", JSON.stringify(featuredProducts))

		res.json(featuredProducts)
	} catch (error) {
		console.log("Error in getFeaturedProducts controller", error.message)
		res.status(500).json({ message: "获取特色商品失败", error: error.message })
	}
}

export const createProduct = async (req, res) => {
	try {
		const { name, description, price, image, category } = req.body

		let cloudinaryResponse = null

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" })
		}

		const product = await Product.create({
			name,
			description,
			price,
			image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
			category,
		})

		res.status(201).json(product)
	} catch (error) {
		console.log("Error in createProduct controller", error.message)
		res.status(500).json({ message: "创建商品失败", error: error.message })
	}
}

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)

		if (!product) {
			return res.status(404).json({ message: "Product not found" })
		}

		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0]
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`)
				console.log("deleted image from cloduinary")
			} catch (error) {
				console.log("error deleting image from cloduinary", error)
			}
		}

		await Product.findByIdAndDelete(req.params.id)

		res.json({ message: "Product deleted successfully" })
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message)
		res.status(500).json({ message: "删除商品失败", error: error.message })
	}
}

export const updateProduct = async (req, res) => {
	try {
		const { name, description, price, category, image } = req.body

		const product = await Product.findById(req.params.id)
		if (!product) {
			return res.status(404).json({ message: "Product not found" })
		}
		product.name = name || product.name
		product.description = description || product.description
		product.price = price || product.price
		product.category = category || product.category

		if (image && image !== product.image) {
			const publicId = product.image.split("/").pop().split(".")[0]
			try {
				// 删除
				await cloudinary.uploader.destroy(`products/${publicId}`)
				// 上传
				const cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" })
				product.image = cloudinaryResponse.secure_url
				console.log("updating image from cloduinary")
			} catch (error) {
				console.log("error updating image from cloduinary", error)
			}
		}

		const newProduct = await product.save()

		res.status(200).json({ message: "商品更新成功", product: newProduct })
	} catch (error) {
		console.log("更新商品出错", error.message)
		res.status(500).json({ message: "商品更新失败", error: error.message })
	}
}

export const getRecommendedProducts = async (req, res) => {
	try {
		const products = await Product.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					name: 1,
					description: 1,
					image: 1,
					price: 1,
				},
			},
		])

		res.json(products)
	} catch (error) {
		console.log("Error in getRecommendedProducts controller", error.message)
		res.status(500).json({ message: "获取推荐商品失败", error: error.message })
	}
}

export const getProductsByCategory = async (req, res) => {
	const { category } = req.params
	try {
		const products = await Product.find({ category })
		res.json({ products })
	} catch (error) {
		console.log("Error in getProductsByCategory controller", error.message)
		res.status(500).json({ message: "获取该类别商品失败", error: error.message })
	}
}

export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		if (product) {
			product.isFeatured = !product.isFeatured
			const updatedProduct = await product.save()
			await updateFeaturedProductsCache()
			res.json(updatedProduct)
		} else {
			res.status(404).json({ message: "该商品不存在" })
		}
	} catch (error) {
		console.log("Error in toggleFeaturedProduct controller", error.message)
		res.status(500).json({ message: "调整商品是否为特色商品失败", error: error.message })
	}
}

export const searchProducts = async (req, res) => {
	try {
		const { keyword } = req.query

		let query = {}
		if (keyword) {
			query = {
				$or: [
					{ name: { $regex: keyword, $options: "i" } },
					{ description: { $regex: keyword, $options: "i" } }
				]
			}
		}

		const products = await Product.find(query)

		res.json({ products })
	} catch (error) {
		console.log("Error in searchProducts controller", error.message)
		res.status(500).json({ message: "搜索商品失败", error: error.message })
	}
}


async function updateFeaturedProductsCache () {
	try {
		// The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

		const featuredProducts = await Product.find({ isFeatured: true }).lean()
		await redis.set("featured_products", JSON.stringify(featuredProducts))
	} catch (error) {
		console.log("error in update cache function")
	}
}

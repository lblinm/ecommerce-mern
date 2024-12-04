import { motion } from 'framer-motion'
import { Trash, Star, Pencil } from 'lucide-react'
import { useProductStore } from '../stores/useProductStore'
import { categories } from '../lib/constants'
import { useState } from 'react'
import { Check, Upload, Loader } from 'lucide-react'
import { Tooltip } from 'react-tooltip'

const ProductsList = () => {
  const {
    updateProduct,
    deleteProduct,
    toggleFeaturedProduct,
    products,
    loading,
  } = useProductStore()
  const [isEditing, setIsEditing] = useState(false)
  const [updatedProduct, setUpdatedProduct] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsEditing(false)
    try {
      await updateProduct(updatedProduct)
      setUpdatedProduct({})
    } catch {
      console.log('更新商品失败')
    }
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setUpdatedProduct({ ...updatedProduct, image: reader.result })
      }

      reader.readAsDataURL(file) // base64
    }
  }
  return (
    <>
      <motion.div
        className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <table className=" min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                名称
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                价格
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                类别
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                是否特色商品
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>

          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {products?.map((product) => (
              <tr key={product._id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    ￥{product.price.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    {categories.find((item) => item.name === product.category)
                      ?.title || '未知类别'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleFeaturedProduct(product._id)}
                    className={`p-1 rounded-full ${
                      product.isFeatured
                        ? 'bg-yellow-400 text-gray-900'
                        : 'bg-gray-600 text-gray-300'
                    } hover:bg-yellow-500 transition-colors duration-200`}>
                    <Star className="h-5 w-5" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setIsEditing(true)
                      setUpdatedProduct(product)
                    }}
                    className="mr-3 text-emerald-500 hover:text-opacity-50"
                    data-tooltip-id={product._id + 'edit'}
                    data-tooltip-content="编辑商品信息"
                    data-tooltip-place="top">
                    <Pencil className="h-5 w-5" />
                    <Tooltip id={product._id + 'edit'} />
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="mr-3 text-red-500 hover:text-opacity-50"
                    data-tooltip-id={product._id + 'delete'}
                    data-tooltip-content="删除该商品"
                    data-tooltip-place="top">
                    <Trash className="h-5 w-5" />
                    <Tooltip id={product._id + 'delete'} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-800 shadow-lg p-8 max-w-xl w-full rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-emerald-300">
              编辑商品
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300">
                  商品名称
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
                  px-3 text-white focus:outline-none focus:ring-2
                  focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300">
                  商品描述
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={updatedProduct.description}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      description: e.target.value,
                    })
                  }
                  rows="3"
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
                  py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 
                  focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-300">
                  价格
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                  step="0.01"
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm 
                  py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500
                  focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-300">
                  类别
                </label>
                <select
                  id="category"
                  name="category"
                  value={updatedProduct.category}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      category: e.target.value,
                    })
                  }
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md
                  shadow-sm py-2 px-3 text-white focus:outline-none 
                  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required>
                  <option value="">其它</option>
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  id="image"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="image"
                  className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                  <Upload className="h-5 w-5 inline-block mr-2" />
                  更新商品图片
                </label>
                {/* {updatedProduct.image && (
                  <span className="ml-3 text-sm text-gray-400">商品图片已更新</span>
                )} */}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false)
                    setUpdatedProduct({})
                  }}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400">
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md 
                  shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
                  disabled={loading}>
                  {loading ? (
                    <>
                      <Loader
                        className="mr-2 h-5 w-5 animate-spin"
                        aria-hidden="true"
                      />
                      加载中，请稍等...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      确定
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
export default ProductsList

import { motion } from 'framer-motion'
import axios from '../lib/axios'
import { useEffect, useState } from 'react'
import { Truck, Trash } from 'lucide-react'
import { order_status } from '../lib/constants'
import { Tooltip } from 'react-tooltip'

const OrdersManage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const transStatus = {
    pending: ['cancelled'],
    processing: ['shipped', 'cancelled'],
  }
  const iconStatus = {
    shipped: { icon: Truck, color: 'text-blue-500', tip: '改为已发货' },
    cancelled: { icon: Trash, color: 'text-red-500', tip: '取消该订单' },
  }
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/orders/get-all-orders')
        console.log(res.data)
        setOrders(res.data)
        setLoading(false)
      } catch (err) {
        console.error('获取所有订单数据出错', err)
        setError('无法加载所有订单数据，请稍后再试。')
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const handleUpdateStatus = async (orderId, status) => {
    try {
      const res = await axios.put(`/orders/update-order-status/${orderId}`, {
        status,
      })
      const updatedStatus = res.data.status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, payment_status: updatedStatus }
            : order
        )
      )
    } catch (error) {
      console.error('更新订单状态出错', error)
      setError('无法更新订单状态，请稍后再试')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-400">加载中，请稍等...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }
  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}>
      <table className=" min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              序号
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              用户名
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              总金额
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              购买商品
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              订单状态
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              下单时间
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>

        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {orders.map((order, idx) => (
            <tr key={order._id} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">{idx + 1}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">{order.user.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  ￥{order.totalAmount.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <ul className="text-sm text-gray-300">
                  {order.products.map((item) => {
                    return item.product ? (
                      <li key={item.product._id}>
                        {item.product.name} × {item.quantity}
                      </li>
                    ) : (
                      <li key={item._id}>已删除商品 × {item.quantity}</li>
                    )
                  })}
                </ul>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div
                  className={`inline-block px-0.5 text-sm font-medium ${
                    order_status[order.payment_status]?.color ||
                    order_status.default.color
                  }`}>
                  {order_status[order.payment_status]?.title ||
                    order_status.default.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {transStatus[order.payment_status]?.map((trans) => {
                  const Icon = iconStatus[trans].icon
                  return (
                    <button
                      key={order._id + trans}
                      onClick={() => handleUpdateStatus(order._id, trans)}
                      className={`mr-3 ${iconStatus[trans].color} hover:text-opacity-50`}
                      data-tooltip-id={trans}
                      data-tooltip-content={iconStatus[trans].tip}
                      data-tooltip-place="top">
                      <Icon className="h-5 w-5" />
                      <Tooltip id={trans} />
                    </button>
                  )
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}
export default OrdersManage

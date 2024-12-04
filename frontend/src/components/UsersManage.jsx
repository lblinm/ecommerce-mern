import { motion } from 'framer-motion'
import axios from '../lib/axios'
import { useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { ShoppingBag, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const UsersManage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const handleUserOrder = (userId) => {
    navigate(`/orders-history/${userId}`)
  }
  const handleDeleteUser = async (userId) => {}
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/auth/get-all-users')
        console.log(res.data)
        setUsers(res.data)
        setLoading(false)
      } catch (err) {
        console.error('获取所有订单数据出错', err)
        setError('无法加载所有订单数据，请稍后再试。')
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

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
        <p className="text-gray-400">{error}</p>
      </div>
    )
  }
  return (
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
              序号
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              名称
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              邮箱
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              注册时间
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>

        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {users.map((user, idx) => (
            <tr key={user._id} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">{idx + 1}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">{user.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {new Date(user.createdAt).toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleUserOrder(user._id)}
                  className={`mr-3 text-green-500 hover:text-opacity-50`}
                  data-tooltip-id="order"
                  data-tooltip-content="查看用户历史订单"
                  data-tooltip-place="top">
                  <ShoppingBag className="h-5 w-5" />
                  <Tooltip id="order" />
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className={`mr-3 text-red-500 hover:text-opacity-50`}
                  data-tooltip-id="delete"
                  data-tooltip-content="删除该用户"
                  data-tooltip-place="top">
                  <Trash className="h-5 w-5" />
                  <Tooltip id="delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}
export default UsersManage

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('') // 支付方式: 'card', 'wechat', 'alipay'
  const [cardPassword, setCardPassword] = useState('') // 银行卡密码
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(window.location.search)
  const orderId = queryParams.get('orderId')
  const couponId = queryParams.get('couponId')

  const handlePayment = (e) => {
    e.preventDefault()
    if (couponId) {
      navigate(`/purchase-success?orderId=${orderId}&couponId=${couponId}`)
    } else {
      navigate(`/purchase-success?orderId=${orderId}`)
    }
  }

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              卡号
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 mb-4 text-sm text-gray-900 bg-gray-50 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />

            <label className="block mb-2 text-sm font-medium text-gray-300">
              密码
            </label>
            <input
              type="password"
              placeholder="输入密码"
              value={cardPassword}
              onChange={(e) => setCardPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        )
      case 'wechat':
      case 'alipay':
        return (
          <div className="flex justify-center items-center">
            {/* 虚假二维码 */}
            <img src="/QRcode.png" alt="QR Code" className="mb-4 w-40" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      className="max-w-md mx-auto mt-10 space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <h2 className="text-2xl font-semibold text-emerald-400">支付</h2>

      <form onSubmit={handlePayment}>
        {/* 支付方式选择 */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            支付方式
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            required>
            <option value="">选择支付方式</option>
            <option value="card">银行卡</option>
            <option value="wechat">微信支付</option>
            <option value="alipay">支付宝支付</option>
          </select>
        </div>

        {/* 动态渲染银行卡表单或二维码 */}
        {renderPaymentForm()}

        <motion.button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium my-10 py-2.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}>
          确定支付
        </motion.button>
      </form>
    </motion.div>
  )
}

export default PaymentPage

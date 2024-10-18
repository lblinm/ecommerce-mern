import { useState } from 'react'
import { motion } from 'framer-motion'

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('') // 支付方式: 'card', 'wechat', 'alipay'
  const [cardPassword, setCardPassword] = useState('') // 银行卡密码
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePayment = (e) => {
    e.preventDefault()

    // 模拟支付成功
    setIsSuccess(true)
  }

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 mb-4 text-sm text-gray-900 bg-gray-50 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />

            <label className="block mb-2 text-sm font-medium text-gray-300">
              Card Password
            </label>
            <input
              type="password"
              placeholder="Enter card password"
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
      <h2 className="text-2xl font-semibold text-emerald-400">
        Choose Payment Method
      </h2>

      <form onSubmit={handlePayment}>
        {/* 支付方式选择 */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            required>
            <option value="">Select Payment Method</option>
            <option value="card">Bank Card</option>
            <option value="wechat">WeChat Pay</option>
            <option value="alipay">Alipay</option>
          </select>
        </div>

        {/* 动态渲染银行卡表单或二维码 */}
        {renderPaymentForm()}

        <motion.button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          Pay Now
        </motion.button>

        {isSuccess && (
          <motion.div
            className="mt-4 text-center text-emerald-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}>
            Payment Successful!
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}

export default PaymentPage

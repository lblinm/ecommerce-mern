import { ArrowRight, CheckCircle, HandHeart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../stores/useCartStore'
import axios from '../lib/axios'
import Confetti from 'react-confetti'
const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] = useState(true)
  const { clearCart } = useCartStore()
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleCheckoutSuccess = async (orderId, couponId) => {
      try {
        await axios.post('/payments/checkout-success', { orderId, couponId })
        clearCart()
      } catch (error) {
        console.log(error)
      } finally {
        setIsProcessing(false)
      }
    }

    const queryParams = new URLSearchParams(window.location.search)
    const orderId = queryParams.get('orderId')
    const couponId = queryParams.get('couponId')

    if (orderId) {
      handleCheckoutSuccess(orderId, couponId)
    } else {
      setIsProcessing(false)
      setError('No correct order ID found in the URL')
    }
  }, [clearCart])

  if (isProcessing) return 'Processing...'

  if (error) return `Error: ${error}`

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />

      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-emerald-400 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2">
            购买成功！
          </h1>

          <p className="text-gray-300 text-center mb-2">正在处理您的订单~</p>
          <p className="text-emerald-400 text-center text-sm mb-6">
            已给您发送订单详情至您的邮箱中，请注意查收
          </p>
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">订单号</span>
              <span className="text-sm font-semibold text-emerald-400">
                #13245
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">预计送达时间为</span>
              <span className="text-sm font-semibold text-emerald-400">
                3-5 天后
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center">
              <HandHeart className="mr-2" size={18} />
              感谢您的信任！
            </button>
            <Link
              to={'/'}
              className="w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center">
              继续购物
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PurchaseSuccessPage

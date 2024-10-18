import { motion } from 'framer-motion'
import { useCartStore } from '../stores/useCartStore'
import { Link } from 'react-router-dom'
import { MoveRight } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import axios from '../lib/axios'
import { useTranslation } from 'react-i18next'
const stripePromise = loadStripe(
  'pk_test_51Q262oRoRPVrlue5x7Hq2fHKOMJVFP3ZdzQOEaZ7A7OHo5NNJCSyyB4QfJmyHhAL1l92fNCRmP6Gi2vj8hH8AnV700d8j37agO'
)

const OrderSummary = () => {
  const { t } = useTranslation()
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore()

  const savings = subtotal - total
  const formattedSubtotal = subtotal.toFixed(2)
  const formattedTotal = total.toFixed(2)
  const formattedSavings = savings.toFixed(2)

  const handlePayment = async () => {
    const stripe = await stripePromise
    const res = await axios.post('/payments/create-checkout-session', {
      products: cart,
      couponCode: coupon ? coupon.code : null,
    })

    const session = res.data
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    })

    if (result.error) {
      console.error('Error:', result.error)
    }
  }

  return (
    <motion.div
      className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <p className="text-xl font-semibold text-emerald-400">
        {t('order_summary')}
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-300">
              {t('original_price')}
            </dt>
            <dd className="text-base font-medium text-white">
              {t('currency_symbol')}
              {formattedSubtotal}
            </dd>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">
                {t('saving')}
              </dt>
              <dd className="text-base font-medium text-emerald-400">
                -{currency_symbol}
                {formattedSavings}
              </dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">
                Coupon ({coupon.code})
              </dt>
              <dd className="text-base font-medium text-emerald-400">
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}
          <dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
            <dt className="text-base font-bold text-white">{t('total')}</dt>
            <dd className="text-base font-bold text-emerald-400">
              ${formattedTotal}
            </dd>
          </dl>
        </div>

        {/* <Link to="/payment"> */}
        <motion.button
          className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}>
          {t('proceed_to_checkout')}
        </motion.button>
        {/* </Link> */}

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-400">{t('or')}</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline">
            {t('continue_shopping')}
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
export default OrderSummary

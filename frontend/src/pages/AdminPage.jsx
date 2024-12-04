import {
  BarChart,
  ClipboardPen,
  PlusCircle,
  ShoppingBasket,
  Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import AnalyticsTab from '../components/AnalyticsTab'
import CreateProductForm from '../components/CreateProductForm'
import ProductsList from '../components/ProductsList'
import OrdersManage from '../components/OrdersManage'
import UsersManage from '../components/UsersManage'
import { useProductStore } from '../stores/useProductStore'
const tabs = [
  { id: 'users', label: '客户管理', icon: Users },
  { id: 'create', label: '创建商品', icon: PlusCircle },
  { id: 'products', label: '商品管理', icon: ShoppingBasket },
  { id: 'orders', label: '订单管理', icon: ClipboardPen },
  { id: 'analytics', label: '销售统计', icon: BarChart },
]

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('users')
  const { fetchAllProducts } = useProductStore()

  useEffect(() => {
    fetchAllProducts()
  }, [fetchAllProducts])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-emerald-400 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          后台管理
        </motion.h1>

        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}>
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === 'users' && <UsersManage />}
        {activeTab === 'create' && <CreateProductForm />}
        {activeTab === 'products' && <ProductsList />}
        {activeTab === 'orders' && <OrdersManage />}
        {activeTab === 'analytics' && <AnalyticsTab />}
      </div>
    </div>
  )
}
export default AdminPage

import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore'
import { useCartStore } from '../stores/useCartStore'
import SearchInput from './SearchInput'

const Navbar = () => {
  const { user, logout } = useUserStore()
  const isAdmin = user?.role === 'admin'
  const { cart } = useCartStore()

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="hidden sm:flex text-2xl font-bold text-emerald-400 items-center space-x-2">
            易购商城
          </Link>
          <div className="flex-grow mx-8">
            <SearchInput />
          </div>
          <nav className="flex flex-wrap items-center gap-3">
            <Link
              to={'/'}
              className="text-gray-300 hover:text-emerald-400 transition duration-300
					 ease-in-out">
              主页
            </Link>
            {user && (
              <>
                <Link
                  to={'/cart'}
                  className="relative group text-gray-300 hover:text-emerald-400 transition duration-300 
							ease-in-out">
                  <ShoppingCart
                    className="inline-block mr-1 group-hover:text-emerald-400"
                    size={20}
                  />
                  <span className="hidden sm:inline">购物车</span>
                  {cart.length > 0 && (
                    <span
                      className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <Link
                  to={`/orders-history/${user._id}`}
                  className="text-gray-300 hover:text-emerald-400 transition duration-300
					 ease-in-out">
                  历史订单
                </Link>
              </>
            )}
            {isAdmin && (
              <Link
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-2 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center"
                to={'/secret-dashboard'}>
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">后台管理</span>
              </Link>
            )}

            {user ? (
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out"
                onClick={logout}>
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">登出</span>
              </button>
            ) : (
              <>
                <Link
                  to={'/signup'}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out">
                  <UserPlus className="mr-2" size={18} />
                  注册
                </Link>
                <Link
                  to={'/login'}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out">
                  <LogIn className="mr-2" size={18} />
                  登录
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
export default Navbar

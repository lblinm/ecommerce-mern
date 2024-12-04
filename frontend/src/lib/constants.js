
export const categories = [
  { name: 'electronics', title: '电子产品', imageUrl: '/electronics.jpg' },
  { name: 'clothing', title: '服装配饰', imageUrl: '/clothing.jpg' },
  { name: 'homeliving', title: '家居生活', imageUrl: '/homeliving.jpg' },
  { name: 'beauty', title: '美妆个护', imageUrl: '/beauty.jpg' },
  { name: 'food', title: '食品饮料', imageUrl: '/food.jpg' },
  { name: 'sports', title: '运动户外', imageUrl: '/sports.jpg' },
  { name: 'baby', title: '母婴用品', imageUrl: '/baby.jpg' },
  { name: 'books', title: '图书文具', imageUrl: '/books.jpg' },
]

export const order_status = {
  pending: {
    title: '未支付',
    color: 'bg-red-700',
  },
  processing: {
    title: '处理中',
    color: 'bg-yellow-700',
  },
  shipped: {
    title: '已发货',
    color: 'bg-blue-700',
  },
  completed: {
    title: '已完成',
    color: 'bg-green-700',
  },
  cancelled: {
    title: '已取消',
    color: 'bg-gray-700',
  },
  default: {
    title: '未知状态',
    color: 'bg-gray-700',
  },
}

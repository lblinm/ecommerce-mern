import mongoose from 'mongoose'
import User from '../models/user.model.js'
import dotenv from 'dotenv'

dotenv.config()


const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    const existingAdmin = await User.findOne({ email: 'admin@example.com' })
    if (existingAdmin) {
      console.log('Admin user already exists.')
      return
    }

    const adminUser = new User({
      name: 'admin',
      email: 'admin@admin.com',
      password: process.env.ADMIN_PASSWORD,
      role: 'admin',
    })

    await adminUser.save()
    console.log('Admin user created successfully.')

  } catch (error) {
    console.error('Error creating admin user:', error.message)
  } finally {
    await mongoose.disconnect()
  }
}


createAdminUser()

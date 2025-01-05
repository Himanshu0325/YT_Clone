
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedAuth() {
  const [isLogin, setIsLogin] = useState(true)

  const toggleForm = () => {
    setIsLogin(!isLogin)
  }

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 bg-white rounded-lg shadow-md w-96"
      >
        <motion.h2
          key={isLogin ? 'login' : 'signup'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-6 text-center"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </motion.h2>
        <motion.form
          key={isLogin ? 'loginForm' : 'signupForm'}
          initial={{ opacity: 0, x: isLogin ? -100 : 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </motion.form>
        <motion.p
          key={isLogin ? 'loginToggle' : 'signupToggle'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-center text-sm text-gray-600"
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={toggleForm}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </motion.p>
      </motion.div>
    </div>
  )
}


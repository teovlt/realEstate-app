import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import axiosConfig from '../../lib/axiosConfig'
import { AuthContext } from '../../context/authContext'

function Login() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { updateUser } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const formData = new FormData(e.target)

    const username = formData.get('username')
    const password = formData.get('password')

    try {
      setIsLoading(true)
      const res = await axiosConfig.post('/auth/login', {
        username,
        password,
      })

      updateUser(res.data.user)

      navigate('/')
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='login'>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name='username' required type='text' placeholder='Username' />
          <input name='password' required type='password' placeholder='Password' />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to='/register'>{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className='imgContainer'>
        <img src='/bg.png' alt='' />
      </div>
    </div>
  )
}

export default Login

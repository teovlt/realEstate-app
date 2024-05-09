import './register.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axiosConfig from '../../lib/axiosConfig'

function Register() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.target)

    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      setIsLoading(true)
      const res = await axiosConfig.post('/auth/register', {
        username,
        email,
        password,
      })

      localStorage.setItem('user', JSON.stringify(res.data.user))

      navigate('/')
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='register'>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name='username' required type='text' placeholder='Username' />
          <input name='email' required type='text' placeholder='Email' />
          <input name='password' required type='password' placeholder='Password' />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to='/login'>Do you have an account?</Link>
        </form>
      </div>
      <div className='imgContainer'>
        <img src='/bg.png' alt='' />
      </div>
    </div>
  )
}

export default Register

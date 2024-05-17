import { useContext, useState } from 'react'
import './profileUpdatePage.scss'
import { AuthContext } from '../../context/authContext'
import axiosConfig from '../../lib/axiosConfig'
import { useNavigate } from 'react-router-dom'
import UploadWidget from '../../components/upload/uploadWidget'

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext)
  const [avatar, setAvatar] = useState(currentUser.avatar)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.target)
    const { username, email, password } = Object.fromEntries(formData)
    try {
      setIsLoading(true)

      const res = await axiosConfig.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar,
      })

      updateUser(res.data.user)
      navigate('/profile')
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='profileUpdatePage'>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className='item'>
            <label htmlFor='username'>Username</label>
            <input id='username' name='username' type='text' defaultValue={currentUser.username} />
          </div>
          <div className='item'>
            <label htmlFor='email'>Email</label>
            <input id='email' name='email' type='email' defaultValue={currentUser.email} />
          </div>
          <div className='item'>
            <label htmlFor='password'>Password</label>
            <input id='password' name='password' type='password' />
          </div>
          <button type='submit' disabled={isLoading}>
            Update
          </button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className='sideContainer'>
        <img src={avatar || '/noavatar.jpg'} alt='' className='avatar' />
        {/* <UploadWidget
          uwConfig={{ cloudName: 'villett', uploadPreset: 'estate-app', multiple: false, maxImageFileSize: 2000000, folder: 'avatars' }}
          setAvatar={setAvatar}
        /> */}
      </div>
    </div>
  )
}

export default ProfileUpdatePage

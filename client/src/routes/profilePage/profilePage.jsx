import { useContext } from 'react'
import Chat from '../../components/chat/Chat'
import List from '../../components/list/List'
import axiosConfig from '../../lib/axiosConfig'
import './profilePage.scss'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

function ProfilePage() {
  const navigate = useNavigate()
  const { currentUser, updateUser } = useContext(AuthContext)

  const handleLogout = async () => {
    try {
      const res = await axiosConfig.post('/auth/logout')
      updateUser(null)
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='profilePage'>
      <div className='details'>
        <div className='wrapper'>
          <div className='title'>
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className='info'>
            <span>
              Avatar:
              <img src={currentUser.avatar || '/noavatar.jpg'} alt='' />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className='title'>
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className='title'>
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className='chatContainer'>
        <div className='wrapper'>
          <Chat />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

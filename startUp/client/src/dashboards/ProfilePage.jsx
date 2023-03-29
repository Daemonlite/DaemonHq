import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
const ProfilePage = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"))
  return (
    <div>
        <div className="profile">
            <img src={user.profile} alt="" className="profile-img" width={200}/>
        </div>
        <div className="location"><LocationOnIcon/>{user.location}</div>
      <div className="username">{user.fullName}</div>

        <a href="/company/create" className="create">create Company</a>
    </div>
  )
}

export default ProfilePage
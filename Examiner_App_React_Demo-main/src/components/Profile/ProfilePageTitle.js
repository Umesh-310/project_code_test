import React from 'react'
import { Link } from 'react-router-dom'

const ProfilePageTitle = () => {
  return (
    <>
      <div className="pagetitle">
        <h1>Profile</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={'/account/dashboard'}>Home</Link></li>
            <li className="breadcrumb-item"><Link to={'/account/profile'}>Profile</Link></li>
          </ol>
        </nav>
      </div>
    </>
  )
}

export default ProfilePageTitle

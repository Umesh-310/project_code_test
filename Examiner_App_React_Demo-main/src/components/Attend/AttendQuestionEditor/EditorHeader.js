import React from 'react'
import { Link} from 'react-router-dom'

import AdbIcon from '@mui/icons-material/Adb';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EditorHeader = () => {
  return (
  <>
    <header id="header" className="header d-flex align-items-center" style={{justifyContent:'space-between'}}>
      <div className="d-flex align-items-center justify-content-between">
        <Link to="#" className="logo d-flex align-items-center">
          {/* <img src="assets/img/logo.png" alt=""/> */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color : '#0c1f4d' }} />
          <span className="d-none d-lg-block">CoderTest</span>
        </Link>
      </div>

      <div className="d-flex align-items-center justify-content-between">
        <Link to={-1} className="btn btn-primary">
          <ArrowBackIcon/> Back to Assesment
        </Link>
      </div>
    </header>
  </>
  )
}

export default EditorHeader

import React from 'react'
import { Link} from 'react-router-dom'

import AdbIcon from '@mui/icons-material/Adb';

const PageTitle = ({data}) => {
  return (
    <>
      <div className="card-title"  style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
        <div>
          <div className="d-flex align-items-center justify-content-between">
            <Link to="#" className="logo d-flex align-items-center">
              {/* <img src="assets/img/logo.png" alt=""/> */}
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color : '#0c1f4d' }} />
              <span className="d-none d-lg-block">CoderTest</span>
            </Link>
          </div>
        </div>
        <div>
          <span className="d-none d-lg-block">Created By</span>
          {data?.created_by?.name}
        </div>
      </div>
    </>
  )
}

export default PageTitle

const AssessedCountCard = ({data}) => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <ul className="nav nav-pills card-header-pills" style={{display:'flex',justifyContent:'space-between'}}>
            <li className="nav-item">
              <h5 className='custom-form-label'>Assessed Candidates</h5>
            </li>
          </ul>
        </div>
        <div className="card-body">
            <div className='row'>
              <div className='col-12'>
                <h5 className="card-title">{data?.assessedCount}</h5>
              </div>               
            </div>
        </div>
      </div>
    </>
  )
}

export default AssessedCountCard

const ScoreCard = ({data}) => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <ul className="nav nav-pills card-header-pills" style={{display:'flex',justifyContent:'space-between'}}>
            <li className="nav-item">
              <h5 className='custom-form-label'>Score</h5>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <div className='row'>
            <div className='col-12'>
              {
                data?.is_qualified
                ?
                <>
                  <h5 className="card-title">{data?.percent_mark} % &nbsp;
                    <span className="badge bg-success text-white">Qualified</span>
                  </h5>
                </>
                :
                <>
                  <h5 className="card-title">{data?.percent_mark} % &nbsp;
                    <span className="badge bg-danger text-white">Not Qualified</span>
                  </h5>
                </>
              }
            </div>            
          </div>
        </div>
      </div>
    </>
  )
}

export default ScoreCard

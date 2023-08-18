import { Link } from 'react-router-dom'


const ExamCountCard = ({data}) => {
  return (
    <>
    <div className="card">
      <div className="card-header">
        <ul className="nav nav-pills card-header-pills" style={{display:'flex',justifyContent:'space-between'}}>
          <li className="nav-item">
            <Link to="/exam/all_exam"><h5 className='custom-form-label'>Exam</h5></Link>
          </li>
        </ul>
      </div>
      <div className="card-body">
          <div className='row'>
            <div className='col-12'>
              <h5 className="card-title">{data?.examCount}</h5>
            </div>          
          </div>
      </div>
    </div>
  </>
  )
}

export default ExamCountCard

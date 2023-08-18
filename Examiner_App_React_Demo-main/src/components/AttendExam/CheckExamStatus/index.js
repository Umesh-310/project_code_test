import React, { useEffect ,useState} from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import AdbIcon from '@mui/icons-material/Adb';


const CheckExamStatus = () => {
  const params = useParams()
  const navigate = useNavigate()
  const examId = params.id;
  const[data,setData] = useState([])
  const[examStatus,setExamStatus] = useState('check')
  const[startAt,setStartAt] = useState('')

  const checkStartExamFun = async() =>{
    try{
      const response = await axios.get(`/api/attendee/check_for_exam_start/${examId}`);
      if(response.status === 200) {
        setData(response.data.data)
        if(response?.data?.data?.extra?.start_now){
          navigate(`/attend_exam/register_attend_exam/${examId}`)
        }
        else if(response?.data?.data?.extra?.start_now_msg === 'not_started'){
          setStartAt(response?.data?.data?.extra?.start_at)
          setExamStatus('not_started');
        }
        else if(response?.data?.data?.extra?.start_now_msg === 'closed'){
          setExamStatus('closed')
        }
        else if(response?.data?.data?.extra?.start_now_msg === 'not_enough_time'){
          setExamStatus('not_enough_time')
        }
      } 
      else{
          toast.error('Server Error');
      }
    } 
    catch (error) {
      toast.error('Exam NOT Found')
    }
  }

  useEffect(()=>{
    const interval = setInterval(() => {
      checkStartExamFun()
    }, 10000);
    return () => clearInterval(interval);
  })

  useEffect(()=>{
    checkStartExamFun()
  },[])

  return (
    <div className="row custom-main" style={{margin:'50px'}}>
      <div className="col-lg-1"></div>
      <div className="col-lg-10">
        
        <div className="card">
          <div className="card-body">
            <div className="card-title"  style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <Link to={process.env.REACT_APP_BASE_URL} className="logo d-flex align-items-center">
                    {/* <img src="assets/img/logo.png" alt=""/> */}
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color : '#0c1f4d' }} />
                    <span className="d-none d-lg-block">CoderTest</span>
                  </Link>
                </div>
              </div>
              <div>
              </div>
            </div>
            <div className="card-body pt-3"  style={{textAlign:'center'}}>
              {
                examStatus  === 'check'
                ?
                <div className='row'>
                  <h3 className="custom-form-label">Welcome</h3>
                  <h4 className="custom-form-label">Checking for Exam Starting Status....</h4>
                </div>
                :
                examStatus === 'not_started'
                ?
                <div className='row'>
                  <h3 className="custom-form-label">You are Early.</h3>
                  <h3 className="custom-form-label" style={{fontWeight:'bold'}}>Exam will Start at <span style={{color:'red'}}>{startAt.slice(0,10)} {startAt.slice(11,16)}</span></h3>
                  <h4 className="custom-form-label">You have to Wait OR Contact Your Examiner</h4>
                </div>
                :
                examStatus === 'closed'
                ?
                <div className='row'>
                  <h3 className="custom-form-label">Sorry You are Late.</h3>
                  <h3 className="custom-form-label" style={{fontWeight:'bold'}}>Exam is Already Closed..</h3>
                  <h4 className="custom-form-label">Contact Your Examiner</h4>
                </div>
                :
                examStatus === 'not_enough_time'
                ?
                <div className='row'>
                  <h3 className="custom-form-label" style={{fontWeight:'bold'}}>You do NOT have Enough Time to Attempt Exam</h3>
                  <h4 className="custom-form-label">Contact Your Examiner</h4>
                </div>
                :
                <></>
              }
              
              <div className='row'>
                <div className='col-md-12'>
                  <img src={process.env.PUBLIC_URL + "/assets/img/attend_exam_wait_bg.jpg"} alt="..." style={{height:'500px'}}/>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
      <div className="col-lg-1"></div>
    </div>
  )
}

export default CheckExamStatus

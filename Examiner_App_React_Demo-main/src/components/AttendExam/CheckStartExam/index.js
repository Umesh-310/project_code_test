import React, { useEffect ,useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import AdbIcon from '@mui/icons-material/Adb';

const CheckStartExam = () => {
  const params = useParams()
  const navigate = useNavigate()
  const examId = params.id;
  const [data,setData] = useState([])

  const checkStartExamFun = async() =>{
    try{
      const response = await axios.get(`/api/attendee/check_for_exam_start/${examId}`);
      if(response.status === 200) {
        setData(response.data.data)
        if(response?.data?.data?.extra?.start_now){
          navigate(`/attend_exam/register_attend_exam/${examId}`)
        }
        else{
          navigate(`/attend_exam/check_exam_status/${examId}`)
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
                <div className='row'>
                  <h3 className="custom-form-label">Welcome</h3>
                  <h4 className="custom-form-label">Checking for Exam Starting Status....</h4>
                </div>
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

export default CheckStartExam

import React,{useState} from 'react'
import { toast } from 'react-toastify'

const RegisterForm = ({exam,registerAttendeeHandler}) => {
  const[user,setUser] = useState({name:'',email:''})
  const[isConfirm,setIsConfirm] = useState(false)
  const[loading, setLoading] = useState(false)

  const onChangeHanlder = (e) =>{
    setUser({...user,[e.target.name]:e.target.value})
  }

  const onConfirmChange = ()=>{
    setIsConfirm(!isConfirm)
  }

  const validate = () =>{
    const curName = user.name.trim()
    const curEmail = user.email.trim()
    if(curName === '' || curEmail === ''){
      toast.error('Please Enter All Details')
      return false
    }
    else if(isConfirm === false){
      toast.error('Please Agree to Terms and Conditions')
      return false
    }
    else{
      return true
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    setLoading(true)
    if(validate()){
      let body = {
        "name" : user.name,
        "email2" : user.email
      }
      await registerAttendeeHandler(body)
    }
    setLoading(false)
  }

  return (
    <form className="row g-3 m-3" style={{marginTop:'100px'}} >
      <div className="row mb-3 col-md-12">
        <input name="name" type="text" className="form-control p-2" id="name" value={user.name} onChange={onChangeHanlder} placeholder="Enter Name eg : Chandani Singh" autoComplete="off"/>
      </div>         
      <div className="row mb-3 col-md-12">
        <input name="email" type="text" className="form-control p-2" id="email" value={user.email} onChange={onChangeHanlder} placeholder="Enter Email"/>
      </div> 
      <div className="row mb-3 col-12">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="gridCheck" name="on_confirm" onClick={onConfirmChange}/>
          <label className="form-check-label text-secondary" htmlFor="gridCheck">
            I understand that Once I begin this assesment I can not leave and return to this assesment at a later time.
          </label>
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
        {
          loading
          ?
          <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
          </button>
          :
          <button type="submit" className="btn btn-primary next" onClick={handleSubmit}>Begin Assesment</button>
        }
        {
          exam?.is_time_limit
          ?
          <span className="text-secondary"><span style={{fontWeight:'bold'}}>Time Limit:</span> {exam?.time_limit_hour} hours, {exam?.time_limit_minute} minutes</span>
          :
          <span className="text-secondary">No Time Limit</span>
        }
      </div>
    </form>
  )
}

export default RegisterForm

import React,{useState} from 'react'
import { toast } from 'react-toastify';

const Page2ExamTime = ({onSubmit, previousPage, exam, setExam, isTimeLimit, onIsTimeLimitChange}) => {
  const[loading, setLoading] = useState(false)

  const onChangeHanlder = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    if(e.target.name === 'is_time_limit'){
      inputValue = e.target.checked;
    }
    setExam({...exam,[inputName] : inputValue})
  }
  
  const validateFormHandler = () =>{
    if(isTimeLimit){
      let curTimeLimitHour = exam.time_limit_hour
      let curTimeLimitMinute = exam.time_limit_minute
      if(curTimeLimitHour === 0 && curTimeLimitMinute === 0){
        return false;
      }
      else{
        return true;
      }
    }
    else{
      setExam({...exam,['time_limit_hour']:0,['time_limit_minute']:0})
      return true;
    }
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    setLoading(true)
    const validate = validateFormHandler()
    if(!validate){
      toast.warning('You have Selected Limited Time. Please Enter Time Limit Also.')
    }
    else{
      await onSubmit()
    }
    setLoading(false)
  }
  return (
    <>
      <div className="">
        <h3 className='custom-modal-title mb-3'>Exam Time Details <span style={{color:'blue',fontSize:'16px',fontWeight:'normal'}}>* Optional</span></h3>
      </div>
      <div>
        <form className="" onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="is_time_limit" className="col-md-4 col-lg-3 col-form-label  custom-form-label-secondary">Is Time Limit</label>
            <div className="col-md-8 col-lg-9 form-switch">
              <input name="is_time_limit" className="form-check-input" type="checkbox" id="is_time_limit" checked={isTimeLimit && 'checked'} onChange={onChangeHanlder} onClick={onIsTimeLimitChange}/>
            </div>
          </div>
          {
            isTimeLimit
            &&                                         
            <div className="row mb-3">
              <label htmlFor="time_limit" className="col-md-4 col-lg-3 col-form-label custom-form-label-secondary">Time Limit</label>
              <div className="col-md-2 col-lg-2">
                Hours <input name="time_limit_hour" type="number" className="form-control" id="time_limit" value={exam.time_limit_hour} onChange={onChangeHanlder} min="0" max="12"/>
              </div>
              <div className="col-md-2 col-lg-2">
                Minutes <input name="time_limit_minute" type="number" className="form-control" id="time_limit" value={exam.time_limit_minute} onChange={onChangeHanlder} min="0" max="59"/>
              </div>
            </div>
          }
          <div className="row mb-3">
            <label htmlFor="start_time" className="col-md-4 col-lg-3 col-form-label  custom-form-label-secondary">Start Time</label>
            <div className="col-md-4 col-lg-4">
              <input name="start_time" type="datetime-local" className="form-control" id="start_time" value={exam.start_time} onChange={onChangeHanlder}/>
            </div>
          </div>     
          <div className="row mb-3">
            <label htmlFor="end_time" className="col-md-4 col-lg-3 col-form-label  custom-form-label-secondary">End Time</label>
            <div className="col-md-4 col-lg-4">
              <input name="end_time" type="datetime-local" className="form-control" id="end_time" value={exam.end_time} onChange={onChangeHanlder}/>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <button type="button" className="btn btn-primary previous" onClick={previousPage}>Previous</button>
            {
              loading
              ?
              <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
              </button>
              :
              <button type="submit" className="btn btn-primary next">Next</button>
            }
          </div>
        </form>

      </div>
    </>
  )
}

export default Page2ExamTime

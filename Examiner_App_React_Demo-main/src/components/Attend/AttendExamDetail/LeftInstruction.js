import React,{useState} from 'react'
import { useSelector } from 'react-redux';

const LeftInstruction = ({exam, endAttendExamHandler}) => {
  const remainTime = useSelector(state => state.remainTime.remainTime); 
  const[isFinalSubmitLoading,setIsFinalSubmitLoading] = useState(false)
  return (
    <>
    <div className='row mb-3'>
        {
        exam?.is_time_limit
        ?
        remainTime?.hours > 0 || remainTime?.minutes > 0
        ?
        <span className="text-secondary p-0">Time Left<br/><span style={{fontWeight:'bold'}}>{remainTime?.hours} hours, {remainTime?.minutes} minutes</span></span>
        :
        <span className="text-secondary p-0">Time Left<br/><span style={{fontWeight:'bold'}}>{remainTime?.seconds} seconds</span></span>
        :
        <span className="text-secondary p-0">No Time Limit</span>
        }
    </div>
    <div className='row mb-3'>
        <h6 className="text-secondary p-0">Welcome to Your CoderTest Assesment. Try and Solve the challenges and answer the questions with this assesment to the best of your ability. Good Luck!</h6>
    </div>
    <div className='row mb-3'>
        <button type="button" className="btn btn-primary" onClick={endAttendExamHandler} style={{width:'200px'}}>
          {
              isFinalSubmitLoading
              ?
              <> Loading... </>
              :
              'Submit Assessment'
          }
        </button>
    </div>
    
    </>
  )
}

export default LeftInstruction

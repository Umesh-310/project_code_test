import {useState} from 'react'
import PropTypes from 'prop-types'

import Page1Exam from './Page1Exam'
import Page2ExamTime from './Page2ExamTime'

const WizardForm=({exam, setExam, onSubmitHandler,isTimeLimit, onIsTimeLimitChange})=>{
  const[page,setPage] = useState(1);

  const  nextPageHandler = () =>{
    setPage((prevPage)=>(prevPage + 1 ))
  }

  const previousPageHandler = () =>{
    setPage((prevPage)=>(prevPage - 1 ))
  }

  return (
    <div>
    {page === 1 && (
      <Page1Exam onSubmit={nextPageHandler} exam={exam} setExam={setExam}/>
    )}
    {page === 2 && (
      <Page2ExamTime previousPage={previousPageHandler} onSubmit={onSubmitHandler} exam={exam} setExam={setExam} isTimeLimit={isTimeLimit} onIsTimeLimitChange={onIsTimeLimitChange}/>
    )}
    </div>
  )

}

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default WizardForm
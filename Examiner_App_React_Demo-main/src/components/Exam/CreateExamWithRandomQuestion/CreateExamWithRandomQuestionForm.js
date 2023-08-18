import { useEffect, useState, useReducer } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import Page1Exam from './Page1Exam'
import Page2ExamTime from './Page2ExamTime'
import Page3Question from './Page3Question'

const initialState = {
  totalQuestion : 0,
  easyQuestion : 0,
  mediumQuestion : 0,
  hardQuestion : 0,
  randomQuestion : 0,
  error : '',
}

const reducer = (state, {type,maxQuestion})=>{
  switch(type){
    case "AddEasy":
      if(maxQuestion > state.easyQuestion){
        return {...state,['easyQuestion']: state.easyQuestion + 1,['totalQuestion']: state.totalQuestion + 1,['error']:''}
      }
      else{
        return {...state,['error']:`Only ${maxQuestion} Easy Questions Available`}
      }
    case "RemoveEasy":
      if(state.easyQuestion > 0){
        return {...state,['easyQuestion']: state.easyQuestion - 1,['totalQuestion']: state.totalQuestion - 1,['error']:''}
      }
      else{
        return {...state,['error']:`Number of Questions can not be Negative`}
      }

    case "AddMedium":
      if(maxQuestion > state.mediumQuestion){
        return {...state,['mediumQuestion']: state.mediumQuestion + 1,['totalQuestion']: state.totalQuestion + 1,['error']:''}
      }
      else{
        return {...state,['error']:`Only ${maxQuestion} Medium Questions Available`}
      }
    case "RemoveMedium":
      if(state.mediumQuestion > 0){
        return {...state,['mediumQuestion']: state.mediumQuestion - 1,['totalQuestion']: state.totalQuestion - 1,['error']:''}
      }
      else{
        return {...state,['error']:`Number of Questions can not be Negative`}
      }
    
    case "AddHard":
      if(maxQuestion > state.hardQuestion){
        return {...state,['hardQuestion']: state.hardQuestion + 1,['totalQuestion']: state.totalQuestion + 1,['error']:''}
      }
      else{
        return {...state,['error']:`Only ${maxQuestion} Hard Questions Available`}
      }
    case "RemoveHard":
      if(state.hardQuestion > 0){
        return {...state,['hardQuestion']: state.hardQuestion - 1,['totalQuestion']: state.totalQuestion - 1,['error']:''}
      }
      else{
        return {...state,['error']:`Number of Questions can not be Negative`}
      }
    
    case "AddRandom":
      if(maxQuestion > state.randomQuestion){
        return {...state,['randomQuestion']: state.randomQuestion + 1,['totalQuestion']: state.totalQuestion + 1,['error']:''}
      }
      else{
        return {...state,['error']:`Only ${maxQuestion} Questions Available`}
      }
    case "RemoveRandom":
      if(state.randomQuestion > 0){
        return {...state,['randomQuestion']: state.randomQuestion - 1,['totalQuestion']: state.totalQuestion - 1,['error']:''}
      }
      else{
        return {...state,['error']:`Number of Questions can not be Negative`}
      }
    
    case "IsLevelWiseChange":
      return{...initialState}


    default:
      return state;
  }
}

const WizardForm=({onCreateExam})=>{
  const[exam,setExam] = useState({
    'title' : '',
    'description' : '',
    'passing_percent_mark' : 0,
    'total_question' : 0,
    'is_time_limit' : false,
    'time_limit_hour' : 0,
    'time_limit_minute' : 0,
    'start_time' : null,
    'end_time' : null,
    'easy_question' : 0,
    'medium_question' : 0,
    'hard_question' : 0
  })

  const[questionState,dispatch] = useReducer(reducer, initialState);
  const[isTimeLimit, setIsTimeLimit] = useState(false);
  const[page,setPage] = useState(1);

  const onIsTimeLimitChange = ()=>{
      setIsTimeLimit(!isTimeLimit)
  }  

  const  nextPageHandler = () =>{
      setPage((prevPage)=>(prevPage + 1 ))
  }

  const previousPageHandler = () =>{
      setPage((prevPage)=>(prevPage - 1 ))
  }

  const onSubmitHandler = async()=>{
    let body = {
      "title" : exam.title,
      "description" : exam.description,
      "passing_percent_mark" : exam.passing_percent_mark,
      "total_question" : exam.total_question,
      "is_time_limit" : exam.is_time_limit,
      "time_limit_hour" : exam.is_time_limit ? exam.time_limit_hour : 0,
      "time_limit_minute" : exam.is_time_limit ? exam.time_limit_minute : 0,
      "start_time" : exam.start_time === "" ? null : exam.start_time,
      "end_time" : exam.end_time === "" ? null : exam.end_time,
      "easy_question" : questionState.easyQuestion,
      "medium_question" : questionState.mediumQuestion,
      "hard_question" : questionState.hardQuestion,
      "random_question" : questionState.randomQuestion,
    }
    await onCreateExam(body)
  }

  useEffect(()=>{
    setExam({...exam,['total_question']:questionState.totalQuestion})
    if(questionState.error !== ''){
      toast.error(questionState.error)
    }
  },[questionState])
  
  return (
    <div>
      {page === 1 && (
        <Page1Exam onSubmit={nextPageHandler} exam={exam} setExam={setExam}/>
      )}
      {page === 2 && (
        <Page2ExamTime previousPage={previousPageHandler} onSubmit={nextPageHandler} exam={exam} setExam={setExam} isTimeLimit={isTimeLimit} onIsTimeLimitChange={onIsTimeLimitChange}/>
      )}
      {page === 3 && (
        <Page3Question previousPage={previousPageHandler} onSubmit={onSubmitHandler} exam={exam} setExam={setExam} dispatch={dispatch} questionState={questionState} />
      )}
    </div>
  )

}

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default WizardForm
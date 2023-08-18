import { useEffect, useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import { loadCookies } from '../../../utils/Cookies'
import { useNavigate } from 'react-router-dom';


const Page3Question = ({onSubmit, previousPage, exam, setExam, selectedQue, dispatch, questionState}) => {
  const navigate = useNavigate()
  const[loading, setLoading] = useState(false)
  const[data,setData] = useState([])
  const[isFinalSubmit, setIsFinalSubmit] = useState(false)
  const[isLevelWise, setIsLevelWise] = useState(false)

  const onIsLevelWiseChange = () =>{
    setIsLevelWise(!isLevelWise);
    dispatch({type:'IsLevelWiseChange'})
  }

  const getTotalQuestion = async() =>{
    try{
      let access_token = loadCookies('access_token')
      if(!access_token){
        navigate('/auth/login')
      }
      const headers = { 'Authorization': `Bearer ${access_token}` };
      const response = await axios.get(`/api/author/total_question/`,{headers});
      if(response.status === 200) {
        setData(response.data.data)
      } 
      else{
        toast.error('Server Error');
      }
    } 
    catch (error) {
    }
  }

  const validateFormHandler = () =>{
    if(questionState.totalQuestion >= 1){
      return true;
    }
    else{
      return false;
    }
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    setLoading(true)
    const validate = validateFormHandler()
    if(!validate){
      toast.error('Please select atleast 1 question...')
    }
    else{
      if(window.confirm('Are you sure? \nYou will not be allowed to change questions after you submit....')){
        setIsFinalSubmit(true)
      }
    }
    setLoading(false)
  }

  const handleFinalSubmit = async(e) =>{
    e.preventDefault()
    setLoading(true)
    const validate = validateFormHandler()
    if(!validate){
      toast.error('Please select atleast 1 question...')
    }
    else{
     await onSubmit();
    }
    setLoading(false)
  }

  useEffect(()=>{
    getTotalQuestion()
  },[])

  return (
    <>
      <div className="">
        <h3 className='custom-modal-title mb-3'>Question Details</h3>
      </div>
      <div>
        <form className="">
          <div className='row'>
            <div className='col-md-4'>
              <h5 style={{color:'blue'}}>Total Selected Questions : {exam.total_question}</h5>
            </div>
          </div>
          <div className="card" style={{width:'400px'}}>
            <div className="card-body">
              <div className="row mb-3">
                <label htmlFor="is_level_wise" className="col-md-6 col-lg-6 col-form-label  custom-form-label-secondary">Level Wise</label>
                <div className="col-md-6 col-lg-6  form-switch">
                  <input name="is_level_wise" className="form-check-input" type="checkbox" id="is_level_wise" onClick={onIsLevelWiseChange}/>
                </div>
              </div>
              {
                isLevelWise
                ?
                <table className="table table-striped" style={{textAlign:'center'}}> 
                  <thead>
                    <tr className="table-primary">
                      <th scope="col">Level Type</th>
                      <th scope="col">No. Of Question</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="">
                      <th scope="row">
                      <span className='badge bg-success rounded-pill' style={{fontSize:'18px',fontWeight:'normal'}}>Easy</span>
                      </th>
                      <td>
                        <button type='button' className='btn' onClick={(e)=>dispatch({ type: "RemoveEasy", maxQuestion: data['Easy'] })}>
                          <RemoveIcon/>
                        </button>
                        <span style={{fontSize : '20px',fontWeight:'bold'}}>{questionState.easyQuestion}</span>
                        <button type='button' className='btn' onClick={(e)=>dispatch({ type: "AddEasy", maxQuestion: data['Easy'] })}>
                          <AddIcon />
                        </button>
                      </td>
                    </tr>
                    <tr className="">
                      <th scope="row">
                      <span className='badge bg-warning rounded-pill' style={{fontSize:'18px',fontWeight:'normal'}}>Medium</span>
                      </th>
                      <td>
                        <button type='button' className='btn' onClick={(e)=>dispatch({ type: "RemoveMedium", maxQuestion: data['Medium'] })}>
                          <RemoveIcon/>
                        </button>
                        <span style={{fontSize : '20px',fontWeight:'bold'}}>{questionState.mediumQuestion}</span>
                        <button type='button' className='btn' onClick={(e)=>dispatch({ type: "AddMedium", maxQuestion: data['Medium'] })}>
                          <AddIcon />
                        </button>
                      </td>
                    </tr>
                    <tr className="">
                      <th scope="row">
                        <span className='badge bg-danger rounded-pill' style={{fontSize:'18px',fontWeight:'normal'}}>Hard</span>
                      </th>
                      <td>
                        <button type='button' className='btn' onClick={(e)=>dispatch({ type: "RemoveHard", maxQuestion: data['Hard'] })}>
                          <RemoveIcon/>
                        </button>
                        <span style={{fontSize : '20px',fontWeight:'bold'}}>{questionState.hardQuestion}</span>
                        <button type='button' className='btn' onClick={(e)=>dispatch({ type: "AddHard", maxQuestion: data['Hard'] })}>
                          <AddIcon />
                        </button>
                      </td>
                    </tr>
                    <tr className="table-paimary">
                      <th scope="row">Total Question</th>
                      <th>
                        <span style={{fontSize : '20px',fontWeight:'bold'}}>{questionState.totalQuestion}</span>
                      </th>
                    </tr>
                  </tbody>
                </table>
                :
                <table className="table table-striped" style={{textAlign:'center'}}> 
                  <thead>
                    <tr className="table-primary">
                      <th scope="col">Type</th>
                      <th scope="col">No. Of Question</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="">
                      <th scope="row">
                        <span className='badge bg-info rounded-pill' style={{fontSize:'18px',fontWeight:'normal'}}>Random</span>
                      </th>
                      <td>
                        <button type='button' className='btn' onClick={(e)=>dispatch({ type: "RemoveRandom", maxQuestion: data['Total'] })}>
                          <RemoveIcon/>
                        </button>
                        <span style={{fontSize : '20px',fontWeight:'bold'}}>{questionState.randomQuestion}</span>
                        <button type='button' className='btn' onClick={(e)=>dispatch({ type: "AddRandom", maxQuestion: data['Total'] })}>
                          <AddIcon />
                        </button>
                      </td>
                    </tr>
                    <tr className="table-paimary">
                      <th scope="row">Total Question</th>
                      <th>
                        <span style={{fontSize : '20px',fontWeight:'bold'}}>{questionState.totalQuestion}</span>
                      </th>
                    </tr>
                  </tbody>
                </table>
              }              
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
                isFinalSubmit
                ?
                <button type="button" className="btn btn-primary next" onClick={handleFinalSubmit}>Final Submit</button>
                :
                <button type="button" className="btn btn-primary next" onClick={handleSubmit}>Save</button>
              }
          </div>
        </form>
      </div>
    </>
  )
}

export default Page3Question

import { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';

const ExamLinkMailCard = ({data:row, onExamLinkMailHanlder}) => {
  const[email,setEmail] = useState('');
  const[loading,setLoading] = useState(false);

  const CopyToClipboardHandler = (e,row)=>{
    e.preventDefault()
    navigator.clipboard.writeText(row.exam_link);
    toast.info('Exam Link Coppied to Clipboard..')
  }

  const sendMailHandler = async(e) =>{
    e.preventDefault()
    setLoading(true)
    let curEmail = email.trim()
    if(curEmail === ''){
      toast.error('Please enter email addresses to send exam link.')
    }
    else{
      curEmail = curEmail.split(",")
      var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      let finalEmail = curEmail.map((ce)=>{
        if(validRegex.test(ce)){
          return (ce.trim())
        }
      })

      if(finalEmail.includes(undefined)){
        toast.error('Please enter valid email')
        setLoading(false)
        return 
      }

      const body = {
        'id' : row.id,
        'users' : finalEmail
      }
      await onExamLinkMailHanlder(body)
    }
    setLoading(false)
  }
  
  return (
    <>
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-pills card-header-pills" style={{display:'flex',justifyContent:'space-between'}}>
            <li className="nav-item">
              <h5 className='custom-form-label'>Invite Attendee</h5>
            </li>
          </ul>
        </div>
        <form>
          <div className="card-body">
            <div className='row mt-3'>
              <input name="email" type="email" className="form-control" id="example" style={{maxHeight: '150px'}} onChange={(e)=>{setEmail(e.target.value)}} disabled={!row.is_active && 'disabled'} multiple />
            </div>
          </div>
          <div className='card-footer' style={{display:'flex',justifyContent:'space-around'}}>
            {
              loading
              ?
              <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
              </button>
              :
              row?.is_active
              ?
              <button type="button" className="btn btn-primary"  onClick={sendMailHandler}>Send Mail</button>
              :
              <button type="button" className="btn btn-primary" disabled>Can't Send Mail</button>
            }
            {
              row.is_active
              ?
              <>
              OR
              <button className='btn btn-outline-primary' onClick={(e)=>{CopyToClipboardHandler(e,row)}}>
                <ContentCopyIcon /> Copy Exam Link
              </button>
              </>
              :
              null
            }
          </div>
        </form>
      </div>
    </>
  )
}

export default ExamLinkMailCard

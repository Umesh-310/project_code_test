import { useEffect, useState,useRef} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

// for pdf
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import PageTitle from './PageTitle'
import { loadCookies } from '../../../utils/Cookies'
import AttendeeDetailCard from './AttendeeDetailCard'
import ExamDetailCard from './ExamDetailCard'
import TimeTakenCard from './TimeTakenCard'
import StatusCard from './StatusCard'
import ScoreCard from './ScoreCard'
import CheatingCard from './CheatingCard'
import AttendQuestionTableCard from './AttendQuestionTableCard'
import AttendExamVideoCard from './AttendExamVideoCard'


const AttendeeAttendExamDetailCard = () => {
  const navigate = useNavigate()
  const printRef = useRef();
  const params = useParams()
  const attendExamId = params.id;
  const [data,setData] = useState([])
  const [sendMailIsLoading,setSendMailIsLoading] = useState(false);
  
  const getAttendeeAttendExamDetailCard = async() =>{
    try{
      let access_token = loadCookies('access_token')
      if(!access_token){
        navigate('/auth/login')
      }
      const headers = { 'Authorization': `Bearer ${access_token}` };
      const response = await axios.get(`/api/attendee/get_single_attend_exam_by_examiner/${attendExamId}`,{headers});
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

  const handleDownloadPdf = async () => {
      const element = printRef.current;
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL('image/png');
  
      const pdf1 = new jsPDF();
      const imgProperties = pdf1.getImageProperties(data);
      const pdfWidth = pdf1.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
  
      pdf1.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf1.save(`${data?.id}.pdf`);

      // pdfFromReact(".element-to-print", "My-file", "p", false, false)
  };

  const mailAttendExamPdf = async()=>{
    setSendMailIsLoading(true)
    try{
      let access_token = loadCookies('access_token')
      if(!access_token){
        window.location.href = '/question/login'
      }
      const headers = { 'Authorization': `Bearer ${access_token}` };
      const response = await axios.get(`/api/attendee/mail_attend_exam_pdf/${attendExamId}`,{headers});
    
      if(response.status === 200) {
        toast.success(response.data.msg);
      } 
      else{
        console.log(response);
        toast.error('Server Error');
      }
    } 
    catch (error) {
      console.log(error)
      toast.error(error.response.data.detail)
    }
    setSendMailIsLoading(false)
  };

  useEffect(()=>{
    getAttendeeAttendExamDetailCard()
  },[])


  return (
    <>
      <main id="main" className="main">
        <PageTitle attendExamId={attendExamId} examId={data?.exam?.id}/>
        <div className='text-right' style={{display:'flex',justifyContent:'flex-end'}}>
          <button type="button" onClick={handleDownloadPdf} className='btn btn-primary text-right'>
            Download Report as PDF
          </button>
          &nbsp;&nbsp;
          <button type="button" onClick={mailAttendExamPdf} className='btn btn-primary text-right'>
            {
              sendMailIsLoading
              ?
              'Sending...'
              :
              'Mail Result to Attendee'
            }
          </button>
        </div>

        <section className="section p-3 element-to-print" ref={printRef}>
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className='col-md-4 col-sm-6'>
                  <AttendeeDetailCard attendeeData={data?.attendee}/>
                </div>
                <div className='col-md-4 col-sm-6'>
                  <ExamDetailCard examData={data?.exam} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className='col-md-3 col-sm-6'>
                  <StatusCard data={data} />
                </div>
                {
                  data?.end_time != null
                  ?
                  <>
                    <div className='col-md-3 col-sm-6'>
                      <TimeTakenCard data={data}/>
                    </div>
                    <div className='col-md-3 col-sm-6'>
                      <ScoreCard data={data} />
                    </div>
                    <div className='col-md-3 col-sm-6'>
                      <CheatingCard data={data} />
                    </div>
                  </>
                  :
                  <></>
                }
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <AttendQuestionTableCard attendQuestionDatas={data?.attend_questions}/>
            </div>
          </div>            
        </section>
        <section className="section p-3">
        {
          data?.video
          ?
          <div className='row'>
            <div className='col-md-12'>
              <AttendExamVideoCard AttendExamVideo={data?.video} />
            </div>
          </div>
          :
          <></>
        }
        </section>
      </main>
    </>
  )
}

export default AttendeeAttendExamDetailCard

import React, { memo } from 'react'

const LeftQuestionDiv = ({remainTime,exam,data}) => {
  return (
    <>
    <div>
      <div className='row m-0 p-0' >
        <div className='p-0 pt-3' style={{display:'flex',justifyContent:'space-between'}}>
          <span className='badge bg-success rounded-pill' style={{fontSize:'18px',fontWeight:'normal',width:'100px'}}>Easy</span>
          <>
          {
          exam?.is_time_limit
          ?
          remainTime?.hours > 0 || remainTime?.minutes > 0
          ?
          <span className="badge bg-primary rounded-pill"  style={{fontSize:'16px',fontWeight:'normal',width:'auto'}}>Time Left <span style={{fontWeight:'bold'}}>{remainTime?.hours} hours, {remainTime?.minutes} minutes</span></span>
          :
          <span className="badge bg-primary rounded-pill"  style={{fontSize:'16px',fontWeight:'normal',width:'auto'}}>Time Left <span style={{fontWeight:'bold'}}>{remainTime?.seconds} seconds</span></span>
          :
          <span style={{fontSize:'18px',fontWeight:'normal',width:'auto'}}>No Time Limit</span>
          }
          </>
        </div>
      </div>
      <div className='row m-0 mt-3 mb-3 p-0'>
        <h5 style={{fontWeight:'bold'}}>{data?.question?.title}</h5>
      </div>
      <div className='row m-0 p-0'>
        <p>{data?.question?.description}</p>
      </div>
      <div className='row m-0 mt-3 mb-3 p-0'>
        <h5 style={{fontWeight:'bold'}}>Example</h5>
      </div>
      <div className='row m-3 p-3' style={{backgroundColor:'Background',border:'1px solid gray'}}>
        <h6>Input : {data?.question?.testcases[0]?.input}</h6>
        <h6>Output : {data?.question?.testcases[0]?.output}</h6>
      </div>
      <div className='row m-3 p-3' style={{backgroundColor:'Background',border:'1px solid gray'}}>
        <h6>Input : {data?.question?.testcases[1]?.input}</h6>
        <h6>Output : {data?.question?.testcases[1]?.output}</h6>
      </div>
    </div>
    </>
  )
}

export default memo(LeftQuestionDiv)

const AttendExamVideoCard = ({AttendExamVideo}) => {

  return (
    <>
      <div className="row">
        <div className='col-12'>
            <h4 style={{fontWeight:'bold'}}>Recorded Screen Video</h4>
        </div>
      </div>
      {
        AttendExamVideo
        ?
        <>
        <div className="row text-center">
          <div className='col-12'>
            <video width="450px" height="auto" controls autoPlay style={{textAlign:'center'}}>
              <source src={`${process.env.REACT_APP_API_URL}${AttendExamVideo}`} type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        </>
        :
        <h5>No Video Found</h5>
      }
    </>
  )
}

export default AttendExamVideoCard

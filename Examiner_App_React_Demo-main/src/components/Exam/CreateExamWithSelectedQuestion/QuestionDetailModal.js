import React from 'react'
import LaunchIcon from '@mui/icons-material/Launch';

const QuestionDetailModal = ({que}) => {
  return (
    <>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#modalDialogScrollable-${que.id}`}>
        <LaunchIcon/>
      </button>

      <div className="modal fade" id={`modalDialogScrollable-${que.id}`} tabIndex="-1" align="left">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Question Detail</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="row g-3">
                <div className="col-12">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" value={que.title} disabled/>
                </div>
                <div className="col-12">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="description" style={{height: '100px'}} value={que.description} disabled/>
                </div>
                <div className="col-12">
                  <label htmlFor="title" className="form-label">Level</label>
                  {
                    que?.level === 'Easy'
                    &&
                    <button type="button" style={{marginLeft:'20px'}} className="btn btn-success rounded-pill" disabled>Easy</button>
                  }
                  {   
                    que?.level === 'Medium'
                    &&
                    <button type="button" style={{marginLeft:'20px'}}  className="btn btn-warning rounded-pill" disabled>Medium</button>
                  }
                  {    
                    que?.level === 'Hard'
                    &&
                    <button type="button" style={{marginLeft:'20px'}}  className="btn btn-danger rounded-pill" disabled>Hard</button>
                  }
                </div>
                <div className="col-12">
                  <label htmlFor="example" className="form-label">Example</label>
                  <textarea className="form-control" id="example" value={que.example} disabled/>
                </div>
                <div className="col-12">
                  <label htmlFor="created_by" className="form-label">Created By</label>
                  <input type="text" className="form-control" id="created_by" value={que.created_by.name} disabled/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionDetailModal

import React from "react";

const ProfileOverviewTab = ({ currentUser }) => {
  return (
    <>
      <div
        className="tab-pane fade show active profile-overview"
        id="profile-overview"
      >
        <h5 className="card-title">About</h5>
        <p className="small fst-italic">{currentUser?.about}</p>

        <h5 className="card-title">Profile Details</h5>

        <div className="row">
          <div className="col-lg-3 col-md-4 label ">Name</div>
          <div className="col-lg-9 col-md-8">{currentUser?.name}</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label">Email</div>
          <div className="col-lg-9 col-md-8">{currentUser?.email}</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label">Mobile</div>
          <div className="col-lg-9 col-md-8">{currentUser?.mobile}</div>
        </div>
      </div>
    </>
  );
};

export default ProfileOverviewTab;

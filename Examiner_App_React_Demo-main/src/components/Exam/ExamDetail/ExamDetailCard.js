const ExamDetailCard = ({ data: row }) => {
  return (
    <>
      <div className="card text-center">
        <div className="card-header">
          <ul
            className="nav nav-pills card-header-pills"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <li className="nav-item">
              <h5 className="custom-form-label">Exam Details</h5>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <h5 className="card-title">Qualified %</h5>
              <p className="card-text">
                {row?.total_attendee?.total_attendee === 0 ||
                (row?.total_attendee?.qualified_attendee * 100) /
                  row?.total_attendee?.total_attendee ==
                  0
                  ? 0
                  : parseFloat(
                      (row?.total_attendee?.qualified_attendee * 100) /
                        row?.total_attendee?.total_attendee,
                    ).toFixed(2)}{" "}
                %
              </p>
            </div>
            <div className="col-md-4">
              <h5 className="card-title">Attendee</h5>
              <p className="card-text">
                {row?.total_attendee?.total_attendee} Assessed
              </p>
              <p className="card-text">
                {row?.total_attendee?.qualified_attendee} Qualified
              </p>
            </div>
            <div className="col-md-4">
              <h5 className="card-title">Questions</h5>
              <p className="card-text">{row.total_question} Questions</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamDetailCard;

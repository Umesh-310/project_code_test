const TimeTakenCard = ({ data }) => {
  const hours = parseInt(
    (new Date(data?.end_time).getTime() -
      new Date(data?.start_time).getTime()) /
      3600000,
  );
  const minutes =
    parseInt(
      (new Date(data?.end_time).getTime() -
        new Date(data?.start_time).getTime()) /
        60000,
    ) -
    hours * 60;
  const seconds =
    parseInt(
      (new Date(data?.end_time).getTime() -
        new Date(data?.start_time).getTime()) /
        1000,
    ) -
    minutes * 60;

  return (
    <>
      <div className="card">
        <div className="card-header">
          <ul
            className="nav nav-pills card-header-pills"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <li className="nav-item">
              <h5 className="custom-form-label">Time Taken</h5>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <h5 className="card-title">{`${hours}h : ${minutes}m`}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeTakenCard;

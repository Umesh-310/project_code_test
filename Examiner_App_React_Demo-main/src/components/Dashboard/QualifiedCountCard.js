const QualifiedCountCard = ({ data }) => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <ul
            className="nav nav-pills card-header-pills"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <li className="nav-item">
              <h5 className="custom-form-label">Qualified</h5>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <h5 className="card-title pb-0 ">{data?.qualifiedCount}</h5>
              <h6 className="p-0 m-0">
                (
                {parseFloat(
                  (data?.qualifiedCount / data?.assessedCount) * 100,
                ).toFixed(2)}{" "}
                % of Assessed)
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QualifiedCountCard;

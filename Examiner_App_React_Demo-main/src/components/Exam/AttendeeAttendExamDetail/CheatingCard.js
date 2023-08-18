const CheatingCard = ({ data }) => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <ul
            className="nav nav-pills card-header-pills"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <li className="nav-item">
              <h5 className="custom-form-label">Cheating</h5>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              {data?.total_cheat > 0 ? (
                <>
                  <h5 className="card-title" style={{ color: "red" }}>
                    Detected &nbsp;
                    <span className="badge bg-danger text-white">
                      {data?.total_cheat} Paste
                    </span>
                  </h5>
                </>
              ) : (
                <>
                  <h5 className="card-title" style={{ color: "green" }}>
                    Not Detected
                  </h5>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheatingCard;

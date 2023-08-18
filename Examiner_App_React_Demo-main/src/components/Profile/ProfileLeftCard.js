const ProfileLeftCard = ({ currentUser }) => {
  return (
    <>
      <div className="card">
        <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
          <img
            src={`${process.env.REACT_APP_API_URL}${currentUser?.image}`}
            alt="Profile"
            className="rounded-circle"
          />
          <h2>{currentUser?.name}</h2>
          <h3>{currentUser?.name}</h3>
          <div className="social-links mt-2">
            {currentUser?.linkedin_profile ? (
              <a href={currentUser?.linkedin_profile} className="linkedin">
                <i className="bi bi-linkedin"></i>
              </a>
            ) : (
              <></>
            )}
            {currentUser?.github_profile ? (
              <a href={currentUser?.github_profile} className="github">
                <i className="bi bi-github"></i>
              </a>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileLeftCard;

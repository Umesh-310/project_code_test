import React, { useEffect, useState } from "react";

const ProfileEditTab = ({ currentUser, updateProfile }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onChangeHanlder = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value.trim();
    setUser({ ...user, [inputName]: inputValue });
  };

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateProfile(user, image);
    setLoading(false);
  };

  useEffect(() => {
    setUser({
      name: currentUser?.name,
      email: currentUser?.email,
      about: currentUser?.about,
      mobile: currentUser?.mobile,
      image: currentUser?.image,
      github: currentUser?.github_profile,
      linkedin: currentUser?.linkedin_profile,
    });
  }, [currentUser]);

  return (
    <>
      <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
        <form onSubmit={onFormSubmitHandler}>
          <div className="row mb-3">
            <label htmlFor="image" className="col-md-4 col-lg-3 col-form-label">
              Profile Image
            </label>
            <div className="col-md-8 col-lg-9">
              {user.image && (
                <img
                  src={`${process.env.REACT_APP_API_URL}${user?.image}`}
                  alt="Profile"
                />
              )}
              <input
                name="image"
                className="form-control"
                type="file"
                id="image"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="name" className="col-md-4 col-lg-3 col-form-label">
              Name
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="name"
                type="text"
                className="form-control"
                id="name"
                value={user.name}
                onChange={onChangeHanlder}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">
              About
            </label>
            <div className="col-md-8 col-lg-9">
              <textarea
                name="about"
                className="form-control"
                id="about"
                style={{ height: "100px" }}
                onChange={onChangeHanlder}
                value={user.about}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">
              Email
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="email"
                type="email"
                className="form-control"
                id="Email"
                value={user.email}
                readOnly
                disabled
              />
            </div>
          </div>

          <div className="row mb-3">
            <label
              htmlFor="Mobile"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Mobile
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="mobile"
                type="text"
                className="form-control"
                id="Mobile"
                value={user.mobile}
                onChange={onChangeHanlder}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label
              htmlFor="Github"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Github Profile
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="github"
                type="text"
                className="form-control"
                id="Github"
                value={user.github}
                onChange={onChangeHanlder}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label
              htmlFor="Linkedin"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Linkedin Profile
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="linkedin"
                type="text"
                className="form-control"
                id="Linkedin"
                value={user.linkedin}
                onChange={onChangeHanlder}
              />
            </div>
          </div>

          <div className="text-center">
            {loading ? (
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileEditTab;

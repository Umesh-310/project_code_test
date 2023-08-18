import { useState } from "react";
import { toast } from "react-toastify";

const ProfileChangePasswordTab = ({ changePassword }) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== password2) {
      toast.error("Password and ReType Password Not Matched..");
    } else {
      await changePassword({ password: password });
    }
    setLoading(false);
  };
  return (
    <>
      <div className="tab-pane fade pt-3" id="profile-change-password">
        <form onSubmit={onFormSubmitHandler}>
          <div className="row mb-3">
            <label
              htmlFor="newPassword"
              className="col-md-4 col-lg-3 col-form-label"
            >
              New Password
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="newpassword"
                type="password"
                className="form-control"
                id="newPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label
              htmlFor="renewPassword"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Re-enter New Password
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="renewpassword"
                type="password"
                className="form-control"
                id="renewPassword"
                value={password2}
                onChange={(e) => setPassword2(e.target.value.trim())}
              />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileChangePasswordTab;

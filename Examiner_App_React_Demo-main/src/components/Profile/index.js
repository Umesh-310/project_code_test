import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import ProfilePageTitle from "./ProfilePageTitle";
import ProfileLeftCard from "./ProfileLeftCard";
import ProfileNavTab from "./ProfileNavTab";
import ProfileOverviewTab from "./ProfileOverviewTab";
import ProfileEditTab from "./ProfileEditTab";
import ProfileChangePasswordTab from "./ProfileChangePasswordTab";

import { GET_CURRENT_USER_SUCCESS } from "../../store/authSlice";
import { loadCookies } from "../../utils/Cookies";

const Profile = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let user = useSelector((state) => state.auth.user);
  const [currentUser, setCurrentuser] = useState();

  const updateProfile = async (updatedUser, image) => {
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        navigate("/auth/login");
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      let response;
      if (image == null) {
        const body = {
          name: updatedUser.name,
          about: updatedUser.about,
          mobile: updatedUser.mobile,
          github_profile: updatedUser.github,
          linkedin_profile: updatedUser.linkedin,
        };
        response = await axios.patch(`/api/account/update-profile/`, body, {
          headers,
        });
      } else {
        let form_data = new FormData();
        form_data.append(
          "image",
          image,
          `${updatedUser.name + Date.now().toString()}.png`,
        );
        form_data.append("name", updatedUser.name);
        form_data.append("about", updatedUser.about);
        form_data.append("mobile", updatedUser.mobile);
        form_data.append("github_profile", updatedUser.github);
        form_data.append("linkedin_profile", updatedUser.linkedin);
        response = await axios.patch(
          `/api/account/update-profile/`,
          form_data,
          { headers },
        );
      }

      if (response.status === 200) {
        toast.success(response.data.msg);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(GET_CURRENT_USER_SUCCESS(response.data.user));
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
  };

  const changePassword = async ({ password }) => {
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        navigate("/auth/login");
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const body = {
        password: password,
        password2: password,
      };
      const response = await axios.post(`/api/account/changepassword/`, body, {
        headers,
      });
      if (response.status === 200) {
        toast.success(response.data.msg);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
  };

  useEffect(() => {
    setCurrentuser(user);
  }, [updateProfile]);

  return (
    <>
      <main id="main" className="main custom-main">
        <ProfilePageTitle />
        <section className="section profile">
          <div className="row">
            <div className="col-xl-4">
              <ProfileLeftCard currentUser={currentUser} />
            </div>
            <div className="col-xl-8">
              <div className="card">
                <div className="card-body pt-3">
                  <ProfileNavTab />
                  <div className="tab-content pt-2">
                    <ProfileOverviewTab currentUser={currentUser} />
                    <ProfileEditTab
                      currentUser={currentUser}
                      updateProfile={updateProfile}
                    />
                    <ProfileChangePasswordTab
                      currentUser={currentUser}
                      changePassword={changePassword}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;

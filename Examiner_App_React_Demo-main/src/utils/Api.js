import axios from "axios";
import { loadCookies } from "./Cookies";

export const activateExamHandler = async (exam, navigate) => {
  try {
    let access_token = loadCookies("access_token");
    if (!access_token) {
      navigate("/auth/login");
    }
    const headers = { Authorization: `Bearer ${access_token}` };
    let response;
    if (exam.is_active) {
      response = await axios.put(
        `/api/examiner/deactivate_exam/${exam.id}/`,
        {},
        { headers }
      );
    } else {
      response = await axios.put(
        `/api/examiner/activate_exam/${exam.id}/`,
        {},
        { headers }
      );
    }
    return response;
  } catch (error) {}
};

export const deletionExamHandler = async (exam, navigate) => {
  console.log({ exam });
  try {
    let access_token = loadCookies("access_token");
    if (!access_token) {
      navigate("/auth/login");
    }
    const headers = { Authorization: `Bearer ${access_token}` };
    let response;

    if (exam.is_deleted) {
      response = await axios.put(
        `/api/examiner/restore_exam/${exam.id}/`,
        {},
        { headers }
      );
    } else {
      response = await axios.delete(`/api/examiner/delete_exam/${exam.id}/`, {
        headers,
      });
    }
    return response;
  } catch (error) {}
};

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import ThemeRoutes from "./routes";
import { getCurrentUser } from "./store/authSlice";

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();

  const getUser = useCallback(async () => {
    await getCurrentUser(dispatch);
    // dispatch(GetCurrentUser())
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <>
      <ThemeRoutes />
    </>
  );
}

export default App;

import React, { useCallback, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  HomePage,
  CandidateGuidePage,
  ExaminerGuidePage,
  LoginPage,
  LogoutPage,
  SignUpPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  DashboardPage,
  AllQuestionPage,
  MyQuestionPage,
  AddQuestionPage,
  MyAllExamPage,
  CreateExamOptionPage,
  CreateExamWithSelectedQuestionPage,
  CreateExamWithRandomQuestionPage,
  ExamDetailPage,
  AttendeeAttendExamDetailPage,
  CheckStartExamPage,
  CheckExamStatusPage,
  RegisterAttendExamPage,
  WelcomeAttendExamPage,
  AttendExamDetailPage,
  AttendQuestionEditorPage,
  AttendExamEndPage,
  NotFoundPage,
} from "../pages";
import ProtectRoute from "./ProtectRoute";
import AuthorOnlyRoute from "./AuthorOnlyRoute";
import ExaminerOnlyRoute from "./ExaminerOnlyRoute";
import AttendeeOnlyRoute from "./AttendeeOnlyRoute";
import { getCurrentUser } from "../store/authSlice";
import AddHeaderFooter from "./AddHeaderFooter";
import AttendQuestionEditorNew from "../components/Attend/AttendQuestionEditorNew";
import EditExam from "../components/Exam/EditExam";

const ThemeRoutes = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const GetUser = useCallback(async () => {
    await getCurrentUser(dispatch);
  }, [dispatch]);

  useEffect(() => {
    GetUser();
  }, [GetUser]);

  return (
    <Routes>
      {/* All Users */}
      {/* public routes */}

      <Route
        path="/"
        exact
        element={
          <AddHeaderFooter>
            <HomePage />
          </AddHeaderFooter>
        }
      />
      <Route
        path="/candidate_guide"
        exact
        element={
          <AddHeaderFooter>
            <CandidateGuidePage />
          </AddHeaderFooter>
        }
      />
      <Route
        path="/examiner_guide"
        exact
        element={
          <AddHeaderFooter>
            <ExaminerGuidePage />
          </AddHeaderFooter>
        }
      />

      <Route path="/auth/">
        <Route
          path="/auth/signup"
          element={
            <AddHeaderFooter>
              <SignUpPage />
            </AddHeaderFooter>
          }
        />
        <Route
          path="/auth/login"
          element={
            <AddHeaderFooter>
              <LoginPage />
            </AddHeaderFooter>
          }
        />
        <Route
          path="/auth/forgot_password"
          element={
            <AddHeaderFooter>
              <ForgotPasswordPage />
            </AddHeaderFooter>
          }
        />
        <Route
          path="/auth/reset_password/:uid/:token"
          element={
            <AddHeaderFooter>
              <ResetPasswordPage />
            </AddHeaderFooter>
          }
        />
        <Route path="/auth/logout" element={<LogoutPage />} />
      </Route>

      {/* protected route */}
      <Route path="/account/">
        <Route
          path="/account/dashboard"
          element={
            <ProtectRoute user={user}>
              <AddHeaderFooter siderBar={true}>
                <DashboardPage />
              </AddHeaderFooter>
            </ProtectRoute>
          }
        />
        <Route
          path="/account/profile"
          element={
            <ProtectRoute user={user}>
              <AddHeaderFooter siderBar={true}>
                <ProfilePage />
              </AddHeaderFooter>
            </ProtectRoute>
          }
        />
      </Route>

      {/* question routes */}
      <Route path="/question/">
        <Route
          path="/question/all_question"
          element={
            <ExaminerOnlyRoute user={user}>
              <AddHeaderFooter siderBar={true}>
                <AllQuestionPage />
              </AddHeaderFooter>
            </ExaminerOnlyRoute>
          }
        />
        <Route
          path="/question/my_question"
          element={
            <AuthorOnlyRoute user={user}>
              <AddHeaderFooter siderBar={true}>
                <MyQuestionPage />
              </AddHeaderFooter>
            </AuthorOnlyRoute>
          }
        />
        <Route
          path="/question/add_question"
          element={
            <AuthorOnlyRoute user={user}>
              <AddHeaderFooter siderBar={true}>
                <AddQuestionPage />
              </AddHeaderFooter>
            </AuthorOnlyRoute>
          }
        />
      </Route>

      {/* examiner only routes */}
      <Route path="/exam/">
        <Route
          path="/exam/all_exam"
          element={
            <ExaminerOnlyRoute user={user}>
              <AddHeaderFooter siderBar={true}>
                <MyAllExamPage />
              </AddHeaderFooter>
            </ExaminerOnlyRoute>
          }
        />
        <Route
          path="/exam/create_exam_option"
          element={
            <ExaminerOnlyRoute user={user}>
              <AddHeaderFooter siderBar={true}>
                <CreateExamOptionPage />
              </AddHeaderFooter>
            </ExaminerOnlyRoute>
          }
        />
        <Route
          path="/exam/create_exam_with_selected_question"
          element={
            <ExaminerOnlyRoute user={user}>
              <AddHeaderFooter siderBar={true}>
                <CreateExamWithSelectedQuestionPage />
              </AddHeaderFooter>
            </ExaminerOnlyRoute>
          }
        />
        <Route
          path="/exam/create_exam_with_random_question"
          element={
            <ExaminerOnlyRoute user={user}>
              <AddHeaderFooter siderBar={true}>
                <CreateExamWithRandomQuestionPage />
              </AddHeaderFooter>
            </ExaminerOnlyRoute>
          }
        />
        <Route
          path="/exam/exam_detail/:id"
          element={
            <ExaminerOnlyRoute user={user}>
              <AddHeaderFooter siderBar={true}>
                <ExamDetailPage />
              </AddHeaderFooter>
            </ExaminerOnlyRoute>
          }
        />
        <Route
          path="/exam/exam_detail/:id/edit"
          element={
            <ExaminerOnlyRoute user={user}>
              <AddHeaderFooter siderBar={true}>
                <EditExam />
              </AddHeaderFooter>
            </ExaminerOnlyRoute>
          }
        />
        <Route
          path="/exam/attendee_attend_exam_detail/:id"
          element={
            <ExaminerOnlyRoute user={user}>
              <AddHeaderFooter siderBar={true}>
                <AttendeeAttendExamDetailPage />
              </AddHeaderFooter>
            </ExaminerOnlyRoute>
          }
        />
      </Route>

      {/* attend Exam routes */}
      <Route path="/attend_exam/">
        <Route
          path="/attend_exam/check_start_exam/:id"
          element={<CheckStartExamPage />}
        />
        <Route
          path="/attend_exam/check_exam_status/:id"
          element={<CheckExamStatusPage />}
        />
        <Route
          path="/attend_exam/register_attend_exam/:id"
          element={<RegisterAttendExamPage />}
        />
      </Route>

      {/* attendee only routes */}
      <Route path="/attend/">
        <Route
          path="/attend/welcome_attend_exam/:id"
          element={<WelcomeAttendExamPage />}
        />
        <Route
          path="/attend/attend_exam_detail/:id"
          element={
            <AttendeeOnlyRoute>
              <AttendExamDetailPage />
            </AttendeeOnlyRoute>
          }
        />
        <Route
          path="/attend/attend_question_editor/:id"
          element={
            <AttendeeOnlyRoute>
              {/* <AttendQuestionEditorPage /> */}
              <AttendQuestionEditorNew />
            </AttendeeOnlyRoute>
          }
        />
        <Route
          path="/attend/attend_exam_end/:id"
          element={
            <AttendeeOnlyRoute sessionReader={false}>
              <AttendExamEndPage />
            </AttendeeOnlyRoute>
          }
        />
      </Route>

      {/* <Route path="*" element={<Navigate to="/auth/login" replace />} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default ThemeRoutes;

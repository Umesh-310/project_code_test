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

      <Route path="/" exact element={<HomePage />} />
      <Route path="/candidate_guide" exact element={<CandidateGuidePage />} />
      <Route path="/examiner_guide" exact element={<ExaminerGuidePage />} />

      <Route path="/auth/">
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/forgot_password" element={<ForgotPasswordPage />} />
        <Route
          path="/auth/reset_password/:uid/:token"
          element={<ResetPasswordPage />}
        />
        <Route path="/auth/logout" element={<LogoutPage />} />
      </Route>

      {/* protected route */}
      <Route path="/account/">
        <Route
          path="/account/dashboard"
          element={
            <ProtectRoute user={user}>
              <DashboardPage />
            </ProtectRoute>
          }
        />
        <Route
          path="/account/profile"
          element={
            <ProtectRoute user={user}>
              <ProfilePage />
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
              <AllQuestionPage />
            </ExaminerOnlyRoute>
          }
        />
        <Route
          path="/question/my_question"
          element={
            <AuthorOnlyRoute user={user}>
              <MyQuestionPage />
            </AuthorOnlyRoute>
          }
        />
        <Route
          path="/question/add_question"
          element={
            <AuthorOnlyRoute user={user}>
              <AddQuestionPage />
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
              <MyAllExamPage />
            </ExaminerOnlyRoute>
          }
        />
        <Route
          path="/exam/create_exam_option"
          element={
            <ExaminerOnlyRoute user={user}>
              <CreateExamOptionPage />
            </ExaminerOnlyRoute>
          }
        />
        <Route
          path="/exam/create_exam_with_selected_question"
          element={
            <ExaminerOnlyRoute user={user}>
              <CreateExamWithSelectedQuestionPage />
            </ExaminerOnlyRoute>
          }
        />
        <Route
          path="/exam/create_exam_with_random_question"
          element={
            <ExaminerOnlyRoute user={user}>
              <CreateExamWithRandomQuestionPage />
            </ExaminerOnlyRoute>
          }
        />
        <Route
          path="/exam/exam_detail/:id"
          element={
            <ExaminerOnlyRoute user={user}>
              <ExamDetailPage />
            </ExaminerOnlyRoute>
          }
        />
        <Route
          path="/exam/attendee_attend_exam_detail/:id"
          element={
            <ExaminerOnlyRoute user={user}>
              <AttendeeAttendExamDetailPage />
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
              <AttendQuestionEditorPage />
            </AttendeeOnlyRoute>
          }
        />
        <Route
          path="/attend/attend_exam_end/:id"
          element={
            <AttendeeOnlyRoute>
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

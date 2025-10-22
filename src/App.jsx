import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";

import AdminJobList from "./pages/Admin/JobList";
import AdminManageJob from "./pages/Admin/ManageJob";

import ApplicantJobList from "./pages/Applicant/JobList";
import ApplyJob from "./pages/Applicant/ApplyJob";
import ApplySuccess from "./pages/Applicant/ApplySuccess";

import NotFound from "./pages/NotFound";

export default function App() {
  const location = useLocation();

  const hideNavbarPaths = ["/apply-success", "/login"];
  const isApplyPage = /^\/apply\/\d+$/i.test(location.pathname);

  const shouldHideNavbar =
    hideNavbarPaths.includes(location.pathname) || isApplyPage;

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminJobList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminManageJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <ApplicantJobList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply/:id"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <ApplyJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply-success"
          element={
            <ProtectedRoute allowedRoles={["applicant"]}>
              <ApplySuccess />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

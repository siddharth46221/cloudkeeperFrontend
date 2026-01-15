import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Users } from "../Dashboards/User/Users";
import { Dashboard } from "../Components/MainDashboard/MainDashboard";
import { Onboarding } from "../Dashboards/Onboarding/Onboarding";
import { InitialOnboarding } from "../Dashboards/Onboarding/InitialOnboarding";
import { CostExploror } from "../Dashboards/CostExploror/CostExploror";
import { AwsServices } from "../Dashboards/AwsServices/AwsServices";
import { Login } from "../Pages/Login/Login";
import { AddUser } from "../Pages/UserManagement/AddUser/AddUser";
import { EditUser } from "../Pages/UserManagement/EditUser/EditUser";
import { Step1 } from "../Pages/Onboarding/Steps/Step1";
import { Step2 } from "../Pages/Onboarding/Steps/Step2";
import { Step3 } from "../Pages/Onboarding/Steps/Step3";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "../Utils/ProtectedRout";

export const AppRouter = () => {
  const role = useSelector((state) => state.UserData.value?.role);
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route
          index
          element={
            <Navigate
              to={
                role === "ADMIN" || role === "READONLY"
                  ? "users"
                  : "cost-explorer"
              }
              replace
            />
          }
        />

        <Route
          path="users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "READONLY"]}>
              <Users />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="users/addUser"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="users/editUser"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <EditUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="initial-onboarding"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN", "READONLY"]}
            >
              <InitialOnboarding />
            </ProtectedRoute>
          }
        />

        <Route
          path="onboarding"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Onboarding />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="step1" replace />} />
          <Route path="step1" element={<Step1 />} />
          <Route path="step2" element={<Step2 />} />
          <Route path="step3" element={<Step3 />} />
        </Route>

        <Route
          path="cost-explorer"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "READONLY", "CUSTOMER"]}>
              <CostExploror />
            </ProtectedRoute>
          }
        />
        <Route
          path="aws-services"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "CUSTOMER"]}>
              <AwsServices />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Users } from "../Dashboards/User/Users";
import { Dashboard } from "../Components/MainDashboard/MainDashboard";
import { Onboarding } from "../Dashboards/Onboarding/Onboarding";
import {InitialOnboarding} from "../Dashboards/Onboarding/InitialOnboarding"
import { CostExploror } from "../Dashboards/CostExploror/CostExploror";
import { AwsServices } from "../Dashboards/AwsServices/AwsServices";
import { Login } from "../Pages/Login/Login";
import { AddUser } from "../Pages/UserManagement/AddUser/AddUser";
import { EditUser } from "../Pages/UserManagement/EditUser/EditUser";
import { Step1 } from "../Pages/Onboarding/Steps/Step1";
import { Step2 } from "../Pages/Onboarding/Steps/Step2";
import { Step3 } from "../Pages/Onboarding/Steps/Step3";
import { Navigate } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Navigate to="users" replace />} />

        <Route path="users" element={<Users />}></Route>
        <Route path="users/addUser" element={<AddUser />} />
        <Route path="users/editUser" element={<EditUser />} />

        <Route path="initial-onboarding" element={<InitialOnboarding />} />

      
        <Route path="onboarding" element={<Onboarding />}>
          <Route index element={<Navigate to="step1" replace />} />
          <Route path="step1" element={<Step1 />} />
          <Route path="step2" element={<Step2 />} />
          <Route path="step3" element={<Step3 />} />
        </Route>

        <Route path="cost-explorer" element={<CostExploror />} />
        <Route path="aws-services" element={<AwsServices />} />
      </Route>
    </Routes>
  );
};

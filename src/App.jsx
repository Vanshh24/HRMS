import Dashboard from "./component/admin/Dashboard";
import Employees from "./component/admin/pages/Employees";
import Panel from "./component/admin/Panel";
import Login from "./component/loginPage/Login";
import SignUp from "./component/signupPage/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./component/RequireAuth";
import Attendance from "./component/admin/pages/Attendance";
import MyProfile from "./component/MyProfile";
import Setting from "./component/Setting";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <Panel />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

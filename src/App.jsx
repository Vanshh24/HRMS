import Dashboard from "./component/admin/Dashboard";
import Employees from "./component/admin/pages/Employees";
import Panel from "./component/admin/Panel";
import Login from "./component/loginPage/Login";
import SignUp from "./component/signupPage/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./component/RequireAuth";
import Attendance from "./component/admin/pages/Attendance";

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
        />
        <Route path="/admin" element={<Panel />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

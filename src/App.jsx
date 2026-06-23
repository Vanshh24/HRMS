import Dashboard from "./component/admin/Dashboard"
import Employees from "./component/admin/pages/Employees";
import LeaveRequest from "./component/admin/pages/LeaveRequest";
import Panel from "./component/admin/Panel";
import Login from "./component/loginPage/Login";
import SignUp from "./component/signupPage/Signup";
import Attendence from "./component/admin/pages/Attendence";
import Payroll from "./component/admin/pages/Payroll";
import Performance from "./component/admin/pages/Performance";
import Reports from "./component/admin/pages/Reports";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<Panel />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="leave/request" element={<LeaveRequest />} />
            <Route path="attendence" element={<Attendence />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="performance" element={<Performance />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

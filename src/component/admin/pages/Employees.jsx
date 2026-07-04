// TODO: Add forgot password in Create Account modal.

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmployeeTable from "../../../components/ui/EmployeeTable";
import { employeeFields } from "../../../constants/employeeFields";
import EmployeeFormDialog from "../../../components/ui/EmployeeFormDialog";
import CreateAccountDialog from "../../../components/ui/CreateAccountDialog";

let baseEmpUrl = import.meta.env.VITE_BASE_EMP_URL;
let baseUrl = import.meta.env.VITE_BASE_URL;

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [formError, setFormError] = useState({});
  const [accountModal, setAccountModal] = useState(false);
  const [accountData, setAccountData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  useEffect(() => {
    axios
      .get(`${baseEmpUrl}/get/employees`)
      .then((res) => {
        let { data } = res.data;
        setEmployees(data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleValidate = () => {
    const formError = {};

    employeeFields.forEach(({ name, label }) => {
      if (!formData[name]) {
        formError[name] = `${label} is required.`;
      }
    });
    setFormError(formError);

    return Object.keys(formError).length === 0;
  };
  let fetchEmployees = async () => {
    try {
      let res = await axios.get(`${baseEmpUrl}/get/employees`);
      setEmployees(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitEmployee = async () => {
    if (!handleValidate()) return;

    try {
      if (formData._id) {
        await axios.put(`${baseEmpUrl}/update/by-id/${formData._id}`, formData);
      } else {
        await axios.post(`${baseEmpUrl}/post/employee`, formData);
      }
      await fetchEmployees();
      alert("Record created successfully.");
      setFormData({});
      setFormError({});
      setOpenModal(false);
    } catch (err) {
      console.log(err.response?.data || err);
      alert(err.response?.data?.message);
    }
  };
  const deleteEmployee = async (id) => {
    try {
      let res = await axios.delete(`${baseEmpUrl}/delete/by-id/${id}`);

      alert(res.data.message);

      let updatedEmployees = employees.filter((emp) => emp._id !== id);
      setEmployees(updatedEmployees);
    } catch (err) {
      console.log(err);
    }
  };
  const editEmployee = (emp) => {
    setFormData({
      _id: emp._id,
      id: emp.employeeID,
      name: emp.employeeName,
      email: emp.employeeEmail,
      phone: emp.employeePhoneNumber,
      address: emp.employeeAddress,
      dob: emp.employeeDOB,
      doj: emp.employeeDOJ,
      department: emp.employeeDepartment,
      designation: emp.employeeDesignation,
    });
    setOpenModal(true);
  };
  const createEmployeeAccount = async () => {
    if (accountData.password !== accountData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const res = await axios.post(`${baseUrl}/signup`, {
        name: accountData.name,
        email: accountData.email,
        password: accountData.password,
        confirmPassword: accountData.confirmPassword,
      });

      alert(res.data.message);

      setAccountModal(false);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };
  const openCreateAccountModal = (emp) => {
    setAccountData({
      name: emp.employeeName,
      email: emp.employeeEmail,
      password: "",
      confirmPassword: "",
      role: "Employee",
    });

    setAccountModal(true);
  };
  const handleAccountChange = (e) => {
    const { name, value } = e.target;

    setAccountData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Employee Management</CardTitle>
          <CardDescription>Add and manage employees</CardDescription>
          <CardAction>
            <button
              onClick={() => {
                setFormData({});
                setFormError({});
                setOpenModal(true);
              }}
              className="h-10 w-40 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
            >
              Add Employee
            </button>
          </CardAction>
        </CardHeader>
        <EmployeeTable
          employees={employees}
          editEmployee={editEmployee}
          deleteEmployee={deleteEmployee}
          openCreateAccountModal={openCreateAccountModal}
        />
        <CardFooter>Employee List</CardFooter>
      </Card>
      <EmployeeFormDialog
        openModal={openModal}
        setOpenModal={setOpenModal}
        formData={formData}
        submitEmployee={submitEmployee}
        formError={formError}
        handleChange={handleChange}
      />
      <CreateAccountDialog
        accountModal={accountModal}
        setAccountModal={setAccountModal}
        accountData={accountData}
        handleAccountChange={handleAccountChange}
        createEmployeeAccount={createEmployeeAccount}
      />
    </>
  );
}

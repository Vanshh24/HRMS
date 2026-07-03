// TODO: Add forgot password in Create Account modal.

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

let baseEmpUrl = import.meta.env.VITE_BASE_EMP_URL;
let baseUrl = import.meta.env.VITE_BASE_URL;

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formError, setFormError] = useState({});
  const [accountModal, setAccountModal] = useState(false);
  const [accountData, setAccountData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [selectedEmployee, setSelectedEmployee] = useState(null);

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

    if (!formData.id) formError.id = "Employee ID is required";
    if (!formData.name) formError.name = "Employee Name is required";
    if (!formData.email) formError.email = "Email is required";
    if (!formData.phone) formError.phone = "Phone Number is required";
    if (!formData.address) formError.address = "Address is required";

    if (!formData.dob) formError.dob = "Date of Birth is required";

    if (!formData.doj) formError.doj = "Joining Date is required";

    if (!formData.department) formError.department = "Department is required";

    if (!formData.designation)
      formError.designation = "Designation is required";

    setFormError(formError);

    return Object.keys(formError).length === 0;
  };

  const submitEmployee = async () => {
    if (!handleValidate()) return;

    try {
      let res;

      if (editIndex !== null) {
        res = await axios.put(
          `${baseEmpUrl}/update/by-id/${formData._id}`,
          formData,
        );

        const updatedEmployees = [...employees];
        updatedEmployees[editIndex] = res.data.data;
        setEmployees(updatedEmployees);
        setEditIndex(null);
      } else {
        res = await axios.post(`${baseEmpUrl}/post/employee`, formData);

        setEmployees([...employees, res.data.data]);
      }

      alert(res.data.message || "Success");

      setFormData({});
      setFormError({});
      setOpenModal(false);
    } catch (err) {
      console.log(err.response?.data || err);
      alert(err.response?.data?.message || "Something went wrong");
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

  const editEmployee = (index) => {
    const emp = employees[index];

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

    setEditIndex(index);
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
    setSelectedEmployee(emp);

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
                setEditIndex(null);
                setOpenModal(true);
              }}
              className="h-10 w-40 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
            >
              Add Employee
            </button>
          </CardAction>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <table className="border-collapse border border-gray-400 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Emp Id</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Phone</th>
                <th className="border border-gray-300 p-2">Address</th>
                <th className="border border-gray-300 p-2">DOB</th>
                <th className="border border-gray-300 p-2">Joining Date</th>
                <th className="border border-gray-300 p-2">Designation</th>
                <th className="border border-gray-300 p-2">Department</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    {emp.employeeID}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {emp.employeeName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {emp.employeeEmail}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {emp.employeePhoneNumber}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {emp.employeeAddress}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {emp.employeeDOB}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {emp.employeeDOJ}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {emp.employeeDesignation}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {emp.employeeDepartment}
                  </td>
                  <td className="border border-gray-300 p-2 flex gap-2">
                    <button
                      onClick={() => editEmployee(index)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteEmployee(emp._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => openCreateAccountModal(emp)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Create Account
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>

        <CardFooter>Employee List</CardFooter>
      </Card>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="h-150 overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Employee Form</DialogTitle>

            <DialogDescription>employee form</DialogDescription>
            {[
              ["id", "Employee Id"],
              ["name", "Name"],
              ["email", "Email"],
              ["phone", "Phone"],
              ["address", "Address"],
              ["dob", "Date of Birth"],
              ["doj", "Joining Date"],
              ["department", "Department"],
              ["designation", "Designation"],
            ].map(([name, label]) => (
              <div key={name} className="mb-3">
                <label className="block text-amber-700 text-xl text-center">
                  {label}
                </label>

                {["dob", "doj"].includes(name) ? (
                  <input
                    type="date"
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    className="w-full border-2 text-center rounded-2xl p-2"
                  />
                ) : (
                  <input
                    type="text"
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    placeholder={`Enter Employee ${label}`}
                    className="w-full border-2 text-center rounded-2xl p-2"
                  />
                )}
                {formError?.[name] && (
                  <p className="text-red-500 text-sm mt-1">{formError[name]}</p>
                )}
              </div>
            ))}

            <div className="flex justify-center gap-5 mt-5">
              <button
                onClick={submitEmployee}
                className="h-10 w-32 bg-red-600 text-white rounded-3xl border-2"
              >
                {editIndex != null ? "Update" : "Submit"}
              </button>

              <button
                onClick={() => setOpenModal(false)}
                className="h-10 w-32 bg-blue-800 text-white rounded-3xl border-2"
              >
                Close
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={accountModal} onOpenChange={setAccountModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Employee Account</DialogTitle>
            <DialogDescription>
              Create login credentials for the employee.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label className="block mb-1">Employee Name</label>
              <input
                type="text"
                name="name"
                value={accountData.name}
                onChange={handleAccountChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block mb-1">Employee Email</label>
              <input
                type="email"
                name="email"
                value={accountData.email}
                onChange={handleAccountChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={accountData.password}
                onChange={handleAccountChange}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={accountData.confirmPassword}
                onChange={handleAccountChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1">Role</label>
              <input
                type="text"
                name="role"
                value={accountData.role}
                onChange={handleAccountChange}
                placeholder="Enter role (e.g. admin, employee)"
                className="w-full border rounded p-2"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setAccountModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={createEmployeeAccount}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Create Account
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

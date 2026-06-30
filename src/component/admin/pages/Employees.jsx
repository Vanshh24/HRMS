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

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formError, setFormError] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/employee_route/api/get/employees")
      .then((res) => {
        let { success, message, data } = res.data;
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

    if (!formData.empid) formError.empid = "Employee ID is required";
    if (!formData.empname) formError.empname = "Employee Name is required";
    if (!formData.email) formError.email = "Email is required";
    if (!formData.phone) formError.phone = "Phone Number is required";
    if (!formData.address) formError.address = "Address is required";

    if (!formData.date_of_birth)
      formError.date_of_birth = "Date of Birth is required";

    if (!formData.date_of_join)
      formError.date_of_join = "Joining Date is required";

    if (!formData.department) formError.department = "Department is required";

    if (!formData.designation)
      formError.designation = "Designation is required";

    setFormError(formError);

    return Object.keys(formError).length === 0;
  };

  const submitEmployee = async () => {
    if (!handleValidate()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/employee_route/api/post/employee",
        formData,
      );

      console.log("Full response:", res.data);

      if (res.data.success) {
        alert("User Data saved");

        if (editIndex !== null) {
          const updatedEmployees = [...employees];
          updatedEmployees[editIndex] = formData;
          setEmployees(updatedEmployees);
          setEditIndex(null);
        } else {
          setEmployees([...employees, formData]);
        }

        setFormData({});
        setFormError({});
        setOpenModal(false);
      }
    } catch (err) {
      console.log(err.response?.data || err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const deleteEmployee = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  const editEmployee = (index) => {
    setFormData(employees[index]);
    setEditIndex(index);
    setOpenModal(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Employee Management</CardTitle>
          <CardDescription>Add and manage employees</CardDescription>

          <CardAction>
            <button
              onClick={() => setOpenModal(true)}
              className="h-10 w-40 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
            >
              Add Employee
            </button>
          </CardAction>
        </CardHeader>

        <CardContent>
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
                    {emp.employeePhone}
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
                    {emp.employeeDesignation}
                  </td>
                  <td className="border border-gray-300 p-2 flex gap-2">
                    <button
                      onClick={() => {
                        editEmployee(index);
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteEmployee(index)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
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
              ["empid", "Employee Id"],
              ["empname", "Name"],
              ["email", "Email"],
              ["phone", "Phone"],
              ["address", "Address"],
              ["date_of_birth", "Date of Birth"],
              ["date_of_join", "Joining Date"],
              ["department", "Department"],
              ["designation", "Designation"],
            ].map(([name, label]) => (
              <div key={name} className="mb-3">
                <label className="block text-amber-700 text-xl text-center">
                  {label}
                </label>

                {["date_of_birth", "date_of_join"].includes(name) ? (
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
                {/* Error Message */}
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
    </>
  );
}

import {
  CardContent,
} from "@/components/ui/card";

export default function EmployeeTable({
  employees,
  editEmployee,
  deleteEmployee,
  openCreateAccountModal,
}) {
  return (
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
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td className="border border-gray-300 p-2">{emp.employeeID}</td>
              <td className="border border-gray-300 p-2">{emp.employeeName}</td>
              <td className="border border-gray-300 p-2">
                {emp.employeeEmail}
              </td>
              <td className="border border-gray-300 p-2">
                {emp.employeePhoneNumber}
              </td>
              <td className="border border-gray-300 p-2">
                {emp.employeeAddress}
              </td>
              <td className="border border-gray-300 p-2">{emp.employeeDOB}</td>
              <td className="border border-gray-300 p-2">{emp.employeeDOJ}</td>
              <td className="border border-gray-300 p-2">
                {emp.employeeDesignation}
              </td>
              <td className="border border-gray-300 p-2">
                {emp.employeeDepartment}
              </td>
              <td className="border border-gray-300 p-2 flex gap-2">
                <button
                  onClick={() => editEmployee(emp)}
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
  );
}

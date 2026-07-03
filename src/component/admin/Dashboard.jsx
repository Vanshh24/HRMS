import { useState, useEffect } from "react";
import axios from "axios";
let baseEmpUrl = import.meta.env.VITE_BASE_EMP_URL;

export default function Dashboard() {
  let [empFormData, setEmpFormData] = useState([]);
  let [employeeCount, setEmployeeCount] = useState(0);
  let [recentHires, setRecentHires] = useState([]);
  useEffect(() => {
    Promise.all([
      axios.get(`${baseEmpUrl}/get/employees`),
      axios.get(`${baseEmpUrl}/get/recent-hires`),
    ])
      .then(([res, recentHiresRes]) => {
        setEmpFormData(res.data.data);
        setEmployeeCount(res.data.count);
        setRecentHires(recentHiresRes.data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);
  return (
    <>
      <main className="space-y-6">
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Welcome to HRMS Dashboard
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Manage employees, attendance, payroll, and HR workflows from one
                place.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm text-slate-700">
              Live overview
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { title: "Total Employees", value: employeeCount },
            { title: "Pending Leave", value: "12" },
            { title: "Attendance Today", value: "220" },
            { title: "Payroll Due", value: "3" },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <h4 className="text-sm font-medium text-slate-500">
                {card.title}
              </h4>
              <p className="mt-4 text-3xl font-semibold text-slate-900">
                {card.value}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Recent Hires
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {recentHires.map((emp, index) => (
                <li key={index} className="rounded-2xl bg-slate-50 px-4 py-3">
                  {emp.employeeName}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Urgent Actions
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="rounded-2xl bg-slate-50 px-4 py-3">
                Approve leave requests
              </li>
              <li className="rounded-2xl bg-slate-50 px-4 py-3">
                Review attendance exceptions
              </li>
              <li className="rounded-2xl bg-slate-50 px-4 py-3">
                Finalize payroll report
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

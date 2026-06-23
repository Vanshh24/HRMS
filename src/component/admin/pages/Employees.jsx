import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function Employees() {
  let [empData, setEmpData] = useState({});
  let [empFormData, setEmpFormData] = useState({});
  let handleChange = (e) => {
    let { name, value } = e.target;
    setEmpFormData({ ...empFormData, [name]: value });
    console.log(empData);
  };
  let handleSubmit = () => {};
  let [openModal, setOpenModal] = useState(false);
  let [openEditModal, setOpenEditModal] = useState(false);
  let handleClick = () => {
    setEmpFormData(empFormData);
    setOpenModal(false);
  };
  let handleEditClick = () => {
    setEmpFormData(empData);
    setOpenEditModal(false);
  };

  return (
    <div>
      <Dialog open={openModal} onOpenChange={() => setOpenModal(true)}>
        <div className="text-right">
          <DialogContent className="scrollbar-auto">
            <DialogHeader>
              <DialogTitle>Employee Form</DialogTitle>
              <DialogDescription>
                <label className="font-bold">Emp id</label>
                <input
                  className="w-full h-8 border-2 border-black rounded"
                  type="text"
                  placeholder="Enter the Employee ID"
                  name="id"
                  defaultValue={empFormData.id}
                  onChange={handleChange}
                />

                <label className="font-bold mb-5">Name</label>
                <input
                  className="w-full h-8 border-2 border-black rounded"
                  type="text"
                  placeholder="Enter the Employee name"
                  name="name"
                  defaultValue={empFormData.name}
                  onChange={handleChange}
                />

                <label className="font-bold mb-5">Email</label>
                <input
                  className="w-full h-8 border-2 border-black rounded"
                  type="email"
                  placeholder="Enter the Employee email"
                  name="email"
                  defaultValue={empFormData.email}
                  onChange={handleChange}
                />

                <label className="font-bold mb-5">Phone no.</label>
                <input
                  className="w-full h-8 border-2 border-black rounded"
                  type="tel"
                  placeholder="Enter the phone no."
                  name="phone"
                  defaultValue={empFormData.phone}
                  onChange={handleChange}
                />
                <label className="font-bold mb-5">Emp Address</label>
                <input
                  className="w-full h-8 border-2 border-black rounded"
                  type="text"
                  placeholder="Enter the Employee address"
                  name="address"
                  defaultValue={empFormData.address}
                  onChange={handleChange}
                />

                <label className="font-bold mb-5">Date of birth</label>
                <input
                  className="w-full h-8 border-2 border-black rounded"
                  type="date"
                  placeholder="Enter the date of birth"
                  name="dob"
                  defaultValue={empFormData.dob}
                  onChange={handleChange}
                />

                <label className="font-bold mb-5">Joining Date</label>
                <input
                  className="w-full h-8 border-2 border-black rounded"
                  type="date"
                  placeholder="Enter the Employee joining date"
                  name="joiningDate"
                  defaultValue={empFormData.doj}
                  onChange={handleChange}
                />
                <label className="font-bold mb-5">Emp Department</label>
                <input
                  className="w-full h-8 border-2 border-black rounded"
                  type="text"
                  placeholder="Enter the Employee emp department"
                  name="department"
                  defaultValue={empFormData.department}
                  onChange={handleChange}
                />

                <label className="font-bold mb-5">Designation</label>
                <input
                  className="w-full h-8 border-2 border-black rounded"
                  type="text"
                  placeholder="Enter the Employee email"
                  name="designation"
                  defaultValue={empFormData.designation}
                  onChange={handleChange}
                />
                <div>
                  <button
                    className="text-white bg-red-500 rounded-3xl p-3 m-3"
                    onClick={() => {
                      setOpenModal(false);
                    }}
                  >
                    close
                  </button>
                  <button
                    className="text-white bg-blue-600 rounded-3xl p-3"
                    onClick={handleClick}
                  >
                    submit
                  </button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Employees</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>
              <DialogTrigger className="h-13 w-50 border-2 text-white bg-blue-600 rounded-2xl">
                Add Employee
              </DialogTrigger>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>
              {/* Table component */}
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Emp ID</TableHead>
                    <TableHead>Employee Name</TableHead>
                    <TableHead>Employee E-mail</TableHead>
                    <TableHead>Employee Address</TableHead>
                    <TableHead>Phone no.</TableHead>
                    <TableHead>DOB</TableHead>
                    <TableHead>Date of Joining</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">{empData.id}</TableCell>
                    <TableCell>{empData.name}</TableCell>
                    <TableCell>{empData.email}</TableCell>
                    <TableCell>{empData.address}</TableCell>
                    <TableCell>{empData.phone}</TableCell>
                    <TableCell>{empData.dob}</TableCell>
                    <TableCell>{empData.doj}</TableCell>
                    <TableCell>{empData.department}</TableCell>
                    <TableCell>
                      <DialogTrigger className="h-13 w-25 border-2 text-white bg-blue-600 rounded-2xl">
                        Edit
                      </DialogTrigger>
                      <button>Delete</button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </p>
          </CardContent>

          {/* eidt employee record modal */}
          <div className="text-right">
            <Dialog open={openEditModal}>
              <DialogContent className="scrollbar-auto">
                <DialogHeader>
                  <DialogTitle>Edit Employee Form</DialogTitle>
                  <DialogDescription>
                    <label className="font-bold">Emp id</label>
                    <input
                      className="w-full h-8 border-2 border-black rounded"
                      type="text"
                      placeholder="Enter the Employee ID"
                      name="id"
                      onChange={handleChange}
                    />

                    <label className="font-bold mb-5">Name</label>
                    <input
                      className="w-full h-8 border-2 border-black rounded"
                      type="text"
                      placeholder="Enter the Employee name"
                      name="name"
                      onChange={handleChange}
                    />

                    <label className="font-bold mb-5">Email</label>
                    <input
                      className="w-full h-8 border-2 border-black rounded"
                      type="email"
                      placeholder="Enter the Employee email"
                      name="email"
                      onChange={handleChange}
                    />

                    <label className="font-bold mb-5">Phone no.</label>
                    <input
                      className="w-full h-8 border-2 border-black rounded"
                      type="tel"
                      placeholder="Enter the phone no."
                      name="phone"
                      onChange={handleChange}
                    />
                    <label className="font-bold mb-5">Emp Address</label>
                    <input
                      className="w-full h-8 border-2 border-black rounded"
                      type="text"
                      placeholder="Enter the Employee address"
                      name="address"
                      onChange={handleChange}
                    />

                    <label className="font-bold mb-5">Date of birth</label>
                    <input
                      className="w-full h-8 border-2 border-black rounded"
                      type="date"
                      placeholder="Enter the date of birth"
                      name="dob"
                      onChange={handleChange}
                    />

                    <label className="font-bold mb-5">Joining Date</label>
                    <input
                      className="w-full h-8 border-2 border-black rounded"
                      type="date"
                      placeholder="Enter the Employee joining date"
                      name="joiningDate"
                      onChange={handleChange}
                    />
                    <label className="font-bold mb-5">Emp Department</label>
                    <input
                      className="w-full h-8 border-2 border-black rounded"
                      type="text"
                      placeholder="Enter the Employee emp department"
                      name="department"
                      onChange={handleChange}
                    />

                    <label className="font-bold mb-5">Designation</label>
                    <input
                      className="w-full h-8 border-2 border-black rounded"
                      type="text"
                      placeholder="Enter the Employee email"
                      name="designation"
                      onChange={handleChange}
                    />
                    <div>
                      <button
                        className="text-white bg-red-500 rounded-3xl p-3 m-3"
                        onClick={() => {
                          setOpenEditModal(false);
                        }}
                      >
                        edit
                      </button>
                      <button
                        className="text-white bg-blue-600 rounded-3xl p-3"
                        onClick={handleSubmit}
                      >
                        submit
                      </button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
}

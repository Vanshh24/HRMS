import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { employeeFields } from "../../constants/employeeFields";

export default function EmployeeFormDialog({
  openModal,
  setOpenModal,
  formData,
  submitEmployee,
  formError,
  handleChange,
}) {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="h-150 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Employee Form</DialogTitle>
          <DialogDescription>employee form</DialogDescription>
          {employeeFields.map(({ name, label }) => (
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
              {formData._id ? "Update" : "Submit"}
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
  );
}

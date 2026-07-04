import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CreateAccountDialog({
  accountModal,
  setAccountModal,
  accountData,
  handleAccountChange,
  createEmployeeAccount,
}) {
  return (
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
  );
}

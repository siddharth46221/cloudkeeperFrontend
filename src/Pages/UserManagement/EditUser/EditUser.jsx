import { useNavigate, useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import { CustomForm } from "../../../Components/CustomForm/CustomForm";
import { editUser , allAccounts} from "../UserManagementService";
import AccountTransfer from "../AccountAssignment/AccountTransfer";
import { toast } from "react-toastify";

const editUserField = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter First Name",
    validations: {
      rules: { required: true, maxlength: 30 },
      messages: {
        required: "This field is required",
        maxlength: "First Name cannot exceed 30 characters",
      },
    },
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter Last Name",
    validations: {
      rules: { required: true, maxlength: 30 },
      messages: {
        required: "This field is required",
        maxlength: "Last Name cannot exceed 30 characters",
      },
    },
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter Email ID",
    validations: {
      rules: {
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
      messages: {
        required: "This field is required",
        pattern: "Enter a valid Email",
      },
    },
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    options: [
      { label: "Customer", value: "CUSTOMER" },
      { label: "Admin", value: "ADMIN" },
      { label: "Read Only", value: "READONLY" },
    ],
  },
];

export const EditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [accounts, setAccounts] = useState([]);

  const user = location.state?.user;

  const [selectedRole, setSelectedRole] = useState(user?.role);
  const [assignedAccounts, setAssignedAccounts] = useState(
    user?.accountIds ?? []
  );

  const fieldsWithDefaults = editUserField.map(field => ({
    ...field,
    defaultValue: user?.[field.name] ?? "",
    disabled: field.name === "email",
  }));

useEffect(() => {
  if (selectedRole !== "CUSTOMER") return;

  const loadAccounts = async () => {
    const res = await allAccounts();
    setAccounts(res.data);
  };

  loadAccounts();
}, [selectedRole]);



  async function handleEditUser(formData) {
    const payload = {
      ...formData,
      accountIds: selectedRole === "CUSTOMER" ? assignedAccounts : [],
    };

    try {
      const result = await editUser(user.id, payload);
      if (result === 200) {
        toast.success("User edited successfully!");
        navigate(-1);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  }

  return (
    <div className="w-full h-full bg-gray-200 p-5">
      <div className="text-3xl text-black font-bold tracking-tight">
        <h1>Edit User</h1>
      </div>

      <div className="bg-white w-full m-1 rounded-md flex-col">
        <CustomForm
          fields={fieldsWithDefaults}
          onSubmit={handleEditUser}
          onFieldChange={(name, value) => {
            if (name === "role") {
              setSelectedRole(value);
            }
          }}
          formStyle="p-3.5 grid grid-cols-2 gap-4"
          fieldStyle="flex flex-col"
          labelStyle="font-medium text-m"
          inputStyle="border border-[#dddfe8] p-3 h-11 w-80 rounded-sm text-[#7b7d86]"
        >
          {selectedRole === "CUSTOMER" && (
            <div className="mt-7 ml-3">
              <AccountTransfer
                accounts={accounts}
                initialAssignedAccounts={assignedAccounts}
                setAssignedAccounts={setAssignedAccounts}
              />
            </div>
          )}

          <div className="justify-end col-span-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="h-10 w-32 bg-black text-white font-bold self-end m-3 border rounded"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="h-10 w-40 bg-black text-white font-bold self-end m-3 border rounded"
            >
              EDIT USER
            </button>
          </div>
        </CustomForm>
      </div>
    </div>
  );
};

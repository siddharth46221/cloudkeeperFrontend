import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CustomForm } from "../../../Components/CustomForm/CustomForm";
import { addNewUser, allAccounts } from "../UserManagementService";
import AccountTransfer from "../AccountAssignment/AccountTransfer";
import { toast } from "react-toastify";

const addUserField = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter First Name",
    inputStyle: "",
    validations: {
      rules: {
        required: true,
        maxlength: 30,
      },
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
    labelStyle: "",
    validations: {
      rules: {
        required: true,
        maxlength: 30,
      },
      messages: {
        required: "This field is required",
        maxlength: "First Name cannot exceed 30 characters",
      },
    },
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter Email ID",
    labelStyle: "",
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
      { label: "SELECT", value: "SELECT" },
      { label: "Customer", value: "CUSTOMER" },
      { label: "Admin", value: "ADMIN" },
      { label: "Read Only", value: "READONLY" },
    ],
    wrapperStyle: "bg-purple-50 p-3 rounded-lg",
  },
];

export const AddUser = () => {
  const navigate = useNavigate();
  const [assignedAccounts, setAssignedAccounts] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    allAccounts();
  }, []);

  async function handleAddUser(AddUserData) {
    const payload = {
      ...AddUserData,
      accountIds: selectedRole === "CUSTOMER" ? assignedAccounts : [],
    };

    let result = await addNewUser(payload);
    if (result === 200) {
      toast.success("User added successfully!");
      navigate(-1);
    } else {
      toast.error(result.response.data.message);
    }
  }

  async function fetchAccounts() {
    const res = await allAccounts();
    setAccounts(res.data);
    console.log(res.data);
  }

  return (
    <div className="w-full h-full bg-gray-200 p-5">
      <div className="text-3xl text-black font-bold tracking-tight">
        <h1>Add New User</h1>
      </div>
      <div className="bg-white w-full m-1 rounded-md flex-col">
        <CustomForm
          fields={addUserField}
          onSubmit={handleAddUser}
          onFieldChange={async (name, value) => {
            if (name === "role") {
              setSelectedRole(value);

              if (value === "CUSTOMER") {
                await fetchAccounts();
              }
            }
          }}
          buttonText="Add New User"
          formStyle="p-3.5 grid grid-cols-2 gap-4"
          fieldStyle="flex flex-col"
          labelStyle="font-medium text-m"
          inputStyle="border border-[#dddfe8] p-3 h-11 w-80 rounded-sm text-[#7b7d86]"
          buttonStyle="h-10 w-32 bg-black text-white font-bold self-end m-3 border rounded"
        >
          {(isFormValid) => (
            <>
              {selectedRole === "CUSTOMER" && (
                <div className="mt-7 ml-3">
                  <AccountTransfer
                    accounts={accounts}
                    setAssignedAccounts={setAssignedAccounts}
                  />
                </div>
              )}

              <div className="justify-end">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="h-10 w-32 bg-black text-white font-bold m-3 border rounded"
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`h-10 w-40 font-bold m-3 border rounded
            ${
              isFormValid
                ? "bg-black text-white"
                : "bg-gray-400 cursor-not-allowed text-gray-200"
            }
          `}
                >
                  ADD NEW USER
                </button>
              </div>
            </>
          )}
        </CustomForm>
      </div>
    </div>
  );
};

import { CustomForm } from "../../../Components/CustomForm/CustomForm";
import { addNewUser } from "../UserManagementService";

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
        }
    }
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
        }
    }
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
            pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        },
        messages: {
            required: "This field is required",
            pattern: "Enter a valid Email",
        }
    }
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
    wrapperStyle: "bg-purple-50 p-3 rounded-lg",
  },
];

export const AddUser = () => {

  function handleAddUser(AddUserData) {
    const result= addNewUser(AddUserData);
    console.log("Add User Result:", result);
    
  }

  return (
    <div className="w-full h-full bg-gray-200 p-5">
      <div className="text-3xl text-black font-bold tracking-tight">
        <h1>Add New User</h1>
      </div>
      <div className="bg-white w-full m-1 rounded-md">
        <CustomForm
        fields={addUserField}
        onSubmit={handleAddUser}
        buttonText="Add New User"
        formStyle="p-3.5 grid grid-cols-2 gap-4"
        fieldStyle="flex flex-col"
        labelStyle="font-medium text-m"
        inputStyle="border border-[#dddfe8] p-3 h-11 w-80 rounded-sm text-[#7b7d86]"
        buttonStyle="h-9 w-32 bg-black text-white font-bold ml-[1400px] mt-36"
      />
      </div>
    </div>
  );
};

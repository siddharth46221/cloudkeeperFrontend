import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoCK.svg";
import { CustomForm } from "../../Components/CustomForm/CustomForm";
import { LoginService } from "./LoginService";
import { useDispatch } from "react-redux";
import { userChange } from "../../Redux/UserDataSlice";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Business Email",

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
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",

      validations: {
        rules: {
          required: true,
        },
        messages: {
          required: "This field is required",
        },
      },
    },
  ];

  const handleSubmit = async (data) => {
    const response = await LoginService(data);
    if (response.status == 200) {
      dispatch(userChange(response.data));
      navigate("/dashboard");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className=" flex-col items-center justify-center h-screen grid ">
      <div className=" w-[449px]">
        <img className="w-52 h-11 ml-[120px]" src={logo} alt="Logo" />
        <CustomForm
          fields={fields}
          onSubmit={handleSubmit}
          formStyle="pt-2 flex flex-col"
          fieldStyle="flex flex-col gap-1 mt-6"
          labelStyle="font-light text-gray-600"
          inputStyle="border border-[#dddfe8] p-3 h-11 rounded-sm text-[#7b7d86] focus:outline-none focus:border-blue-400"
        >
          {(isFormValid) => (
            <div className="mt-8">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`p-3 border h-11 w-full rounded-sm text-white
          ${
            isFormValid
              ? "bg-[#4398D7] hover:bg-[#3587c4]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
              >
                LOGIN
              </button>
            </div>
          )}
        </CustomForm>
      </div>
    </div>
  );
};

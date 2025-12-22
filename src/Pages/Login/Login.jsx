import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoCK.svg"
import { CustomForm } from "../../Components/CustomForm/CustomForm";
import { LoginService } from "./LoginService";
import {useDispatch} from "react-redux";
import { userChange } from "../../Redux/UserDataSlice";



export const Login = () => {
  const navigate = useNavigate();
  const dispatch= useDispatch();


  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Business Email",
      inputStyle: "border-blue-400 focus:ring-blue-500",
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
      inputStyle: "border-blue-400 focus:ring-blue-500",
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

      const response=  await LoginService(data);
console.log("the response is ths",response.data.user);
      if(response.status==200){
        dispatch(userChange(response.data.user))
        navigate("/dashboard");
      } else{
        alert("Invalid Credentials");
      }
      };
   
  
  return (
    <div className=" flex-col items-center justify-center h-screen grid ">
      <div className="h-[449px] w-[449px]">
        <img className="w-52 h-11 ml-[120px]" src={logo} alt="Logo" />
        <CustomForm
          fields={fields}
          onSubmit={handleSubmit}
          buttonText="LOGIN"
          formStyle="w-md h-[107px] pt-1 flex flex-col"
          fieldStyle="w-md h-[107px] pt-9 flex flex-col"
          labelStyle="font-light"
          inputStyle="border border-[#dddfe8] mt-3 p-3 h-11 rounded-sm text-[#7b7d86]"
          buttonStyle="mt-12 p-3 border h-11 w-md bg-[#4398D7] rounded-sm text-[#FFFFFF]"
        />
      </div>
    </div>
  );
};

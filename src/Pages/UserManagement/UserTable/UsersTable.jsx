import { FaEdit } from "react-icons/fa";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../Components/CustomTable/CustomTable";
import { useSelector } from "react-redux";




export const UsersTable = ({ tableData }) => {


  const navigate = useNavigate();
  const {role} = useSelector((state) => state.UserData.value);

  const columns = [
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" },
  { label: "Email ID", key: "email" },
  { label: "Roles", key: "roles", render: (user) => {
    return   <span className="px-2 py-1 bg-gray-100 border border-gray-300 text-[12px] rounded">
        {user.role === "ADMIN" ? "Admin" : user.role === "CUSTOMER" ? "Customer" : "Read-Only"}
      </span>
  } },
  { label: "Edit", key: "edit", render: (user) => {
  if (role === "ADMIN") {
      return (
        <button
          onClick={() => navigate("editUser", { state: { user } })}
          className="text-blue-500 hover:text-blue-800"
        >
          <FaEdit size={14} />
        </button>
      );
    }
    return null; 
  }}
];


  const formattedRows = (tableData || []).map((user) => ({
    ...user,

    firstName: user.firstName || "-",
    lastName: user.lastName || "-",

   

   
  }));

  return (
    <CustomTable
      columns={columns}
      data={formattedRows}
      maxHeight="850px"
    />
  );
};

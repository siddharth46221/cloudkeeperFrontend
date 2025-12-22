import { FaEdit } from "react-icons/fa";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../Components/CustomTable/CustomTable";


const columns = [
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" },
  { label: "Email ID", key: "email" },
  { label: "Roles", key: "roles" },
  { label: "Edit", key: "edit" },
  { label: "Delete", key: "delete" },
];

export const UsersTable = ({ tableData }) => {
  const navigate = useNavigate();
  console.log("the table data in user table is",tableData);

  const formattedRows = (tableData || []).map((user) => ({
    ...user,

    firstName: user.firstName || "-",
    lastName: user.lastName || "-",

      roles: (
      <span className="px-2 py-1 bg-gray-100 border border-gray-300 text-[12px] rounded">
        {user.role === "ADMIN" ? "Admin" : user.role === "CUSTOMER" ? "Customer" : "Read-Only"}
      </span>
    ),

    edit: (
      <button
        onClick={() => navigate("editUser", {state: {user}})}
        className="text-blue-500 hover:text-blue-800"
      >
        <FaEdit size={14} />
      </button>
    ),

    delete: (
      <button className="text-red-500 hover:text-red-700">
        <DeleteOutlineIcon fontSize="small" />
      </button>
    ),
  }));

  return (
    <CustomTable
      columns={columns}
      data={formattedRows}
      maxHeight="800px"
    />
  );
};

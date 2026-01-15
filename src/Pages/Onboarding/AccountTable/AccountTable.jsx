import React from 'react'
import CustomTable from "../../../Components/CustomTable/CustomTable";

const columns = [
  { label: "ARN Number", key: "arnNumber" },
  { label: "Account Name", key: "AccountName" },
  { label: "AWS ID", key: "awsId" },
];

export const AccountTable = ({AccountsData}) => {
 
 const tableData = AccountsData;
  const formattedRows = (tableData || []).map((user) => ({
    ...user,

    arnNumber: user.arnNumber || "-",
    AccountName: user.accountName || "-",
    awsId: user.awsId || "-",


    
  }));

  return (
    <CustomTable
      columns={columns}
      data={formattedRows}
      maxHeight="800px"
    />
  );
}

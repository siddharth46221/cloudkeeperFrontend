import app from "../../Utils/Interseptor";

export const getAllAccounts = async () => {
     
    const response = await app.get(`/accounts/all`);
    return response.data;
  
  }

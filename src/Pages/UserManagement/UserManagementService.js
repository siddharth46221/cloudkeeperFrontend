import app from "../../Utils/Interseptor";

export const addNewUser = async (data) => {
  data.password = "123";
  try {
    const response = await app.post(`/users/create`, data);
    return response.status;
  } catch (err) {
    console.error("Error creating user:", err);
    return err;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await app.get(`/users/all`);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const editUser = async (id, data) => {
  try {
    const response = await app.put(`/users/edit/${id}`, data);
    return response.status;
  } catch (err) {
    console.error("Error editing user:", err);
    return err.response;
  }
};

export const allAccounts = async () => {
  try {
    const response = await app.get(`/accounts/all`);
    return response;
  } catch (err) {
    console.error("Error getting all accounts:", err);
    return err.response;
  }
};

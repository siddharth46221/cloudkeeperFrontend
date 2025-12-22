import axios from "axios";

const Base_URL= "http://localhost:8080/users"

const authHeader= () => {
     const token= localStorage.getItem("token");
     return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
     };
};

export const addNewUser = async (data) => {
    data.password= "123";
      try{
           const response = await axios.post(`${Base_URL}/create`,data, authHeader());
           return response.status;
      }
      catch(err){
        console.error("Error creating user:", err);
        throw err;
      }
};

export const getAllUsers = async () =>{
     try{
        const response = await axios.get(`${Base_URL}/all`, authHeader());
        return response.data;
     }
     catch(err){
        console.error("Error getting all users:", err);
        throw err;
     }
}

export const editUser = async (id, data) =>{
   try{
      const response = await axios.put(`${Base_URL}/edit/${id}`, data, authHeader());
      return response.status;
   }
   catch(err){
      console.error("Error editing user:", err);
      throw err;
   }
}
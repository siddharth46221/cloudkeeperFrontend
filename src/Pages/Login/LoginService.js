import axios from "axios";

export const LoginService = async (data) => {


   try{
         const response=  await axios.post('http://localhost:8080/login', data)


        
         if(response.data ){
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          return response;
         }
        
          
      }
        
      catch(err){
        console.error("Login failed:", err);
        return err;
      }
    
  return null;
}

import app from "../../Utils/Interseptor";

export const getAllAccountsData = async (data,awsId =[]) => {
    const params = new URLSearchParams();
    params.append("groupBy", data);
    awsId.forEach(id => params.append("awsId", id));
  
  try {
    const response = await app.get(`/cost/report?${params.toString()}`);
    return response.data;
  } catch (err) {
    console.error("Error getting data:", err);
    throw err;
  }
};


export const getFilterItems = async ( groupBy, awsId = [] ) => {
  const params = new URLSearchParams();
  params.append("groupBy", groupBy);
  awsId.forEach(id => params.append("awsId", id));

  try{
    const res = await app.get(`/cost/groupByFilter?${params.toString()}`);
    return res.data;
  }
  catch(err){
    console.error("Error getting data:", err);
    throw err;
  }
  
};

export const getFilterReport = async ( groupBy, awsId = [], filters= [] ) => {
  const params = new URLSearchParams();
  params.append("groupBy", groupBy);
  awsId.forEach(id => params.append("awsId", id));
  filters.forEach(id => params.append("filters", id));

  try{
    const res = await app.get(`/cost/filterReport?${params.toString()}`);
    return res.data;
  }
  catch(err){
    console.error("Error getting data:", err);
    throw err;
  }
  
};
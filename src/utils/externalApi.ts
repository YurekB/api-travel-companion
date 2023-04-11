import axios from "axios";
import { accessLog } from "./log";

const sendToExternalApi = async (data: any) => {
    let apiResponse = 0; // Outside try/catch block so it can be returned in catch, as 0;

    try {
      accessLog("-- External Api Data --" ,data);
      let token = ''; // Do you need to get a auth token from external api? 
      let dataForSubmit: object;
      
      await axios({
        url: process.env?.API_EXTERNAL_URL + "api/Claim/Claim/CreateNew",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      })
        .then((res: any) => {
          accessLog("External Api Res:", res?.data);
          apiResponse = res.data; // Update 
        })
        .catch((err: any) => {
          accessLog("External Api Error:",err);
          throw new Error("Error from external api");
        });
        
      return apiResponse
    } catch (error: any) {
      accessLog(" -- GENERAL ERROR IN API -- Create New",error);
      return apiResponse
    }
  };
  

  export { sendToExternalApi }
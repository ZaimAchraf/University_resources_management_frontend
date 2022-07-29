import axios from 'axios'
import { CHEFDEP_API_URL } from './config'

export const getTeachers = async (departement) => {
  let { data: teachers } = await axios.get(
    CHEFDEP_API_URL + '/chefDepartement/teachers/' + departement,
  )

  return teachers
}

export const sendDemandRequest = async (demand) =>{

  console.log(demand)
  await axios.post(CHEFDEP_API_URL+"/chefDepartement/availableBudget",demand).then(
    (response) =>{
      console.log(response)
      return response;
    }
  ).catch(
    (error) =>{
      return error;
    }
  )
}

export const getAllRequests = async () =>{
  let {data:requests} = await axios.get(CHEFDEP_API_URL+"/chefDepartement/resources-requests/")

  return requests;
}


export const updateChefdep = async (chefdepID) => {
  console.log(chefdepID)
  await axios
    .post(CHEFDEP_API_URL + '/chefDepartement/update', chefdepID)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
}

export const sendDemandToRespRes = async (dem) =>{
  let {data:demand} = await axios.post(CHEFDEP_API_URL + "/chefDepartement/sendDemand" ,
   {
     "sender" : JSON.parse(localStorage.getItem("user")).email,
     "department" : JSON.parse(localStorage.getItem("user")).department,
     "status" : "Sent",
     "resources" : dem
   })

  return demand;
}

export const getAllSentRequests = async () =>{
  let {data:requests} = await axios.get(CHEFDEP_API_URL+"/chefDepartement/sent-requests")

  return requests;
}

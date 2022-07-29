
import axios from "axios";
import { TEACHER_API_URL, OLD_TEACHER_API_URL } from "./config";

export const getTeachers = async () => {
  let { data: teachers } = await axios.get(TEACHER_API_URL + '/teachers/')

  return teachers
}

export const addNewTeacher = async (teacher) => {
  await axios
    .post(TEACHER_API_URL + '/teachers/add', teacher)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
}

export const updateTeacher = async (teacher) => {
  await axios
    .post(TEACHER_API_URL + '/teachers/update', teacher)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
}

export const deleteTeacherService = async (id) => {
  await axios.delete(TEACHER_API_URL + '/teachers/' + id)
  setTimeout(() => {
    window.location.reload()
  }, 500)
}

export const getTeacher = async (id) => {
  let { data: teacher } = await axios.get(TEACHER_API_URL + '/teachers/' + id)

  return teacher
}

export const getDemand = async () =>{
  let {data:demand} = await axios.get(OLD_TEACHER_API_URL+"/demands/" + JSON.parse(localStorage.getItem("user")).department)

  return demand;
}

export const changeDemandState = async (dem) =>{
  let {data:demand} = await axios.post(OLD_TEACHER_API_URL+"/demands/changeState/" + JSON.parse(localStorage.getItem("user")).email + "/" + dem)

  return demand;
}

export const sendDemandToChefDep = async (dem) =>{
  let {data:demand} = await axios.post(OLD_TEACHER_API_URL+"/demands/sendDemand" ,
   {
     "sender" : JSON.parse(localStorage.getItem("user")).email,
     "department" : JSON.parse(localStorage.getItem("user")).department,
     "status" : "Sent",
     "resources" : dem
   })

  return demand;
}

export const getAllDemands = async () =>{
  let {data:demands} = await axios.get(OLD_TEACHER_API_URL+"/demands/MyDemands/" + JSON.parse(localStorage.getItem("user")).email)

  return demands;
}

import axios from 'axios'
import { DEPARTMENT_API_URL } from './config'

export const getDepartments = async () => {
  let { data: departements } = await axios.get(DEPARTMENT_API_URL + '/departments/')

  return departements
}

export const addNewDepartment = async (department) => {
  await axios
    .post(DEPARTMENT_API_URL + '/departments/add', department)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
}

export const updateDepartment = async (department) => {
  await axios
    .post(DEPARTMENT_API_URL + '/departments/update', department)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
}

export const getDepartment = async (id) => {
  let { data: department } = await axios.get(DEPARTMENT_API_URL + '/departments/' + id)

  return department
}

export const DeleteDepartmentService = async (id) => {
  await axios.delete(DEPARTMENT_API_URL + '/departments/' + id)
  setTimeout(() => {
    window.location.reload()
  }, 500)
}

import axios from 'axios'
import { DEPARTMENT_API_URL, RESOURCES_API_URL } from './config'

export const getAll = async () => {
  let { data: Computers } = await axios.get(RESOURCES_API_URL + '/computers/')

  return Computers
}

export const getAllOwners = async () => {
  let { data: Owners } = await axios.get(RESOURCES_API_URL + '/owners/')
  return Owners
}

export const getOwnersByDepartement = async (name) => {
  let { data: Owners } = await axios.get(DEPARTMENT_API_URL + '/teachers/department/' + name)
  return Owners
}

export const getUsers = async () => {
  let { data: Owners } = await axios.get(RESOURCES_API_URL + '/profile/users')
  return Owners
}

export const getAllDepartements = async () => {
  let { data: Departements } = await axios.get(DEPARTMENT_API_URL + '/departments/')
  return Departements
}

export const addComputer = async (computer) => {
  console.log(computer)

  await axios
    .post(RESOURCES_API_URL + '/computers/add', computer)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
}

export const updateComputer = async (computer) => {
  console.log(computer)
  await axios
    .post(RESOURCES_API_URL + '/computers/update', computer)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
}

export const deleteComputer = async (id) => {
  await axios.delete(RESOURCES_API_URL + '/computers/delete/' + id)
}

export const getComputer = async (id) => {
  let { data: computer } = await axios.get(RESOURCES_API_URL + '/computers/' + id)

  return computer
}

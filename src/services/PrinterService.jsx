import axios from 'axios'
import { RESOURCES_API_URL } from './config'

export const getAll = async () => {
  let { data: Printers } = await axios.get(RESOURCES_API_URL + '/printers/')

  return Printers
}

export const getAllOwners = async () => {
  let { data: Owners } = await axios.get(RESOURCES_API_URL + '/owners/')
  return Owners
}

export const addPrinter = async (printer) => {
  await axios
    .post(RESOURCES_API_URL + '/printers/add', printer)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
}

export const updatePrinter = async (printer) => {
  console.log(printer)
  await axios
    .post(RESOURCES_API_URL + '/printers/update', printer)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
}

export const deletePrinter = async (id) => {
  await axios.delete(RESOURCES_API_URL + '/printers/delete/' + id)
}

export const getPrinter = async (id) => {
  let { data: printer } = await axios.get(RESOURCES_API_URL + '/printers/' + id)

  return printer
}

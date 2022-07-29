import axios from 'axios'
import { ADMINISTRATIVE_API_URL } from './config'

export const getAdministratives = async () => {
  let { data: adminstartives } = await axios.get(ADMINISTRATIVE_API_URL + '/administrative/')

  return adminstartives
}

export const addAdministrative = async (administrative) => {
  await axios
    .post(ADMINISTRATIVE_API_URL + '/administrative/add', administrative)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
}

export const updateAdministrative = async (administrative) => {
  await axios
    .post(ADMINISTRATIVE_API_URL + '/administrative/update', administrative)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
}

export const deleteAdministrative = async (id) => {
  await axios.delete(ADMINISTRATIVE_API_URL + '/administrative/' + id)
  setTimeout(() => {
    window.location.reload()
  }, 500)
}

export const getAdministrative = async (id) => {
  let { data: administrative } = await axios.get(ADMINISTRATIVE_API_URL + '/administrative/' + id)

  return administrative
}

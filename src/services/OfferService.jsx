import axios from 'axios'
import { API_URL, RESOURCES_API_URL } from './config'

export const getOffers = async () => {
  let { data: offers } = await axios.get(RESOURCES_API_URL+'/offer/')

  return offers
}

export const getDemands = async () => {
  let { data: demands } = await axios.get(RESOURCES_API_URL+'/offer/demands')

  return demands
}

export const getDemand = async (id) => {
  let { data: demand } = await axios.get(RESOURCES_API_URL+'/offer/demand/' + id)

  return demand
}

export const AddOffer = async (offer) => {
  await axios.post(RESOURCES_API_URL+'/offer/addtolist',offer)
  .then((response) => {
    return response
  })
  .catch((error) => {
    return error
  })
}

export const UpdateStatus = async (demand) => {
  await axios.post(RESOURCES_API_URL+'/offer/updatestatus',demand)
  .then((response) => {
    return response
  })
  .catch((error) => {
    return error
  })
}

export const eliminate = async (id) => {
  let { data: Owners } = await axios.post(RESOURCES_API_URL + '/profile/setEliminated/' + id)
  return Owners
}



export const deleteProvider = async (value) => {
  await axios.get(RESOURCES_API_URL+'/offre/Providers/delete/'+value)
  .then((response) => {
    return response
  })
  .catch((error) => {
    return error
  })
}

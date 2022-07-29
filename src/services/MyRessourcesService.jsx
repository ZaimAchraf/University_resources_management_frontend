import axios from 'axios'
import { RESOURCES_API_URL } from './config'

export const getResourcesForCurrentTeacher = async () => {
  let user = JSON.parse(localStorage.getItem('user'))

  let { data: resources } = await axios.get(
    RESOURCES_API_URL + '/resources/username/' + user.username,
  )

  return resources
}

export const declarerUnePanne = async (panne) => {
  console.log(panne)

  await axios
    .post(RESOURCES_API_URL + '/resources/signalerPanne', panne)
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((error) => {
      return error
    })
}

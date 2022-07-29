import axios from 'axios'
import { RESOURCES_API_URL } from './config'

export const updateProfile = async (user) => {
  await axios
    .post(RESOURCES_API_URL + '/profile/update', user)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
}

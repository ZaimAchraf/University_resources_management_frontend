import axios from 'axios'
import { Proxy, RESOURCES_API_URL } from './config'

export const getAll = async () =>{

  let {data:Pannes} = await axios.get(Proxy+"/maintenance")

  return Pannes
}

export const UpdateCommentaires = async (request) =>{

  let {data:Resource} = await axios.post(Proxy+"/maintenance/envoeyerconstat",request)
  console.log(request)
  return Resource
}

export const SendMail = async (id) =>{

  let {data:Resource} = await axios.post(RESOURCES_API_URL + "/send-mail/" + id)
  console.log(id)
  return Resource
}

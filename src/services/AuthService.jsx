import axios from 'axios'
import { API_URL } from '../services/config'

export async function login(username, password) {
  let { data: user } = await axios.post(API_URL + '/auth/login', { username, password })
  localStorage.setItem('token', user.token)
  localStorage.setItem('id', user.id)
  localStorage.setItem('username', user.username)
  localStorage.setItem('email', user.email)
  localStorage.setItem('roles', user.roles)
  localStorage.setItem('user', JSON.stringify(user))
  return user
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('roles')
  localStorage.removeItem('email')
  localStorage.removeItem('username')
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('id')
}

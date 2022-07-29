import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../services/AuthService'

export default function Logout() {
  const navigate = useNavigate()
  useEffect(() => {
    logout()
    navigate('/login', { replace: true })
  }, [])

  return null
}

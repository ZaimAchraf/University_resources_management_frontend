import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../../services/AuthService'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { checkRoles, authentified } from '../../../protectedRoutes/checkRoles'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorUsername, seterrorUsername] = useState('')
  const [errorPassword, seterrorPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (authentified()) {
      let check = checkRoles(['ROLE_ADMIN', 'ROLE_PROF', 'ROLE_CHEF_DEP', 'ROLE_CHEF_RESOURCES'])
      navigate('../', { replace: true })
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (username.trim().length === 0 || password.trim().length === 0) {
      if (username.trim().length === 0) {
        seterrorUsername('username is required')
      } else {
        seterrorUsername('')
      }
      if (password.trim().length === 0) {
        seterrorPassword('password is required')
      } else {
        seterrorPassword('')
      }
    } else {
      try {
        let jwt = await login(username, password)

        setSuccess('Welcom again')
        setError('')
        setTimeout(function () {
          window.location = '/'
        }, 500)
      } catch (exception) {
        setError('Email or password incorrect')
        setSuccess('')
        console.log(error)
      }
    }
  }

  const styles = {
    ha_error_msg: {
      color: 'red',
    },
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && <div className="alert alert-success">{success}</div>}
                  <CForm>
                    <h1>Login </h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <p style={styles.ha_error_msg}>{errorUsername}</p>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <p style={styles.ha_error_msg}>{errorPassword}</p>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleSubmit}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

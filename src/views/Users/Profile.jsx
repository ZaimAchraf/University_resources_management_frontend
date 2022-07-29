import {
  CForm,
  CFormInput,
  CCardHeader,
  CCard,
  CCardImage,
  CCardText,
  CCardBody,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CToast,
  CToastBody,
  CToastClose,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { updateProfile } from 'src/services/ProfileService'
import { getDepartments } from 'src/services/DepartmentsService'
import { CButton } from '@coreui/react'
import { CFormLabel, CFormSelect } from '@coreui/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import back from 'src/assets/images/react.jpg'
import avatar from 'src/assets/images/avatars/9.jpg'

const MySwal = withReactContent(Swal)

const Profile = () => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [nameERROR, setNameERROR] = useState('')
  const [Email, setEmail] = useState('')
  const [EmailERROR, setEmailERROR] = useState('')
  const [Phone, setPhone] = useState('')
  const [PhoneERROR, setPhoneERROR] = useState('')
  const [Address, setAddress] = useState('')
  const [AddressERROR, setAddressERROR] = useState('')
  const [Departements, setDepartements] = useState([])
  const [Dep, setDep] = useState('')
  const [DepERROR, setDepERROR] = useState('')

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('user'))
    setId(user.id)
    setName(user.username)
    setEmail(user.email)
    if (user.phone) setPhone(user.phone)
    if (user.address) setAddress(user.address)
    if (user.laboratory) setDep(user.address)

    getDepartments().then((resp) => {
      // console.log(resp);
      setDepartements(resp)
    })
  }, [])

  const updateProf = (e) => {
    name.trim() === '' ? setNameERROR('Name field is required') : setNameERROR('')
    Email.trim() === '' ? setEmailERROR('Email field is required') : setEmailERROR('')
    Phone.trim() === '' ? setPhoneERROR('Phone field is required') : setPhoneERROR('')
    Address.trim() === '' ? setAddressERROR('Address field is required') : setAddressERROR('')
    Dep.trim() === '' ? setDepERROR('Dep field is required') : setDepERROR('')

    if (
      name.trim() !== '' &&
      Email.trim() !== '' &&
      Phone.trim() !== '' &&
      Address.trim() !== '' &&
      Dep.trim() !== ''
    ) {
      var user = JSON.parse(localStorage.getItem('user'))
      updateProfile({
        id: id,
        name: name,
        email: Email,
        phone: Phone,
        address: Address,
        laboratory: Dep,
      })

      user.name = name
      user.email = Email
      user.phone = Phone
      user.address = Address
      user.laboratory = Dep

      localStorage.setItem('user', JSON.stringify(user))

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Printer updated with success',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }

  return (
    <>
      <div className="row">
        <div
          className="col-8"
          style={{ backgroundColor: '#fff', padding: '15px', borderRight: '6px solid #ebedef' }}
        >
          <CCardHeader style={{ backgroundColor: '#fff', marginBottom: '20px' }}>
            <h5>Profile Settings</h5>
          </CCardHeader>
          {nameERROR && (
            <CToast
              autohide={false}
              visible={true}
              color="danger"
              className="text-white align-items-center"
            >
              <div className="d-flex">
                <CToastBody>{nameERROR}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          )}
          {EmailERROR && (
            <CToast
              autohide={false}
              visible={true}
              color="danger"
              className="text-white align-items-center"
            >
              <div className="d-flex">
                <CToastBody>{EmailERROR}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          )}
          {PhoneERROR && (
            <CToast
              autohide={false}
              visible={true}
              color="danger"
              className="text-white align-items-center"
            >
              <div className="d-flex">
                <CToastBody>{PhoneERROR}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          )}
          {AddressERROR && (
            <CToast
              autohide={false}
              visible={true}
              color="danger"
              className="text-white align-items-center"
            >
              <div className="d-flex">
                <CToastBody>{AddressERROR}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          )}
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Phone</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                value={Phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                }}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Address</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                value={Address}
                onChange={(e) => {
                  setAddress(e.target.value)
                }}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Departement</CFormLabel>
              <CFormSelect
                aria-label="Default select example"
                value={Dep}
                onChange={(e) => {
                  setDep(e.target.value)
                }}
              >
                <option selected disabled value="">
                  Select Departement
                </option>
                {Departements.map((t, index) => {
                  return (
                    <option value={t.name} key={index}>
                      {t.name}
                    </option>
                  )
                })}
              </CFormSelect>
            </div>
          </CForm>
          <CButton color="info" variant="outline" onClick={updateProf} style={{ margin: '10px' }}>
            Update
          </CButton>
        </div>

        <div
          className="col-4"
          style={{ backgroundColor: '#fff', padding: '0', height: 'fit-content' }}
        >
          <CCard style={{ width: '100%' }}>
            <CCardImage orientation="top" src={back} />
            <CCardBody
              style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '0' }}
            >
              <img
                src={avatar}
                alt=""
                style={{
                  borderRadius: '50%',
                  border: '3px solid rgb(75 141 161)',
                  marginTop: '-75px',
                }}
              />
              <h5 style={{ width: '100%', textAlign: 'center' }}>Zaim Achraf</h5>
              <p style={{ width: '100%', textAlign: 'center' }}>achraf.zaime@gmail.com</p>
              <p style={{ width: '100%', textAlign: 'center' }}>Phone: 0693020346</p>
              <p style={{ width: '100%', textAlign: 'center' }}>departement: informatique</p>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </>
  )
}

export default Profile

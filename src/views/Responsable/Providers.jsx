import {
  CAlert,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CToast,
  CToastBody,
  CToastClose,
  CFormSelect,
  CBadge,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import {
  addNewTeacher,
  getTeachers,
  deleteTeacherService,
  getTeacher,
  updateTeacher,
} from 'src/services/TeachersService'
import { CButton } from '@coreui/react'
import { CFormLabel } from '@coreui/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getDepartments } from '../../services/DepartmentsService'
import { getUsers } from 'src/services/ComputerService'

const MySwal = withReactContent(Swal)

const Providers = () => {

  const [providers, setProviders] = useState([])
  const [visibleLg, setVisibleLg] = useState(false)
  const [visibleUpdate, setVisibleUpdate] = useState(false)
  const [_id, setId] = useState('')
  const [name, setName] = useState('')
  const [nameERROR, setNameERROR] = useState('')
  const [email, setEmail] = useState('')
  const [emailERROR, setEmailERROR] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneERROR, setPhoneERROR] = useState('')
  const [address, setAddress] = useState('')
  const [addressERROR, setAddressERROR] = useState('')
  const [laboratoire, setLaboratoire] = useState('')
  const [laboratoireERROR, setLaboratoireERROR] = useState('')
  const [department, setDepartment] = useState('')
  const [departmentERROR, setDepartmentERROR] = useState('')
  const [departments, setDepartments] = useState([])


  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  useEffect(() => {
    getUsers().then((resp) => {
      setProviders(resp)
    })

    console.log(providers)
  }, [])


  // delete teacher action
  const deleteTeacher = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTeacherService(id)
        MySwal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }
    })
  }

  // costume style
  const styles = {
    ha_btn_font: {
      color: '#FFF',
      margin: '5px',
    },
  }

  return (
    <>
      <div style={{ backgroundColor: '#fff', padding: '15px' }}>

        {/* table of teachers */}
        <CTable bordered>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Nom</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">status</CTableHeaderCell>
              {/* <CTableHeaderCell scope="col">Address</CTableHeaderCell>
              <CTableHeaderCell scope="col">Département</CTableHeaderCell>
              <CTableHeaderCell scope="col">Laboratory</CTableHeaderCell> */}
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {providers.map((t, index) => {
              let test = false;
              t.authorities.forEach(element => {
                if (element.name == "ROLE_PROVIDER"){
                  test = true;
                  console.log(t.status)
                }
              });
              if (test){
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{t.name}</CTableDataCell>
                    <CTableDataCell>{t.email}</CTableDataCell>
                    <CTableDataCell><CBadge color="info" className="ms-2">{t.status == "eliminated" && t.status ? "eliminated" : "valid"}</CBadge></CTableDataCell>
                    {/* <CTableDataCell>{t.address}</CTableDataCell>
                    <CTableDataCell>{t.department}</CTableDataCell>
                    <CTableDataCell>{t.laboratoire}</CTableDataCell> */}
                    <CTableDataCell>
                      <CButton
                        color="success"
                        style={styles.ha_btn_font}
                        value={t.id}
                        // onClick={(e) => showUpdateModal(e.target.value)}
                      >
                        Eliminate
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                )
              }
            })}
          </CTableBody>
        </CTable>
      </div>

    </>
  )
}

export default Providers

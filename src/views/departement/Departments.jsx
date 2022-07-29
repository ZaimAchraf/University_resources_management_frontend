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
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react'
import { CFormLabel } from '@coreui/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  getDepartments,
  addNewDepartment,
  updateDepartment,
  getDepartment,
  DeleteDepartmentService,
} from '../../services/DepartmentsService'

const MySwal = withReactContent(Swal)

const Teachers = () => {
  // states variables
  const [departments, setDepartments] = useState([])
  const [visibleLg, setVisibleLg] = useState(false)
  const [visibleUpdate, setVisibleUpdate] = useState(false)
  const [_id, setId] = useState('')
  const [name, setName] = useState('')
  const [nameERROR, setNameERROR] = useState('')
  const [chef_dep_name, setChef_dep_name] = useState('')
  const [chef_dep_nameERROR, setChef_dep_nameEmailERROR] = useState('')
  const [chef_dep_email, setChef_dep_email] = useState('')
  const [chef_dep_emailERROR, setChef_dep_emailERROR] = useState('')
  const [chef_dep_id, setChef_dep_id] = useState('')
  const [chef_dep_idERROR, setChef_dep_idERROR] = useState('')

  useEffect(() => {
    getDepartments().then((resp) => {
      setDepartments(resp)
    })
  }, [])

  // add Department action
  const handleAddTeacher = () => {
    name.trim() === '' ? setNameERROR('name field is required') : setNameERROR('')
    if (chef_dep_name.trim() === '') {
      setChef_dep_emailERROR('chef department field is required')
    } else {
      setChef_dep_emailERROR('')
    }
    chef_dep_email.trim() === ''
      ? setChef_dep_nameEmailERROR('chef department email field is required')
      : setChef_dep_nameEmailERROR('')
    //(chef_dep_id.trim() === "")?setChef_dep_idERROR("address field is required"):setChef_dep_idERROR("");

    if (name.trim() !== '' && chef_dep_name.trim() !== '' && chef_dep_email.trim() !== '') {
      console.log('success')
      addNewDepartment({ name, chef_dep_name, chef_dep_email })
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Department added with success',
        showConfirmButton: false,
        timer: 1500,
      })
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }

  // update department action
  const handleUpdate = (id) => {
    name.trim() === '' ? setNameERROR('name field is required') : setNameERROR('')
    if (chef_dep_name.trim() === '') {
      setChef_dep_emailERROR('chef department field is required')
    } else {
      setChef_dep_emailERROR('')
    }
    chef_dep_email.trim() === ''
      ? setChef_dep_nameEmailERROR('chef department email field is required')
      : setChef_dep_nameEmailERROR('')
    //(_id.trim() === "")?setIdE("address field is required"):setChef_dep_idERROR("");

    if (name.trim() !== '' && chef_dep_name.trim() !== '' && chef_dep_email.trim() !== '') {
      updateDepartment({ id: _id, name, chef_dep_name, chef_dep_email })
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Teacher updated with success',
        showConfirmButton: false,
        timer: 1500,
      })
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }

  // show update modal
  const showUpdateModal = (id) => {
    setVisibleUpdate(!visibleUpdate)
    let department = getDepartment(id)
    department.then((resp) => {
      setId(resp.id)
      setName(resp.name)
      setChef_dep_name(resp.chef_dep_name)
      setChef_dep_email(resp.chef_dep_email)
    })
  }

  // delete teacher action
  const deleteDepartment = (id) => {
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
        DeleteDepartmentService(id)
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
        <CButton color="info" onClick={() => setVisibleLg(!visibleLg)} style={styles.ha_btn_font}>
          Add Department
        </CButton>

        {/* table of teachers */}
        <CTable bordered>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Chef Department</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {departments.map((t, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{t.name}</CTableDataCell>
                  <CTableDataCell>{t.chef_dep_name}</CTableDataCell>
                  <CTableDataCell>{t.chef_dep_email}</CTableDataCell>
                  <CTableDataCell>
                    {/* */}
                    <CButton
                      color="success"
                      style={styles.ha_btn_font}
                      value={t.id}
                      onClick={(e) => showUpdateModal(e.target.value)}
                    >
                      Modify
                    </CButton>
                    {/*  */}
                    <CButton
                      color="warning"
                      style={styles.ha_btn_font}
                      value={t.id}
                      onClick={(e) => deleteDepartment(e.target.value)}
                    >
                      Delete
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      </div>

      {/* Update Teacher Modal */}
      <CModal size="lg" visible={visibleUpdate} onClose={() => setVisibleUpdate(false)}>
        <CModalHeader>
          <CModalTitle>Modify Department</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* {nameERROR && (
            <CAlert visible={true} color="danger">
              {nameERROR}
            </CAlert>
          )}
          {chef_dep_id && (
            <CAlert visible={true} color="danger">
              {chef_dep_idERROR}
            </CAlert>
          )}
          {chef_dep_name && (
            <CAlert visible={true} color="danger">
              {chef_dep_nameERROR}
            </CAlert>
          )}
          {chef_dep_email && (
            <CAlert visible={true} color="danger">
              {chef_dep_emailERROR}
            </CAlert>
          )} */}

          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Department Name</CFormLabel>
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
              <CFormLabel htmlFor="exampleFormControlInput1">Chef department Name</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                value={chef_dep_name}
                onChange={(e) => {
                  setChef_dep_name(e.target.value)
                }}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Chef department Email</CFormLabel>
              <CFormInput
                type="email"
                id="exampleFormControlInput1"
                value={chef_dep_email}
                onChange={(e) => {
                  setChef_dep_email(e.target.value)
                }}
              />
            </div>
          </CForm>

          <CButton color="success" onClick={handleUpdate} style={{ margin: '10px' }}>
            Update
          </CButton>
          <CButton
            color="danger"
            onClick={() => setVisibleUpdate(!visibleUpdate)}
            style={{ margin: '10px' }}
          >
            Cancel
          </CButton>
        </CModalBody>
      </CModal>

      {/* Add Teacher Modal */}
      <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader>
          <CModalTitle>Add new Department</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {nameERROR && (
            <CAlert visible={true} color="danger">
              {nameERROR}
            </CAlert>
          )}
          {chef_dep_id && (
            <CAlert visible={true} color="danger">
              {chef_dep_idERROR}
            </CAlert>
          )}
          {chef_dep_name && (
            <CAlert visible={true} color="danger">
              {chef_dep_nameERROR}
            </CAlert>
          )}
          {chef_dep_email && (
            <CAlert visible={true} color="danger">
              {chef_dep_emailERROR}
            </CAlert>
          )}

          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Department Name</CFormLabel>
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
              <CFormLabel htmlFor="exampleFormControlInput1">Chef department Name</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                value={chef_dep_name}
                onChange={(e) => {
                  setChef_dep_name(e.target.value)
                }}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Chef department Email</CFormLabel>
              <CFormInput
                type="email"
                id="exampleFormControlInput1"
                value={chef_dep_email}
                onChange={(e) => {
                  setChef_dep_email(e.target.value)
                }}
              />
            </div>
          </CForm>

          <CButton color="success" onClick={handleAddTeacher} style={{ margin: '10px' }}>
            Add
          </CButton>
          <CButton
            color="danger"
            onClick={() => setVisibleLg(!visibleLg)}
            style={{ margin: '10px' }}
          >
            Cancel
          </CButton>
        </CModalBody>
      </CModal>
    </>
  )
}

export default Teachers

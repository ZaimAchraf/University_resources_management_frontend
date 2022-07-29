import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getTeachers, updateChefdep } from 'src/services/ChefDefService'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const ChefDep = () => {
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    getTeachers('info').then((resp) => {
      setTeachers(resp)
    })
  }, [])

  return (
    <>
      <div style={{ backgroundColor: '#fff', padding: '15px' }}>
        <CTable bordered>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nom</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
              <CTableHeaderCell scope="col">Address</CTableHeaderCell>
              <CTableHeaderCell scope="col">Departement</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {teachers.map((t, index) => {
              return (
                <CTableRow key={index}>
                  <CTableHeaderCell scope="row">{t.id}</CTableHeaderCell>
                  <CTableDataCell>{t.name}</CTableDataCell>
                  <CTableDataCell>{t.email}</CTableDataCell>
                  <CTableDataCell>{t.phone}</CTableDataCell>
                  <CTableDataCell>{t.address}</CTableDataCell>
                  <CTableDataCell>{t.departement}</CTableDataCell>
                </CTableRow>
              )
            })}
          </CTableBody>
        </CTable>
      </div>
    </>
  )
}

export default ChefDep

import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CFormInput,
  CFormCheck,
  CAlert,
  CForm,
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

} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react'
import { CFormLabel } from '@coreui/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  AddOffer
} from 'src/services/OfferService'
import {
  getAllDemands
} from '../../services/TeachersService'
import { getAllRequests } from 'src/services/ChefDefService'

const MySwal = withReactContent(Swal)

const AllRequests = () => {

  const [requests, setRequests] = useState([])
  const [title, setTitle] = useState("")
  const [description, setdescription] = useState("")
  const [demands, setDemands] = useState([])
  const [check, setCheck] = useState("")
  const [visibleLg, setVisibleLg] = useState(false)

  useEffect(() => {
    getAllRequests().then((resp) => {
      console.log(resp)
      setRequests(resp)
    })
  }, [])



  const styles = {
    ha_btn_font: {
      color: '#FFF',
      margin: '5px',
    },
  }

  return (
    <>
      <div style={{ backgroundColor: '#fff', padding: '15px' }}>
        <CRow>
          {requests.map((request, index) => {
            if (request.speed == null) {
              return (
                <CCol key={index} sm={6} className="mb-4">
                  <CCard>
                    <CCardBody>
                      <CCardTitle>From: {request.sender}</CCardTitle>
                      <CCardTitle>In: {request.department}</CCardTitle>
                      <hr />
                      <CCardText>
                        {
                          request.resources.map((resource, i) => {
                            return (
                              <div key={i}>
                                <div className='px-4'>
                                  {resource.speed && (<p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>Resource : </span> Printer</p>)}
                                  {(resource.cpu != null) && (<p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>Resource : </span> Computer</p>)}
                                  <p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>Marque : </span> {resource.marque}</p>
                                  {(resource.cpu != null) && (<p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>CPU : </span> {resource.cpu}</p>)}
                                  {resource.hardDisk && (<p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>Hard Disk : </span> {resource.hardDisk}</p>)}
                                  {resource.ram && (<p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>RAM : </span> {resource.ram}</p>)}
                                  {(resource.screen != null) && (<p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>Screen : </span> {resource.screen}</p>)}
                                  {resource.speed && (<p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>Speed : </span> {resource.speed}</p>)}
                                  {resource.resolution && (<p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>Resolution : </span> {resource.resolution}</p>)}
                                  <p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>Qte : </span> {resource.qte}</p>
                                </div>
                              </div>
                            )
                          })
                        }
                        <hr />
                        <p>{request.date}</p>
                      </CCardText>
                    </CCardBody>
                  </CCard>
                </CCol>
              )
            }
          }
          )}
        </CRow>
      </div>
    </>
  )
}

export default AllRequests

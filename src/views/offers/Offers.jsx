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
  AddOffer,
  getDemands,
  UpdateStatus,
  getDemand,
  getStatus
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
  const [demand, setDemand] = useState([])
  const [visibleLg, setVisibleLg] = useState(false)

  useEffect(() => {
    getDemands().then((resp) => {
      console.log(resp)
      setRequests(resp)
    })
  }, [])

  const handelAdd = () => {
    // title.trim() === '' ? setProviderERROR('provider field is required') : setProviderERROR('')

    AddOffer({
      title: title,
      description: description,
      status: "En cour de traitement",
      resources: demands
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Offer Sent Successfuly',
      showConfirmButton: false,
      timer: 1500,
    })
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  const HandelAddtolist = (ids,e) =>{
    getDemand(ids).then((resp) =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Resource has been added',
        showConfirmButton: false,
        timer: 1500,
      })
    })
    // setId(ids)
    e.map((demand,i)=>{
      return(
        demands.push(demand)
      )
    })
    setDemands(demands)
    // console.log(sender)
  }



  const styles = {
    ha_btn_font: {
      color: '#FFF',
      margin: '5px',
    },
  }

  return (
    <>
      <div style={{ backgroundColor: '#fff', padding: '15px' }}>
      {requests.length > 0 &&
      (<CButton color="success" onClick={() => setVisibleLg(!visibleLg)} style={styles.ha_btn_font}>
          Send The Offer
        </CButton>)
      }
      {requests.length == 0 &&
      (<CCardTitle>Nothing to send</CCardTitle>)
      }
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
                      <CButton onClick={() =>
                      {
                        HandelAddtolist(request.id,request.resources)
                      }}>ADD To List</CButton>
                    </CCardBody>
                  </CCard>
                </CCol>
              )
            }
          }
          )}
        </CRow>
      </div>

      <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
        <CModalHeader>
          <CModalTitle>Send Offer</CModalTitle>
        </CModalHeader>

        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Description</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
          </CForm>

          <CButton onClick={handelAdd} color="success" style={{ margin: '10px' }}>
            Send
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

export default AllRequests

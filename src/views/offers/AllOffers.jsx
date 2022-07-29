import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CBadge,

} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react'
import { CFormLabel } from '@coreui/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  getOffers, deleteProvider, eliminate
} from '../../services/OfferService'

const MySwal = withReactContent(Swal)

const AllOffers = () => {

  const [requests, setRequests] = useState([])
  let [idd, setIdd] = useState("")
  let [providerId, setProviderId] = useState("")
  let [iddd, setIddd] = useState("")
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [price, setPrice] = useState(9999999)

  useEffect(() => {
    getOffers().then((resp) => {
      console.log(resp)
      setRequests(resp)

    })
  }, [])

  const confirmer = (value) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to proceed ?",
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then(function (result) {
      if (result.value) {
        console.log(value)
        let offrr = deleteProvider(value)
        let eliminated = eliminate(providerId)
        console.log(offrr)

      }
    });
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
                      <CCardTitle>{request.title}
                        <CBadge color="info" style={{ float: "right" }}>
                          {request.status}
                        </CBadge>
                      </CCardTitle>

                      <hr />
                      <CCardTitle>

                        <p>Description:</p>
                      </CCardTitle>
                      <p>{request.description}</p>
                      <CCardText>
                        {
                          request.resources.map((resource, i) => {
                            return (
                              <div key={i}>
                                <CCardTitle>
                                  <p>Ressource {i + 1}</p>
                                </CCardTitle>
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
                        <p>Date :{request.date}</p>
                      </CCardText>
                      <hr />

                      {request.providers && request.providers.map((provider, i) => {

                        if (parseInt(provider.price, 10) < price) {
                          setPrice(parseInt(provider.price, 10))
                          setEmail(provider.email)
                          setName(provider.name)
                          setIdd("" + request.id + "," + provider.id)
                          setProviderId(provider.id)
                          console.log(request.id)
                        }



                      })}
                      {
                        request.providers && (

                          <CCardText className='row'>
                            <CCardTitle>
                              Best Provider:
                              <button className='btn btn-danger text-light' value={idd} style={{ float: "right" }} onClick={(e) => {
                                confirmer(e.target.value)
                              }}>éliminer</button>
                            </CCardTitle>
                            <span className='font-weight-bold col-6 mb-3'>Compane name :</span>
                            <span className='font-weight-bold col-6 mb-3'> {name}</span>
                            <span className='font-weight-bold col-6 mb-3'>Email :</span>
                            <span className='font-weight-bold col-6 mb-3'> {email}</span>
                            <hr className='col-12 m-auto' style={{ maxWidth: "300px" }} />
                            <div className='col-12' />
                            <span className='font-weight-bold col-6 mt-3'>Price :</span>
                            <span className='font-weight-bold col-6 mt-3'> {price} (DH)</span>
                          </CCardText>)
                      }
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

export default AllOffers

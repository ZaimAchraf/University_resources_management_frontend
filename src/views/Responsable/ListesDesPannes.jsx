import {
  CAlert,
  CForm,
  CFormInput,
  CFormTextarea,
  CInputGroup,
  CBadge,
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
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react'
import { CFormLabel } from '@coreui/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getAll, UpdateCommentaires, SendMail } from './../../services/RespoMaintenanceService'

const MySwal = withReactContent(Swal)

const ListesDesPannes = () => {
  const [ressources, setRessources] = useState([])
  const [visibleLgPanneModal, setVisibleLgPanneModal] = useState(false)

  const [dateAppartition, setDateAppartition] = useState('')
  const [id, setId] = useState('')
  const [explicationPanne, setExplicationPanne] = useState('')
  const [frequencePanne, setFrequencePanne] = useState('')
  const [ordrePanne, setOrdrePanne] = useState('')
  const [Etats, setEtats] = useState('')
  const [Commentaire, setCommentaire] = useState('')
  // const [Date, setDate] = useState(new Date())

  useEffect(() => {
    // let today = new Date();
    // today = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    // console.log(new Date("2022-05-06") < new Date())
    var test = getAll()
    test.then((resp)=> {
      setRessources(resp)
    })
  }, [])

  const handleSendingMail = (Id) => {
      console.log(Id)
      SendMail(Id)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Mail sent successfully',
        showConfirmButton: false,
        timer: 1500,
      })
  }


  // const signalerPanne = () => {
  //   let username = JSON.parse(localStorage.getItem('user')).username

  //   declarerUnePanne({
  //     "id":id,
  //     "dateAppartition":dateAppartition,
  //     "explicationPanne":explicationPanne,
  //     "frequencePanne":frequencePanne,
  //     "ordrePanne":ordrePanne,
  //     "declaredBy": username,
  //   })
  // }

  return (
    <>
      <div style={{ backgroundColor: '#fff', padding: '15px' }}>
        <CTable bordered>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Marque</CTableHeaderCell>
              <CTableHeaderCell scope="col">Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Provider</CTableHeaderCell>
              <CTableHeaderCell scope="col">période de garantie</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {ressources.map((t, index) => {
              return (
                  t.panne != null &&
                  <CTableRow key={index}>
                  <CTableDataCell>{t.marque}</CTableDataCell>
                  <CTableDataCell title=
                    {t.speed ? "speed : " + t.speed + ",\nresolution: " + t.resolution : "CPU : " + t.cpu + ",\nRAM : " + t.ram }
                  >{t.speed ? "Printer" : "Computer"}</CTableDataCell>
                  <CTableDataCell>{t.provider}</CTableDataCell>
                  <CTableDataCell>
                    {t.warrantyPeriod} 
                    <CBadge color="info" className="ms-2">
                      {new Date(t.warrantyPeriod) > new Date() ? "in warranty" : "" }
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CBadge color="info" className="ms-2" style={{minWidth: "90px", marginRight: "10px"}}>
                      {t.panne.etats }
                    </CBadge>  
                  </CTableDataCell>

                  <CTableDataCell>
                    
                    {(t.panne != null) && (
                      <CButton
                        className="btn btn-success"
                        onClick={() => {
                          setVisibleLgPanneModal(!visibleLgPanneModal)
                          setId(t.id)
                          setDateAppartition(t.panne.dateAppartition)
                          setExplicationPanne(t.panne.explicationPanne)
                          setFrequencePanne(t.panne.frequencePanne)
                          setOrdrePanne(t.panne.ordrePanne)
                          setEtats(t.panne.etats)
                          setCommentaire(t.panne.commentaire)
                        }}
                      >
                        Details
                      </CButton>
                    )}
                    {(t.panne != null) && (t.panne.etats == "TOCHANGE") && (
                      <CButton
                        className="btn btn-warning"
                        style={{marginLeft: "10px"}}
                        onClick={() => {
                          handleSendingMail(t.id)
                        }}
                      >
                        Mail Provider
                      </CButton>
                    )}
                  </CTableDataCell>
                </CTableRow>
              )
            })}

            {/* Envoyer COnstat Modal */}
            <CModal
              size="lg"
              visible={visibleLgPanneModal}
              onClose={() => setVisibleLgPanneModal(false)}
            >
              <CModalHeader>
                <CModalTitle>Details</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm>
                  <CInputGroup className="mb-3">
                    <CFormLabel className="col-5 m-1">date d’apparition</CFormLabel>
                    <CFormLabel className="col-1 m-1">:</CFormLabel>
                    <CFormLabel className="col-5 m-1">{dateAppartition}</CFormLabel>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormLabel className="col-5 m-1"> explication de la panne</CFormLabel>
                    <CFormLabel className="col-1 m-1">:</CFormLabel>

                    <CFormLabel className="col-5 m-1">{explicationPanne}</CFormLabel>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CFormLabel className="col-5 m-1">fréquence</CFormLabel>
                    <CFormLabel className="col-1 m-1">:</CFormLabel>

                    <CFormLabel className="col-5 m-1">{frequencePanne}</CFormLabel>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CFormLabel className="col-5 m-1">ordre de panne</CFormLabel>
                    <CFormLabel className="col-1 m-1">:</CFormLabel>

                    <CFormLabel className="col-5 m-1">{ordrePanne}</CFormLabel>
                  </CInputGroup>
                  {
                    console.log(Etats)                 }

                  <CInputGroup className="mb-3">
                    <CFormLabel className="col-5 m-1">Etats</CFormLabel>
                    <CFormLabel className="col-1 m-1">:</CFormLabel>
                    <CFormLabel className="col-1 m-1">{Etats}</CFormLabel>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormLabel className="col-5 m-1">Constat</CFormLabel>
                    <CFormLabel className="col-1 m-1">:</CFormLabel>
                    <CFormLabel className="col-1 m-1">{Commentaire}</CFormLabel>
                  </CInputGroup>
                </CForm>
              </CModalBody>
            </CModal>
          </CTableBody>
        </CTable>
      </div>
    </>
  )
}

export default ListesDesPannes

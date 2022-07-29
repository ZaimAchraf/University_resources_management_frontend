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
import {
  getResourcesForCurrentTeacher,
  declarerUnePanne,
} from './../../services/MyRessourcesService'

const MySwal = withReactContent(Swal)

const MyRessources = () => {
  const [ressources, setRessources] = useState([])
  const [visibleLgPanneModal, setVisibleLgPanneModal] = useState(false)
  const [visibleLgPanneModal1, setVisibleLgPanneModal1] = useState(false)

  const [dateAppartition, setDateAppartition] = useState('')
  const [id, setId] = useState('')
  const [explicationPanne, setExplicationPanne] = useState('')
  const [frequencePanne, setFrequencePanne] = useState('')
  const [ordrePanne, setOrdrePanne] = useState('')
  const [Etats, setEtats] = useState('')

  const [color, setColor] = useState('')

  useEffect(() => {
    getResourcesForCurrentTeacher().then((resp) => {
      console.log(resp)
      setRessources(resp)
    })
  }, [])

  const signalerPanne = () => {
    let username = JSON.parse(localStorage.getItem('user')).username

    declarerUnePanne({
      id: id,
      dateAppartition: dateAppartition,
      explicationPanne: explicationPanne,
      frequencePanne: frequencePanne,
      ordrePanne: ordrePanne,
      declaredBy: username,
    })

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'la panne a été signaler',
      showConfirmButton: false,
      timer: 1500,
    })

    window.location.reload()
  }

  return (
    <>
      <div style={{ backgroundColor: '#fff', padding: '15px' }}>
        <CTable bordered>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Id</CTableHeaderCell>
              <CTableHeaderCell scope="col">Marque</CTableHeaderCell>
              <CTableHeaderCell scope="col">Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Provider</CTableHeaderCell>
              <CTableHeaderCell scope="col">période de garantie</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {ressources.map((t, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{t.id}</CTableDataCell>
                  <CTableDataCell>{t.marque}</CTableDataCell>
                  <CTableDataCell title=
                    {t.speed ? "speed : " + t.speed + ",\nresolution: " + t.resolution : "CPU : " + t.cpu + ",\nRAM : " + t.ram }
                  >{t.speed ? "Printer" : "Computer"}</CTableDataCell>
                  <CTableDataCell>{t.provider}</CTableDataCell>
                  <CTableDataCell>{t.warrantyPeriod}</CTableDataCell>

                  <CTableDataCell>
                    {console.log(t.panne)}

                    {(t.panne == null || t.panne.etats == "PROCESSED") && (
                      <CButton
                        className="btn btn-warning"
                        onClick={() => {
                          setVisibleLgPanneModal(!visibleLgPanneModal)
                          setId(t.id)
                        }}
                      >
                        signaler la panne
                      </CButton>
                    )}

                    {t.panne != null && t.panne.etats != "PROCESSED" && (
                      <>
                        <CButton
                          className="btn btn-success"
                          onClick={() => {
                            setVisibleLgPanneModal1(!visibleLgPanneModal1)
                            setId(t.id)
                            setDateAppartition(t.panne.dateAppartition)
                            setExplicationPanne(t.panne.explicationPanne)
                            setFrequencePanne(t.panne.frequencePanne)
                            setOrdrePanne(t.panne.ordrePanne)
                            setEtats(t.panne.etats)
                          } }
                        >
                          suiver la panne
                        </CButton>
                      </>
                    )}
                  </CTableDataCell>
                </CTableRow>
              )
            })}

            {/* signaler la panne -- MODAL */}

            <CModal
              size="lg"
              visible={visibleLgPanneModal}
              onClose={() => setVisibleLgPanneModal(false)}
            >
              <CModalHeader>
                <CModalTitle>Declarer Une Panne</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm>
                  <CFormLabel>date d’apparition</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormInput type="date" onChange={(e) => setDateAppartition(e.target.value)} />
                  </CInputGroup>

                  <CFormLabel> explication de la panne</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormTextarea
                      onChange={(e) => setExplicationPanne(e.target.value)}
                    ></CFormTextarea>
                  </CInputGroup>

                  <CFormLabel>fréquence</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormSelect onChange={(e) => setFrequencePanne(e.target.value)}>
                      <option value=""></option>
                      <option value="rare">rare</option>
                      <option value="fréquente ">fréquente</option>
                      <option value="permanente">permanente</option>
                    </CFormSelect>
                  </CInputGroup>

                  <CFormLabel>ordre de panne</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormSelect onChange={(e) => setOrdrePanne(e.target.value)}>
                      <option value=""></option>
                      <option value="logiciel">logiciel</option>
                      <option value="materiel ">materiel</option>
                    </CFormSelect>
                  </CInputGroup>

                  <CButton className="btn btn-warning" onClick={signalerPanne}>
                    signaler
                  </CButton>
                </CForm>
              </CModalBody>
            </CModal>

            <CModal
              size="lg"
              visible={visibleLgPanneModal1}
              onClose={() => setVisibleLgPanneModal1(false)}
            >
              <CModalHeader>
                <CModalTitle>Suiver la Panne</CModalTitle>
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
                  {console.log(Etats)}

                  <CInputGroup className="mb-3">
                    <CFormLabel className="col-5 m-1">Etats</CFormLabel>
                    <CFormLabel className="col-1 m-1">:</CFormLabel>
                    <CFormLabel className="col-5 m-1 text-warning">{Etats}</CFormLabel>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CFormLabel className="col-9 m-1"></CFormLabel>
                    <CButton className="btn btn-lg" onClick={() => setVisibleLgPanneModal1(false)}>
                      Close
                    </CButton>
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

export default MyRessources

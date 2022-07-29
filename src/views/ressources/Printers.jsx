import {
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
import {
  addPrinter,
  getAll,
  deletePrinter,
  getPrinter,
  updatePrinter,
} from 'src/services/PrinterService'
import {
  getOwnersByDepartement,
  getAllDepartements,
} from 'src/services/ComputerService'
import { CButton } from '@coreui/react'
import { CFormLabel, CFormSelect } from '@coreui/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Printers = () => {
  const [printers, setPrinters] = useState([])
  const [owners, setOwners] = useState([])
  const [owner, setOwner] = useState('')
  const [departements, setDepartements] = useState([])
  const [departement, setDepartement] = useState('')
  const [visibleLg, setVisibleLg] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [visibleUpdate, setVisibleUpdate] = useState(false)
  const [_id, setId] = useState('')
  const [provider, setProvider] = useState('')
  const [providerERROR, setProviderERROR] = useState('')
  const [speed, setSpeed] = useState('')
  const [speedERROR, setSpeedERROR] = useState('')
  const [marque, setMarque] = useState('')
  const [marqueERROR, setMarqueERROR] = useState('')
  const [resolution, setResolution] = useState('')
  const [resolutionERROR, setResolutionERROR] = useState('')
  const [warranty, setWarranty] = useState('')
  const [warrantyERROR, setWarrantyERROR] = useState('')
  const [affectedTo, setAffectedTo] = useState('No One')
  const [date, setDate] = useState('')
  const [dateERROR, setDateERROR] = useState('')

  useEffect(() => {
    getAll().then((resp) => {
      console.log(resp);
      setPrinters(resp)
    })

    getAllDepartements().then((resp) => {
      // console.log(resp);
      setDepartements(resp)
    })
  }, [])

  const changeDepartement = (e) => {
    setOwner(owners[e.target.value])
    console.log(owners[e.target.value])
  }

  // const handleAddPrinter = () =>{

  //   (provider.trim() === "") ? setProviderERROR("provider field is required") : setProviderERROR("");
  //   (marque.trim() === "")   ? setMarqueERROR("Marque field is required")     : setMarqueERROR("");
  //   (speed.trim() === "") ? setSpeedERROR("Speed field is required") : setSpeedERROR("");
  //   (resolution.trim() === "")   ? setResolutionERROR("Resolution field is required")     : setResolutionERROR("");
  //   (warranty.trim() === "") ? setWarrantyERROR("Warranty field is required") : setWarrantyERROR("");
  //   (date.trim() === "")     ? setDateERROR("Date field is required")         : setDateERROR("");

  //   if(provider.trim() !== "" && marque.trim() !== "" && speed.trim() !== "" && resolution.trim() !== "" && warranty.trim() !== "" && date.trim() !== ""){

  //     addPrinter({
  //       "provider" : provider,
  //       "marque"   : marque,
  //       "speed" : speed,
  //       "resolution"   : resolution,
  //       "warrantyPeriod" : warranty,
  //       "date"     : date,
  //       "affectedTo" : owner,
  //     })

  //     Swal.fire({
  //       position: 'top-end',
  //       icon: 'success',
  //       title: 'Printer added with success',
  //       showConfirmButton: false,
  //       timer: 1500
  //     })
  //     getAll().then(
  //       (resp) =>{
  //         // console.log(resp);
  //         setPrinters(resp);
  //       }
  //     )
  //     setVisibleLg(!visibleLg)
  //   }
  // }

  const departementSelected = (dep) => {
    setDepartement(dep)
    if (dep.trim() !== '') {
      setIsDisabled(false)
      getOwnersByDepartement(dep).then((resp) => {
        // console.log(resp);
        setOwners(resp)
      })
    } else {
      setIsDisabled(true)
      setOwner('')
    }
  }

  const handleUpdate = (id) => {
    // provider.trim() === '' ? setProviderERROR('provider field is required') : setProviderERROR('')
    // marque.trim() === '' ? setMarqueERROR('Marque field is required') : setMarqueERROR('')
    // speed.trim() === '' ? setSpeedERROR('Speed field is required') : setSpeedERROR('')
    // resolution.trim() === ''
    //   ? setResolutionERROR('Resolution field is required')
    //   : setResolutionERROR('')
    // warranty.trim() === '' ? setWarrantyERROR('Warranty field is required') : setWarrantyERROR('')
    // date.trim() === '' ? setDateERROR('Date field is required') : setDateERROR('')

    if (
      provider.trim() !== '' &&
      marque.trim() !== '' &&
      speed.trim() !== '' &&
      resolution.trim() !== '' &&
      warranty.trim() !== '' &&
      date.trim() !== ''
    )
    console.log(owner)
    {
      updatePrinter({
        id: _id,
        provider: provider,
        marque: marque,
        speed: speed,
        resolution: resolution,
        warrantyPeriod: warranty,
        date: date,
        affectedToOwner: owner,
        affectedToDepartment: departement,
      })

      setVisibleUpdate(!visibleUpdate)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Printer updated with success',
        showConfirmButton: false,
        timer: 1500,
      })
      getAll().then((resp) => {
        // console.log(resp);
        setPrinters(resp)
      })
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }

  const showUpdateModal = (id) => {
    let printer = getPrinter(id)

    printer.then((resp) => {
      setId(resp.id)
      setProvider(resp.provider)
      setMarque(resp.marque)
      setSpeed(resp.speed)
      setResolution(resp.resolution)
      setWarranty(resp.warrantyPeriod)
      setDate(resp.date)
      owners.forEach((item, index) => {
        if (resp.affectedTo && resp.affectedTo.name === item.name) {
          setAffectedTo(index)
        }
      })
    })
    setVisibleUpdate(!visibleUpdate)
  }

  const deletePrint = (id) => {
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
        deletePrinter(id)
        MySwal.fire('Deleted!', 'Printer has been deleted.', 'success')
        getAll().then((resp) => {
          console.log(resp)
          setPrinters(resp)
          setTimeout(() => {
            window.location.reload()
          }, 500)
        })
      }
    })

  }

  return (
    <>
      <div style={{ backgroundColor: '#fff', padding: '15px' }}>
        {/* <CButton color="info" onClick={() => setVisibleLg(!visibleLg)} style={{margin:"10px"}}>Add Printer</CButton> */}

        <CTable bordered>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Provider</CTableHeaderCell>
              <CTableHeaderCell scope="col">Marque</CTableHeaderCell>
              <CTableHeaderCell scope="col">Speed</CTableHeaderCell>
              <CTableHeaderCell scope="col">Resolution</CTableHeaderCell>
              <CTableHeaderCell scope="col">Warranty</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Affected To Department</CTableHeaderCell>
              <CTableHeaderCell scope="col">Affected To Owner</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {printers.map((t, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{t.provider}</CTableDataCell>
                  <CTableDataCell>{t.marque}</CTableDataCell>
                  <CTableDataCell>{t.speed}</CTableDataCell>
                  <CTableDataCell>{t.resolution}</CTableDataCell>
                  <CTableDataCell>{t.warrantyPeriod}</CTableDataCell>
                  <CTableDataCell>{t.date}</CTableDataCell>
                  <CTableDataCell>
                    {t.affectedToDepartment ? t.affectedToDepartment : 'No One'}
                  </CTableDataCell>
                  <CTableDataCell>
                    {t.affectedToOwner ? t.affectedToOwner.username : 'No One'}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="success"
                      value={t.id}
                      onClick={(e) => showUpdateModal(e.target.value)}
                    >
                      Modify
                    </CButton>
                    <CButton
                      color="danger"
                      value={t.id}
                      onClick={(e) => deletePrint(e.target.value)}
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

      {/* Update Computer Modal */}
      <CModal size="lg" visible={visibleUpdate} onClose={() => setVisibleUpdate(false)}>
        <CModalHeader>
          <CModalTitle>Modify Printer</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {providerERROR && (
            <CToast
              autohide={false}
              visible={true}
              color="danger"
              className="text-white align-items-center"
            >
              <div className="d-flex">
                <CToastBody>{providerERROR}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          )}
          {marqueERROR && (
            <CToast
              autohide={false}
              visible={true}
              color="danger"
              className="text-white align-items-center"
            >
              <div className="d-flex">
                <CToastBody>{marqueERROR}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          )}
          {speedERROR && (
            <CToast
              autohide={false}
              visible={true}
              color="danger"
              className="text-white align-items-center"
            >
              <div className="d-flex">
                <CToastBody>{speedERROR}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          )}
          {resolutionERROR && (
            <CToast
              autohide={false}
              visible={true}
              color="danger"
              className="text-white align-items-center"
            >
              <div className="d-flex">
                <CToastBody>{resolutionERROR}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          )}
          {warrantyERROR && (
            <CToast
              autohide={false}
              visible={true}
              color="danger"
              className="text-white align-items-center"
            >
              <div className="d-flex">
                <CToastBody>{warrantyERROR}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          )}
          {dateERROR && (
            <CToast
              autohide={false}
              visible={true}
              color="danger"
              className="text-white align-items-center"
            >
              <div className="d-flex">
                <CToastBody>{dateERROR}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
              </div>
            </CToast>
          )}

          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Provider</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                value={provider}
                onChange={(e) => {
                  setProvider(e.target.value)
                }}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Marque</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                value={marque}
                onChange={(e) => {
                  setMarque(e.target.value)
                }}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Speed</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                value={speed}
                onChange={(e) => {
                  setSpeed(e.target.value)
                }}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Resolution</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                value={resolution}
                onChange={(e) => {
                  setResolution(e.target.value)
                }}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Warranty Period</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                value={warranty}
                onChange={(e) => {
                  setWarranty(e.target.value)
                }}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Date</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value)
                }}
              />
            </div>
            <div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Affected to</CFormLabel>
                <tr />
                <CFormLabel htmlFor="exampleFormControlInput1">Departement</CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  onChange={(e) => {
                    departementSelected(e.target.value)
                  }}
                >
                  <option value={departement == null ? '' : departement}>
                    {departement == null ? 'No One' : departement}
                  </option>
                  {departements.map((t, index) => {
                    return (
                      <option value={t.name} key={index}>
                        {t.name}
                      </option>
                    )
                  })}
                </CFormSelect>
                <tr />
                <CFormLabel htmlFor="exampleFormControlInput1">Member</CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  onChange={(e) => {
                    setOwner(owners[e.target.value])
                  }}
                disabled={isDisabled}
                >
                  <option value="">No One</option>
                  {owners.map((t, index) => {
                    return (
                      <option value={index} key={index}>
                        {t.username}
                      </option>
                    )
                  })}
                </CFormSelect>
              </div>
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
    </>
  )
}

export default Printers

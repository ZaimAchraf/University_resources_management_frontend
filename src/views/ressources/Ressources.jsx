import { CForm, CFormCheck, CFormInput, CToast, CToastBody, CToastClose } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react'
import { CFormLabel, CFormSelect } from '@coreui/react'
import Swal from 'sweetalert2'
import { getOwnersByDepartement, addComputer } from './../../services/ComputerService'
import { addPrinter } from 'src/services/PrinterService'
import { getAllDepartements, getUsers } from './../../services/ComputerService'

const Ressources = () => {
  const [owners, setOwners] = useState([])
  const [users, setUsers] = useState([])
  const [departements, setDepartements] = useState([])
  const [owner, setOwner] = useState('')
  const [departement, setDepartement] = useState('')
  const [_id, setId] = useState('')
  const [provider, setProvider] = useState('')
  const [providerERROR, setProviderERROR] = useState('')
  const [CPU, setCPU] = useState('')
  const [CPUERROR, setCPUERROR] = useState('')
  const [RAM, setRAM] = useState('')
  const [RAMERROR, setRAMERROR] = useState('')
  const [marque, setMarque] = useState('')
  const [marqueERROR, setMarqueERROR] = useState('')
  const [hardDisk, setHardDisk] = useState('')
  const [hardDiskERROR, setHardDiskERROR] = useState('')
  const [screen, setScreen] = useState('')
  const [screenERROR, setScreenERROR] = useState('')
  const [speed, setSpeed] = useState('')
  const [speedERROR, setSpeedERROR] = useState('')
  const [resolution, setResolution] = useState('')
  const [resolutionERROR, setResolutionERROR] = useState('')
  const [warranty, setWarranty] = useState('')
  const [warrantyERROR, setWarrantyERROR] = useState('')
  const [date, setDate] = useState('')
  const [dateERROR, setDateERROR] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [isComputerForm, setIsComputerForm] = useState(false)
  const [isPrinterForm, setIsPrinterForm] = useState(false)

  useEffect(() => {
    getAllDepartements().then((resp) => {
      // console.log(resp);
      setDepartements(resp)
    })

    getUsers().then((resp) => {
      console.log(resp);
      setUsers(resp)
    })
  }, [])

  const handleAddComputer = () => {
    provider.trim() === '' ? setProviderERROR('provider field is required') : setProviderERROR('')
    CPU.trim() === '' ? setCPUERROR('CPU field is required') : setCPUERROR('')
    marque.trim() === '' ? setMarqueERROR('Marque field is required') : setMarqueERROR('')
    hardDisk.trim() === '' ? setHardDiskERROR('HardDisk field is required') : setHardDiskERROR('')
    screen.trim() === '' ? setScreenERROR('Screen field is required') : setScreenERROR('')
    warranty.trim() === '' ? setWarrantyERROR('Warranty field is required') : setWarrantyERROR('')
    date.trim() === '' ? setDateERROR('Date field is required') : setDateERROR('')
    RAM.trim() === '' ? setRAMERROR('RAM field is required') : setRAMERROR('')
    speed.trim() === '' ? setSpeedERROR('RAM field is required') : setSpeedERROR('')
    resolution.trim() === '' ? setResolutionERROR('RAM field is required') : setResolutionERROR('')

    if (provider.trim() !== '' && warranty.trim() !== '' && date.trim() !== '') {
      if (isComputerForm) {
        if (owner !== '' && departement !== '') {
          addComputer({
            provider: provider,
            cpu: CPU,
            ram: RAM,
            marque: marque,
            hardDisk: hardDisk,
            screen: screen,
            warrantyPeriod: warranty,
            date: date,
            affectedToOwner: owner,
            affectedToDepartment: departement,
          })
        } else if (departement !== '') {
          addComputer({
            provider: provider,
            cpu: CPU,
            ram: RAM,
            marque: marque,
            hardDisk: hardDisk,
            screen: screen,
            warrantyPeriod: warranty,
            date: date,
            affectedToDepartment: departement,
          })
        } else {
          addComputer({
            provider: provider,
            cpu: CPU,
            ram: RAM,
            marque: marque,
            hardDisk: hardDisk,
            screen: screen,
            warrantyPeriod: warranty,
            date: date,
          })
        }
      } else if (isPrinterForm) {
        if (owner !== '' && departement !== '') {
          addPrinter({
            provider: provider,
            marque: marque,
            speed: speed,
            resolution: resolution,
            warrantyPeriod: warranty,
            date: date,
            affectedToOwner: owner,
            affectedToDepartment: departement,
          })
        } else if (departement !== '') {
          addPrinter({
            provider: provider,
            marque: marque,
            speed: speed,
            resolution: resolution,
            warrantyPeriod: warranty,
            date: date,
            affectedToDepartment: departement,
          })
        } else {
          addPrinter({
            provider: provider,
            marque: marque,
            speed: speed,
            resolution: resolution,
            warrantyPeriod: warranty,
            date: date,
            affectedToOwner: owner,
          })
        }
      }

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Resource added with success',
        showConfirmButton: false,
        timer: 1500,
      })
    }
    setProvider('')
    setMarque('')
    setSpeed('')
    setResolution('')
    setWarranty('')
    setDate('')
    setOwner('')
    setDepartement('')
  }

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

  const handleWichRessource = (ressource) => {
    console.log(ressource)
    if (ressource === 'computer') {
      setIsComputerForm(true)
      setIsPrinterForm(false)
    } else if (ressource === 'printer') {
      setIsPrinterForm(true)
      setIsComputerForm(false)
    } else {
      setIsPrinterForm(false)
      setIsComputerForm(false)
    }
  }

  const styles = {
    ressourceForm: {
      padding: '10px 15px',
      backgroundColor: '#EEE',
      width: '80%',
    },
  }

  return (
    <>
      <div style={{ backgroundColor: '#fff', padding: '15px' }}>
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
        {CPUERROR && (
          <CToast
            autohide={false}
            visible={true}
            color="danger"
            className="text-white align-items-center"
          >
            <div className="d-flex">
              <CToastBody>{CPUERROR}</CToastBody>
              <CToastClose className="me-2 m-auto" white />
            </div>
          </CToast>
        )}
        {RAMERROR && (
          <CToast
            autohide={false}
            visible={true}
            color="danger"
            className="text-white align-items-center"
          >
            <div className="d-flex">
              <CToastBody>{RAMERROR}</CToastBody>
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
        {hardDiskERROR && (
          <CToast
            autohide={false}
            visible={true}
            color="danger"
            className="text-white align-items-center"
          >
            <div className="d-flex">
              <CToastBody>{hardDiskERROR}</CToastBody>
              <CToastClose className="me-2 m-auto" white />
            </div>
          </CToast>
        )}
        {screenERROR && (
          <CToast
            autohide={false}
            visible={true}
            color="danger"
            className="text-white align-items-center"
          >
            <div className="d-flex">
              <CToastBody>{screenERROR}</CToastBody>
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
              <CFormSelect
                aria-label="Default select example"
                onChange={(e) => {
                  setProvider(e.target.value)
                }}
              >
                <option value="">No One</option>
                {users.map((t, index) => {
                  let test = false;
                  t.authorities.forEach(element => {
                    if (element.name == "ROLE_PROVIDER"){
                      test = true;
                    }
                  });

                  if (test){
                    return (
                      <option value={t.email} key={index}>
                        {t.username}
                      </option>
                    )
                  }
                  
                  
                })}
              </CFormSelect>
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
            <CFormLabel htmlFor="exampleFormControlInput1">Wich resource</CFormLabel>
            <div style={{ padding: '5px 15px' }}>
              <CFormLabel htmlFor="exampleFormControlInput1" style={{ margin: '0px 5px' }}>
                Computer
              </CFormLabel>
              <CFormCheck
                type="radio"
                name="wichRessource"
                onChange={(e) => {
                  handleWichRessource(e.target.value)
                }}
                value="computer"
              />
              <span style={{ margin: '0px 10px' }} />
              <CFormLabel htmlFor="exampleFormControlInput1" style={{ margin: '0px 5px' }}>
                Printer
              </CFormLabel>
              <CFormCheck
                type="radio"
                onChange={(e) => {
                  handleWichRessource(e.target.value)
                }}
                name="wichRessource"
                value="printer"
              />
            </div>
          </div>

          <center style={{ margin: '10px auto' }}>
            {isComputerForm && (
              <div style={styles.ressourceForm}>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">CPU</CFormLabel>
                  <CFormInput
                    type="text"
                    id="exampleFormControlInput1"
                    value={CPU}
                    onChange={(e) => {
                      setCPU(e.target.value)
                    }}
                  />
                </div>

                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">RAM</CFormLabel>
                  <CFormInput
                    type="text"
                    id="exampleFormControlInput1"
                    value={RAM}
                    onChange={(e) => {
                      setRAM(e.target.value)
                    }}
                  />
                </div>

                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Hard disk</CFormLabel>
                  <CFormInput
                    type="text"
                    id="exampleFormControlInput1"
                    value={hardDisk}
                    onChange={(e) => {
                      setHardDisk(e.target.value)
                    }}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Screen</CFormLabel>
                  <CFormInput
                    type="text"
                    id="exampleFormControlInput1"
                    value={screen}
                    onChange={(e) => {
                      setScreen(e.target.value)
                    }}
                  />
                </div>
              </div>
            )}

            {isPrinterForm && (
              <div style={styles.ressourceForm}>
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
              </div>
            )}
          </center>

          <div className="mb-3" style={{ border: '1px solid', padding: '15px' }}>
            <h4>Affectation</h4>

            <div className="mb-2">
              <CFormLabel htmlFor="exampleFormControlInput1">Warranty Period</CFormLabel>
              <CFormInput
                type="date"
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
                type="date"
                id="exampleFormControlInput1"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value)
                }}
              />
            </div>
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
                <option value="">No One</option>
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
        <CButton color="success" onClick={handleAddComputer} style={{ margin: '10px' }}>
          Add
        </CButton>
      </div>
    </>
  )
}
export default Ressources

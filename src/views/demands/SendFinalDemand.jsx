import { CForm, CFormCheck, CFormInput, CToast, CToastBody, CToastClose } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react'
import { CFormLabel, CFormSelect } from '@coreui/react'
import Swal from 'sweetalert2'
import { sendDemandToRespRes } from 'src/services/ChefDefService'

const SendFinalDemand = () => {
  const [_id, setId] = useState('')
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
  const [Qte, setQte] = useState(1)
  const [resolutionERROR, setResolutionERROR] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [isComputerForm, setIsComputerForm] = useState(false)
  const [isPrinterForm, setIsPrinterForm] = useState(false)
  const [demand, setDemand] = useState([])

  const addResource = () => {
    // CPU.trim() === '' ? setCPUERROR('CPU field is required') : setCPUERROR('')
    // marque.trim() === '' ? setMarqueERROR('Marque field is required') : setMarqueERROR('')
    // hardDisk.trim() === '' ? setHardDiskERROR('HardDisk field is required') : setHardDiskERROR('')
    // screen.trim() === '' ? setScreenERROR('Screen field is required') : setScreenERROR('')
    // RAM.trim() === '' ? setRAMERROR('RAM field is required') : setRAMERROR('')
    // speed.trim() === '' ? setSpeedERROR('RAM field is required') : setSpeedERROR('')
    // resolution.trim() === '' ? setResolutionERROR('RAM field is required') : setResolutionERROR('')

    if (isComputerForm) {
      demand.push({
        cpu: CPU,
        ram: RAM,
        marque: marque,
        hardDisk: hardDisk,
        screen: screen,
        qte: Qte,
      })
      setDemand(demand)
    } else if (isPrinterForm) {
      demand.push({
        marque: marque,
        speed: speed,
        qte: Qte,
        resolution: resolution,
      })
      setDemand(demand)
    }

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Resource has been added to request',
      showConfirmButton: false,
      timer: 1500,
    })
    console.log(demand)
  }

  useEffect(()=>{
    console.log("hey")
  }, [])

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

  const send = () => {
    sendDemandToRespRes(demand)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Request has been sent successfully',
      showConfirmButton: false,
      timer: 1500,
    })
    setDemand([])
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

        <CForm>

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

          <div className="mb-3">
            <CFormLabel htmlFor="exampleFormControlInput1">Qte</CFormLabel>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              value={Qte}
              onChange={(e) => {
                setQte(e.target.value)

              }}
            />
          </div>

        </CForm>
        <CButton color="success" onClick={addResource} style={{ margin: '10px' }}>
          Add To Request
        </CButton>
        <CButton color="success" onClick={send} style={{ margin: '10px' }}>
          Send Request
        </CButton>
      </div>
    </>
  )
}
export default SendFinalDemand

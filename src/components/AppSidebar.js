import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { cilCursor } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'
import { CNavItem, CBadge } from '@coreui/react'


import SimpleBar from 'simplebar-react'
import Swal from 'sweetalert2'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { sendDemandRequest } from 'src/services/ChefDefService'



const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  var existElement = false
  try{
    existElement = JSON.parse(localStorage.getItem("user")).roles.includes("ROLE_CHEF_DEP")
  }catch(error){

  }
  const sendRequest = (e) => {
    e.preventDefault()
    var user = JSON.parse(localStorage.getItem("user"));
    

    var demand = {
      "sender" : user.id,
      "department" : user.department
    }
    sendDemandRequest(demand)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Request sent with success',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <strong style={{ fontSize: '20px' }}>Resources Management</strong>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        {existElement &&
            (<CNavItem>
              <a className="nav-link" href="#/my-resources"
                onClick={sendRequest}
              >
                <CIcon icon={cilCursor} customClassName="nav-icon" />
                Available Budget
                <CBadge color="info" className="ms-auto">
                  Test
                </CBadge>
              </a>
            </CNavItem>)
        } 
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)

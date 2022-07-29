import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authentified, checkRoles } from 'src/protectedRoutes/checkRoles'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
const Dashboard = () => {

  const navigate = useNavigate();
  useEffect( ()=>{
    if(authentified()){
      // let check = checkRoles(["ROLE_ADMIN"]);
      // if(!check){
      //   navigate("../404", { replace: true });
      // }
    }else{
      navigate("../login", { replace: true });
    }
  })

  return <WidgetsDropdown />
}

export default Dashboard

/* eslint-disable react/prop-types */
import React from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from 'react';


const  ProtectedRoute = ({element:Component,role,path,...rest}) =>{

  useEffect(()=>{
      console.log("ttttttt");
  },[]);

  let location = useLocation();

  return <Routes>
    <Route
        {...rest}
        path={path}
        render={(props) =>
          false ? <Component {...props} /> : <Navigate to="/login" state={{ from: location }} replace />
        }
      />
  </Routes>
}

export default ProtectedRoute;



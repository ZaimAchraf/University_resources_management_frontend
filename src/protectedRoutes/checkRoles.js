
export function checkRoles(roles=["user"]){

    let currentRoles = localStorage.getItem("roles").split(",");

    let status = false;
    roles.forEach(role => {
        currentRoles.forEach(r =>{
          if (r === role ){
            status =  true;
          }
        });
    });

    return status;
}

export function authentified(){

  if(localStorage.getItem("token")){
    return true;
  }
  return false;
}

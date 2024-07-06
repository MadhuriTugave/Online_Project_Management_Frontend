export const SetUser = (user)=>{
    return{
    payload:user,
    type:"setUser"
}
}
export const UpdateUser = (user)=>{

 return{
    payload:user,
    type:"updateUser"

 }
}
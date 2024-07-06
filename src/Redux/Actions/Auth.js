export const setToken =(token)=>{
       return{
        type:"setToken",
        payload: token
       }
}


export const removeToken =()=>{
    return{
        type:"removeToken",
        
    }
}
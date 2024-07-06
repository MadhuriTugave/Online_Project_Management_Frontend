const InitialState = {
    Token : localStorage.getItem("access_token") || null
}

export const AuthCreater =(state=InitialState,action)=>{


    if(action.type === "setToken"){
      return{
          ...state,
          token : action.payload
}
    }

    if(action.type === "removeToken"){
          return{
            ...state,
            token: null
          }
    }
    return state
} 


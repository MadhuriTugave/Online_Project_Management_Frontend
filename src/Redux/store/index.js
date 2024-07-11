import { combineReducers, createStore } from "redux";
import { userCreater } from "../Reducers";


export const store = createStore(
       combineReducers({
        LoginLogoutUser : userCreater,
     
       })
)
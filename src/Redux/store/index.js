import { combineReducers, createStore } from "redux";
import { userCreater } from "../Reducers";
import { AuthCreater } from "../Reducers/AuthReducer";

export const store = createStore(
       combineReducers({
        LoginLogoutUser : userCreater,
        Auth : AuthCreater
       })
)
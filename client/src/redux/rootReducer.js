
//importing combineReducer 
import {combineReducers} from "redux";

//importing tripData reducer from reducer
 import { userData,adminData,formData} from "./reducer";



 // exporting root reducer which combine all reducers
 export default combineReducers({
   userData,
   adminData,
   formData
 })
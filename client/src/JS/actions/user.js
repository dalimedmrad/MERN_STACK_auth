import { FAIL_USER, LOAD_USER, REGISTER_USER,LOGIN_USER, CURRENT_USER, LOGOUT_USER } from "../const/user";
import axios from "axios";

export const registerUser = (user,history) => async (dispatch) =>{

    dispatch({type:LOAD_USER});
    try{
       const result = await axios.post("api/user/register",user);
       dispatch({type:REGISTER_USER,payload:result.data});
       history.push("/home");

    }catch(error){
        const {errors,msg} = error.response.data;
        if(Array.isArray(errors))errors.map(err=>alert(err.msg));
        if(msg)alert(msg);        dispatch({type:FAIL_USER,payload:error.response.data});
    }
}

export const loginUser = (user,history) => async (dispatch) =>{
    
    dispatch({type:LOAD_USER});
    try{
       const result = await axios.post("api/user/login",user);
       dispatch({type:LOGIN_USER,payload:result.data});
       history.push("/home");
    }catch(error){
        const {errors,msg} = error.response.data;
        if(Array.isArray(errors))errors.map(err=>alert(err.msg));
        if(msg)alert(msg);
        // dispatch({type:FAIL_USER,payload:error.response.data});
    }
}

export const current = () => async (dispatch) =>{
    dispatch({type:LOAD_USER});
    const options = {
        headers:{
            authorization: localStorage.getItem("token")
        }
    }
    try{
       let result =  await axios.get("api/user/current",options);
       dispatch({type:CURRENT_USER,payload:result.data.user});
    }catch(error){
        dispatch({type:FAIL_USER,payload:error.response.data});
    }
};

export const logout = ()=>{
    return {
        type:LOGOUT_USER
    }
}


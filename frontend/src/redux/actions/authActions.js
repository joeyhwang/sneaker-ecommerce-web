import {AUTH, LOGOUT} from '../constants/authConstants'
import axios from 'axios'


export const signOut = (router) => async (dispatch) => {
    try {
        await axios.get("/logout")
        dispatch({type: LOGOUT})
        router.push('/')
    } catch (err) { 
        console.log(err)
    }
}

export const signIn = (router) => async (dispatch) => {
    try {
        const res = await axios.get('/profile', {withCredentials:true})
        dispatch({type: AUTH, data: res.data})
    } catch (err) {
        console.log(err)
    }

}
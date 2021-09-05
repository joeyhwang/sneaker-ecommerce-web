import * as actionTypes from '../constants/sneakerConstants'
import axios from 'axios'

export const getSneakers = (brand) => async (dispatch) => {
    try {
        dispatch({type: actionTypes.GET_SNEAKERS})

        const {data} = await axios.get(`/api/sneakers/shop/${brand}`)

        dispatch({
            type: actionTypes.GET_SNEAKERS_SUCCESS,
            payload: data
        })
    
    } catch(error) {
        dispatch({
            type: actionTypes.GET_SNEAKERS_FAILURE,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message,
        })
    }
}

export const getSneakerDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: actionTypes.GET_SNEAKER_DETAILS})

        const {data} = await axios.get(`/api/sneakers/${id}`)

        dispatch({
            type: actionTypes.GET_SNEAKER_DETAILS_SUCCESS,
            payload: data
        })
    
    } catch(error) {
        dispatch({
            type: actionTypes.GET_SNEAKER_DETAILS_FAILURE,
            payload: error.response && error.response.data.message
            ? error.response.data.message : error.message,
        })
    }
}

export const removeProductDetails = () => (dispatch) => {
    dispatch({
        type: actionTypes.GET_SNEAKER_DETAILS_RESET
    })
}
import * as actionTypes from '../constants/sneakerConstants'

export const getSneakersReducer = (state = { sneakers: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_SNEAKERS:
            return {
                loading: true,
                sneakers: []
            }
        case actionTypes.GET_SNEAKERS_SUCCESS:
            return {
                loading: false,
                sneakers: action.payload
            }
        case actionTypes.GET_SNEAKERS_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
    
}

export const getSneakerDetailsReducer = (state = {sneaker: {}}, action)  => {
    switch(action.type) {
        case actionTypes.GET_SNEAKER_DETAILS:
            return {
                loading: true,
            }
        case actionTypes.GET_SNEAKER_DETAILS_SUCCESS:
            return {
                loading: false,
                sneaker: action.payload
            }
        case actionTypes.GET_SNEAKER_DETAILS_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.GET_SNEAKER_DETAILS_RESET:
            return {
                sneaker: {}
            }
        default:
            return state

    }
}
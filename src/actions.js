import * as CONSTANTS from './constants.js'
import * as customers from './customers.json'

export const setSearchField = (text) => ({
    type: CONSTANTS.CHANGE_SEARCH_FIELD,
    payload: text
})

// export const requestCustomers = () => (dispatch) => {
//     dispatch({type : CONSTANTS.REQUEST_ROBOTS_PENDING});
//     fetch('./customers.js')
//         .then(response => response.json())
//         .then(data => dispatch({type : CONSTANTS.REQUEST_ROBOTS_SUCCESS, payload: data}))
//         .catch(error => dispatch({type : CONSTANTS.REQUEST_ROBOTS_FAILED, payload: error}))
// }

export const setTargetComponent = (text) => ({
    type : CONSTANTS.NAVIGATION_CLICK,
    payload : text
})

export const requestCustomers = () => (dispatch) => {
    console.log(customers)
    dispatch({type : CONSTANTS.REQUEST_ROBOTS_SUCCESS, payload: customers}) 
}
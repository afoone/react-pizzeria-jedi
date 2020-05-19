import { PIZZAS_FETCH_SUCCEED } from '../actions'
import { global } from '../reduxInitiaState'

const pizzas = (state = global, action) => {
    console.log("redux", action)

    switch (action.type) {
    case PIZZAS_FETCH_SUCCEED:
        return {
            ...state,
            pizzas: action.payload.pizzas
        }

    
    default:
        break;
    }
    
    return state
}

export default pizzas
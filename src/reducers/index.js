import { PIZZAS_FETCH_SUCCEED, DELETE_PIZZA } from '../actions'
import { global } from '../reduxInitiaState'

const pizzas = (state = global, action) => {
    console.log("redux", action)

    switch (action.type) {

        case PIZZAS_FETCH_SUCCEED:
            return {
                ...state,
                pizzas: action.payload.pizzas
            }

        case DELETE_PIZZA:
            return {
                ...state,
                pizzas: state.pizzas.filter(i => i.id !== action.payload.id),
            }

        default:
            break;
    }

    return state
}

export default pizzas
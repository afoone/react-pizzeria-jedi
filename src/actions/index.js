import {db} from '../config/firebase'
export const PIZZAS_FETCH_SUCCEED = "FETCH_PIZZAS_SUCCEED"
export const PIZZAS_ADD = "PIZZAS_ADD"


export const fetchPizzasSucceed = pizzas => {
    return {
        type: PIZZAS_FETCH_SUCCEED,
        payload: {
            pizzas: pizzas
        } 
    }
}

export const fetchPizzas = () => {
    return dispatch => {
        db.collection("pizzas").get().then(
            res => {
                console.log("fetchPizzas",res)
                    const elementos = res.docs.map(
                        item => {
                            const data = item.data();
                            return {
                                id: item.id,
                                image: data.image,
                                name: data.name,
                                novelty: data.novelty,
                                price: data.price
                            }
                        }
                    )
                    dispatch(fetchPizzasSucceed(elementos))
            }
        )
    }
}

// test
export const addPizzas = () => {
    return dispatch => {
        db.collection("pizzas").set().then(
            res => {
                console.log("addPizzas",res)
                    const items = res.docs.map(
                        item => {
                            const data = item.data();
                            return {
                                id: item.id,
                                image: data.image,
                                name: data.name,
                                novelty: data.novelty,
                                price: data.price
                            }
                        }
                    )
                    dispatch(fetchPizzasSucceed(items))
            }
        )
    }
}
import {db} from '../config/firebase'
export const PIZZAS_FETCH_SUCCEED = "FETCH_PIZZAS_SUCCEED"



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
                                price: data.price,
                                ingredientes: data.ingredientes
                            }
                        }
                    )
                    dispatch(fetchPizzasSucceed(elementos))
            }
        )
    }
}


export const fetchPizzasPromo = () => {
    return dispatch => {
        db.collection("pizzas").get().then(
            res => {
                console.log("fetchPizzas",res)
                    const elementos = res.docs.map(
                        item => {
                            const data = item.data();
                            if (data.novelty)
                            return {
                                id: item.id,
                                image: data.image,
                                name: data.name,
                                novelty: data.novelty,
                                price: data.price,
                                ingredientes: data.ingredientes
                            }
                        }
                    )
                    const elementosNovedades = elementos.filter(i => i !== undefined)
                    dispatch(fetchPizzasSucceed(elementosNovedades))
            }
        )
    }
}


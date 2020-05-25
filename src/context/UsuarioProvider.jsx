import React from "react";
import { db, auth, provider, storage } from "../config/firebase";
import {STORAGE} from './constants'
import { toast } from "react-toastify";


export const UsuarioContext = React.createContext();

const UsuarioProvider = (props) => {


  const dataUsuario = { uid: null, email: null, estado: null };
  const [usuario, setUsuario] = React.useState(dataUsuario);

  React.useEffect(() => {
    detectarUsuario();
    // para evitar el warning por no poner las dependencias en [] se puede añadir el comentario de abajo cuando la dependencia nos de un loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const detectarUsuario = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("usuarios")
          .doc(user.email)
          .get()
          .then((res) => {
            // console.log('usuarios', res.data())
            setUsuario({
              uid: user.uid,
              email: user.email,
              displayName: (res.data().exists ? res.data().displayName : user.displayName),
              photoURL: (res.data().exists ? res.data().photoURL : user.photoURL),
              role: (res.data().role ),
              estado: true
            });
          });
      } else {
        setUsuario({
          uid: null,
          email: null,
          displayName: null,
          photoURL: null,
          estado: false
        });
      }
    });
  };

  const ingresoGoogle = async () => {
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };

  const cerrarSesion = () => {
    auth.signOut();
  };

  const actualizarUsuario = async (usuario, nombreUsuario) => {
    console.log("el nuevo nickname es", nombreUsuario);
    console.log("user email", usuario.email);
    try {
      await db.collection("usuarios").doc(usuario.email).update({
        displayName: nombreUsuario,
      });

      setUsuario({
        ...usuario,
        displayName: nombreUsuario,
      });

      console.log("nuevo usuario", usuario);
    } catch (error) {
      console.log(error);
    }
  };

  const editarFoto = async (usuario, imagenEditada) => {
    console.log("vamos a actualizar la imagen de ", usuario.email);
    console.log("la imagen actualizada", imagenEditada);

    try {
      const imagenRef = storage.ref().child(usuario.email).child("foto perfil");
      await imagenRef.put(imagenEditada);
      const imagenURL = await imagenRef.getDownloadURL();

      await db.collection("usuarios").doc(usuario.email).update({
        photoURL: imagenURL,
      });

      setUsuario({
        ...usuario,
        photoURL: imagenURL,
        estado:true
      });
    } catch (error) {
      console.log(error);
    }
  };





// array de pizzas
 const [products, setProducts] = React.useState([]);
 const [error, setError] = React.useState(null);

// array con los productos del carrito
const [productsCart, setProductsCart] = React.useState([]);

React.useEffect(() => {

    db.collection("pizzas").get()
    .then(
        res => {
           // console.log("listado de Pizzas", res.docs)
           const pizzas = res.docs.map(
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
        console.log('Listado de Pizzas', pizzas)
        setProducts(pizzas)
        setError('succes')
        }        
    )
    .catch(setError("error"));
  // console.log("listado de Pizzas", products)


  cargarProductos();
}, []);



  const cargarProductos = () => {
    const idsProducts = localStorage.getItem(STORAGE);

    if (idsProducts) {
      //convertirlo en array
      const idsProductsSplit = idsProducts.split(",");
      setProductsCart(idsProductsSplit);
    } else {
      setProductsCart([]);
    }
  };

  const agregarProducto = (id, name) => {
   // console.log("agregar producto", id, name);

    const idsProducts = productsCart;

    idsProducts.push(id);

    // console.log('array agreagar', idsProducts)

    setProductsCart(idsProducts);

   // console.log("array agreagar", productsCart);

    // guardar en base de datos o localstorage(clave : valor)
    localStorage.setItem(STORAGE, productsCart);

    cargarProductos();
    // console.log('Producto añadido')
    toast.success(`${name} añadido al carrito correctamente`);
  };



const carritodataBase = async(productMiCart, usuario, totalPrice, productsCart) => {
 console.log("id usuario", usuario, productMiCart, totalPrice, productsCart);
 console.log("pizza usuario", usuario.uid);

 
   const nuevoCarrito = {
    fecha: new Date().toLocaleDateString(),
    totalPrice: totalPrice,
    productscart: productsCart,
    pizza: productMiCart.map( item => {
      return {
        id: item.id,
        name: item.name,
        price: item.price
    }
    })
  };
 console.log("nuevo producto", nuevoCarrito);

 
  try {
  await db.collection('usuarios').doc(usuario.email).collection('carrito').add(nuevoCarrito);
  
} catch (error) {
  console.log(error);
}
 


 
};






  return (
    <UsuarioContext.Provider
      value={{
        // usuario
        usuario,
        ingresoGoogle,
        cerrarSesion,
        editarFoto,
        actualizarUsuario,

        // carrito
        products,
        productsCart,
        agregarProducto,
        cargarProductos,
        carritodataBase
      }}
    >
      {props.children}
    </UsuarioContext.Provider>
  );
};

export default UsuarioProvider;

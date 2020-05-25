import React from "react";
import Perfil from "../components/Perfil";
import { withRouter } from "react-router-dom";
import { auth } from "../config/firebase";
import MiCarrito from "../components/MiCarrito";

import './carrito.css'

const Carrito = (props) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (auth.currentUser) {
      console.log("existe");
      setUser(auth.currentUser);
    } else {
      console.log("no existe");
      props.history.push("/login");
    }
  }, [props.history]);

  return (
    <div>
      {user && (
        <div className='carrito'>
          <Perfil ></Perfil>
          <MiCarrito user={user}></MiCarrito>
        </div>
      )}
    </div>
  );
};

export default withRouter(Carrito);

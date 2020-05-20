import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Reset from "./components/Reset";
import PizzaList from "./components/PizzaList";
import Login from "./components/Login";
import { auth } from "./config/firebase";
import PizzaCardPage from "./pages/PizzaCardPage";

const App = () => {
  const [firebaseUser, setFirebaseUser] = React.useState(false);

  React.useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged((user) => {
        console.log("aqui esta el usuario", user);
        if (user) {
          setFirebaseUser(user);
        } else {
          setFirebaseUser(null);
        }
      });
    };
    fetchUser();
  }, []);

  return firebaseUser !== false ? (
    <Router>
      <Navbar firebaseUser={firebaseUser} ></Navbar>
      <Switch>
        <Route path="/home" exact></Route>
        <Route path="/pizzaAdd" exact></Route>
        <Route path="/pizzas" exact>
          <PizzaList></PizzaList>
        </Route>
        <Route path="/promos" exact></Route>
        <Route path="/pizzaId" exact component={PizzaCardPage}></Route>
        <Route path="/login" exact>
          <Login firebaseUser={firebaseUser}></Login>
        </Route>
        <Route path="/reset">
          <Reset />
        </Route>
        <Route path="/carrito" exact />
        <Route path="/" exact>
          Home
        </Route>
      </Switch>
    </Router>
  ) : (
    <div>Cargando...</div>
  );
};

export default App;

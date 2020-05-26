import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Reset from "./components/Reset";
import Login from "./components/Login";
import { auth } from "./config/firebase";
import PizzaCardPage from "./pages/PizzaCardPage";
import PizzaList from './components/PizzaList'
import LandingPage from './pages/LandingPage'
import About from './components/About'
import AddPizzaPage from "./pages/AddPizzaPage";
import IngredienteAdd from './components/IngredienteAdd'
import Carrito from "./pages/Carrito";
import PizzaEdit from './components/PizzaEdit'
import { UsuarioContext } from "./context/UsuarioProvider";
import PizzaSearch from "./components/PizzaSearch";
import Admin from './Admin'




const App = () => {
  const [firebaseUser, setFirebaseUser] = React.useState(false);
  const { usuario } = React.useContext(UsuarioContext);

  React.useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged((user) => {
        // console.log("aqui esta el usuario", user);
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
        <Route path="/ingrediente/:id" component={IngredienteAdd}></Route>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/pizzaA" exact>
        </Route>
        <Route path="/pizzaSearch" exact>
          <PizzaSearch></PizzaSearch>
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="/pizzas" exact component={PizzaList}>
        </Route>
        <Route path="/promos" exact></Route>
        <Route path="/pizzaId/:id" component={PizzaCardPage}></Route>
        <Route path="/pizzaedit/:id" component={PizzaEdit}></Route>
        <Route path="/login" exact>
          <Login firebaseUser={firebaseUser}></Login>
        </Route>
        <Route path="/reset">
          <Reset />
        </Route>
        <Route path="/carrito" exact component={Carrito} />
        {usuario.role === 'admin' ?

          (<Route component={Admin} path="/pizzaAdd" exact>
            <AddPizzaPage />
          </Route>) : null

        }

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

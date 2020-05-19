import React from 'react';
import LandingPage from './pages/LandingPage'
import PizzaList from './components/PizzaList'
import PizzaCardPage from './pages/PizzaCardPage'


function App() {
  return (
    <div className="App">
        <LandingPage/>
      <PizzaList></PizzaList>
    </div>
  );
}

export default App;

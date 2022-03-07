import React from "react";
import './App.css';
import { Home } from "./Home"

function App() {
  return (
    <div className="App">
      <h1>Puplation</h1>
      <Home />
      <br />
      <br />
      <br />
      <br />
     
      <button type="button" class="btn btn-secondary">Secondary</button>
      <button type="button" class="btn btn-danger">Danger</button>
      <button type="button" class="btn btn-warning">Warning</button>
      <button type="button" class="btn btn-info">Info</button>
      <button type="button" class="btn btn-light" data-mdb-ripple-color="dark">Light</button>
      <button type="button" class="btn btn-dark">Dark</button>
    </div>
  );
}

export default App;

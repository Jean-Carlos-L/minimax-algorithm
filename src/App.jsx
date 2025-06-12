import { Route, Routes } from "react-router-dom";
import ListPokemons from "./views/ListPokemons";
import LandingPage from "./views/LandingPage";
import BattlePage from "./views/BattlePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pokemons" element={<ListPokemons />} />
        <Route path="/battle" element={<BattlePage />} />
        {/* Add more routes as needed */}
        {/* Example: <Route path="/about" element={<AboutPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;

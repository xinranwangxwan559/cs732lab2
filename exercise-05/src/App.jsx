import { Route, Routes } from "react-router-dom";
import PokedexLayout from "./PokedexLayout";
import PokedexPage from "./PokedexPage";

/**
 * Main app entry point, controls the routes in this app.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<PokedexLayout />}>
        <Route path="1" element={<PokedexPage id={1} />} />
      </Route>
    </Routes>
  );
}

export default App;

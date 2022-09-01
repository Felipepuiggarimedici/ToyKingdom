import NavBarContainer from "./components/header/NavBarContainer";
import ItemListContainer from "./components/itemInList/ItemListContainer";
import FormToDelete from "./components/formToDelete/FormToDelete";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (<BrowserRouter>
    <header>
        <NavBarContainer/>
    </header>
    <main>
      <Routes>
        <Route exact path="/" element={<ItemListContainer/>}/>
        <Route exact path="/form" element={<FormToDelete/>}/>
      </Routes>
    </main>
  </BrowserRouter>
  );
}

export default App;

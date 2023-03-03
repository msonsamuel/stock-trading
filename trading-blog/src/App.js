import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import StockDetailsPage from "./Pages/StockDetailsPage";
import StockOverviewPage from "./Pages/StockOverviewPage";

function App() {
  return (
    <main className="container">
    <BrowserRouter>
  <Routes>
    <Route path="/"  element={<StockOverviewPage/>} />
    <Route path="/detail/:symbol" element={<StockDetailsPage/>}/>
    </Routes>
</BrowserRouter>

    </main>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Nav from "./components/Nav";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <main className="container">

        <Nav />

        <Routes>
          <Route index element={<Login />} />
        </Routes>

      </main>
    </BrowserRouter>
  )
}

export default App
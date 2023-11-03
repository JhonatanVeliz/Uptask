import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Nav from "./components/Nav";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewProject from "./pages/NewProject";

import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute";
import MicroTasks from "./pages/MicroTasks";

const App = () => {

  const user = useSelector( state => state.login.user );

  return (
    <BrowserRouter>
      <main className="container">

        <Nav />

        <Routes>
          <Route index element={<Login />} />

          <Route element={<ProtectedRoute isAllowed={user} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-project/:user" element={<NewProject />} />
            <Route path="/tasks/:id" element={<MicroTasks />} />
          </Route>

          <Route path="*" element={
            <ProtectedRoute isAllowed={user} redirectTo="/">
              <Dashboard />
            </ProtectedRoute>
          } />

        </Routes>

      </main>
    </BrowserRouter>
  )
}

export default App
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// PAGES
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Farewell from "./pages/Farewell";
import Dashboard from "./pages/Dashboard";
import NewMacroTask from "./pages/NewMacroTask";
import MicroTasks from "./pages/MicroTasks";
import EditUser from "./pages/EditUser";

// COMPONENTS
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute";

const App = () => {

  const { token } = useSelector(({ login }) => login );

  return (
    <BrowserRouter>
      <main className="container">

        <Routes>

          <Route index element={
            <ProtectedRoute isAllowed={token} redirectTo="/login">
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute isAllowed={token} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-project/:user" element={<NewMacroTask />} />
            <Route path="/tasks/:id" element={<MicroTasks />} />
            <Route path="/editUser/:token" element={<EditUser />} />
          </Route>

          <Route path="*" element={
            <ProtectedRoute isAllowed={token} redirectTo="/">
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/farewell" element={<Farewell />} />

        </Routes>

      </main>
    </BrowserRouter>
  )
}

export default App
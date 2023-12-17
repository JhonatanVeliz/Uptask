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
import PasswordReset from "./pages/PasswordReset";
import ForgotPassword from "./pages/ForgotPassword";

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
            <Route path="/update-task/:taskId" element={<NewMacroTask />} />
            <Route path="/tasks/:taskId" element={<MicroTasks />} />
            <Route path="/editUser/:token" element={<EditUser />} />
          </Route>

          <Route path="*" element={
            <ProtectedRoute isAllowed={token} redirectTo="/">
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/password/edit/" element={<ForgotPassword />} />
          <Route path="/farewell" element={<Farewell />} />

        </Routes>

      </main>
    </BrowserRouter>
  )
}

export default App
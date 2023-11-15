import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// PAGES
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Farewell from "./pages/Farewell";
import Dashboard from "./pages/Dashboard";
import NewProject from "./pages/NewProject";
import MicroTasks from "./pages/MicroTasks";

// COMPONENTS
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute";

const App = () => {

  const userToken = useSelector(state => state.login.token);

  return (
    <BrowserRouter>
      <main className="container">

        <Routes>

          <Route index element={
            <ProtectedRoute isAllowed={userToken} redirectTo="/login">
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute isAllowed={userToken} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-project/:user" element={<NewProject />} />
            <Route path="/tasks/:id" element={<MicroTasks />} />
          </Route>

          <Route path="*" element={
            <ProtectedRoute isAllowed={userToken} redirectTo="/">
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
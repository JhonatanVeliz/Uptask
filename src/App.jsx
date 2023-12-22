import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

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

// SLICE
import { login } from "./features/login/loginSlice";
import { changeUserState } from "./features/user/userSlice";

const App = () => {

  const dispatch = useDispatch();

  const tokenSlice = useSelector(({ login }) => login.token);
  const tokenStorage = sessionStorage.getItem('token');

  const user = useSelector( ({ user }) => user.userData) || { name : false };

  const token = tokenStorage || tokenSlice;

  if(token && !user.name){
    const userData = JSON.parse(sessionStorage.getItem('user'));
    dispatch(changeUserState(userData));
  }

  if(!tokenSlice){
    dispatch(login(token));
  }

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
            <Route path="/new-project" element={<NewMacroTask />} />
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
          <Route path="/password/:edit?" element={<ForgotPassword />} />
          <Route path="/farewell" element={<Farewell />} />

        </Routes>

      </main>
    </BrowserRouter>
  )
}

export default App
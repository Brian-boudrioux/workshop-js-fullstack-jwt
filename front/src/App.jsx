import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Nav from "./components/Nav/Nav";
import useStore from "./store";

function App() {
  return (
    <Router>
      <div className='app'>
        <Nav />
        <Routes>
            <Route exact path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route exact path='/login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route exact path='/users' element={<PrivateRoute role="ROLE_ADMIN"><Users /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

const roles = [
  "ROLE_USER",
  "ROLE_ADMIN"
];

const PrivateRoute = ({children, role = "ROLE_USER"}) => {
  const {auth} = useStore();
  if (auth.isLogged) {
    if (auth.user?.role == role || roles.indexOf(auth.user?.role) >= roles.indexOf(role))
      return children;
    else
      return <Navigate to="/" />
  }
  else
    return <Navigate to="/login" />
}

const PublicRoute = ({children}) => {
  const {auth} = useStore();
  if (!auth.isLogged) {
    return children;
  }
  else
    return <Navigate to="/" />
}

export default App;
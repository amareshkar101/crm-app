// import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import LandingPage from "./landingpage/LandingPage"
import SignInOutContainer from "./containers/index"
import Admin from "./pages/Admin";
import RequireAuth from "./component/RequireAuth";
import Engineer from "./pages/Engineer";
import Customer from "./pages/Customer";
import NotFound from "./component/NotFound";
import Unauthorized from './component/Unauthorised';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import '@coreui/coreui/dist/css/coreui.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-circular-progressbar/dist/styles.css';


const ROLES = {
  "CUSTOMER": "CUSTOMER",
  "ENGINEER": "ENGINEER",
  "ADMIN": "ADMIN",
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LandingPage />
              {/* <Login/> */}
            </Suspense>
          }
        />
        {/* Sign-in/Sign-up Route*/}
        <Route path="/singin" element={<SignInOutContainer/>} /> 

        <Route path="unauthorized" element={<Unauthorized />} />
        {/* ROLES.ADMIN ====  [ADMIN] */}
          <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>  
            <Route path="/admin" exact element={<Admin />} />
          </Route>
          {/* ROLES>CUSTOER === [CUSTOMER]   */}
          <Route element={<RequireAuth allowedRoles={[ROLES.CUSTOMER]} />}>
            <Route path="/customer" element={<Customer />} />
          </Route>

          {/* ROLES.ENINEER === ENGINEER */}
          <Route element={<RequireAuth allowedRoles={[ROLES.ENGINEER]} />}>
            <Route path="/engineer" element={<Engineer />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
import App from "../App.jsx";
import Error from "../pages/Error.jsx";
import Signup from "../pages/Signup.jsx";
import Login from "../pages/Login.jsx";
import Serveys from "../pages/serveys.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Feature from "../pages/Feature.jsx";
import Dashboard from "../pages/Dashboard";
import Create from "../components/Create.jsx";
import User from "../components/User.jsx";
import Add_del from "../components/Add_Del.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import ChangePassword from "../pages/ChangePassword.jsx";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Responses from "../components/Responses.jsx";
import Response from "../pages/Response.jsx"
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/serveys" element={<Serveys />}></Route>,
        <Route path="/" element={<Home />}></Route>,
        <Route path="/About" element={<About />}></Route>,
        <Route path="/features" element={<Feature />}></Route>
      </Route>
      ,<Route path="/signup" element={<Signup />}></Route>,
      <Route path="/login" element={<Login />}></Route>,
      <Route path="*" element={<Error />} errorElement={<Error />}></Route>,
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="/dashboard/" element={<User />}></Route>,
        <Route path="/dashboard/create" element={<Create />}></Route>,
        <Route path="/dashboard/add-question" element={<Add_del/>}></Route>,
        <Route path="/dashboard/response" element={<Responses/>}></Route>,
      </Route>
      ,
      <Route path="response/:surveyId" element={<Response/>}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      <Route path="/change-password" element={<ChangePassword />}></Route>

    </>
  )
);
export default router;

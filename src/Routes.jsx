import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PageRender from "./PageRender";
import Home from "./screens/home.jsx";
// import Footer from "./components/footer/footer";
// import Nav from "./components/nav/nav";
import Index from "./pages/index";
import Sidebar from "./components/sidebar/sidebar";
import DefaultHeader from "./components/default-header/default-header";
// import ModalComponents from "./components/ModalComponents";
import { useDispatch, useSelector } from "react-redux";
// import { clearErrors } from "./data/Reducers/ErrorReducer";

const Routers = () => {
  const location = useLocation(),
    { error, auth } = useSelector((state) => state),
    dispatch = useDispatch();
    console.log({auth});
  console.log(location);

  return (
    <>
      <ToastContainer position="top-right" />
      <Sidebar>
        {auth?.isAuth ? <DefaultHeader /> : null}
        <Routes>
          <Route path="/" element={auth?.isAuth ? <Index /> : <Home />} />
          <Route path="/:page" element={<PageRender />} />
          <Route path="/:page/:id" element={<PageRender />} />
          <Route path="/:page/:id/:step" element={<PageRender />} />
        </Routes>
      </Sidebar>
    </>
  );
};

export default Routers;

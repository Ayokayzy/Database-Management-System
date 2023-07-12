import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PageRender from "./PageRender";
import Home from "./screens/home.jsx";
// import Footer from "./components/footer/footer";
// import Nav from "./components/nav/nav";
import Index from "./pages/index";
import Sidebar from "./components/sidebar/sidebar";
// import DefaultHeader from "./components/default-header/default-header";
// import ModalComponents from "./components/ModalComponents";
import { useDispatch, useSelector } from "react-redux";
// import { clearErrors } from "./data/Reducers/ErrorReducer";

const Routers = () => {
  const location = useLocation(),
    { error, auth } = useSelector((state) => state),
    dispatch = useDispatch();
  console.log(location);

  // const navControl = () => {
  // 	if (
  // 		!auth?.isAuth &&
  // 		!["/login", "/register", "/checkout", "/otp"]?.includes(
  // 			location?.pathname
  // 		)
  // 	) {
  // 		return true;
  // 	} else {
  // 		return false;
  // 	}
  // };

  return (
    <>
      <ToastContainer position="bottom-center" />
      <Sidebar>
        {/* {auth?.isAuth ? <DefaultHeader /> : null} */}
        {/* {navControl() ? <Nav /> : null} */}
        <Routes>
          <Route path="/" element={auth?.isAuth ? <Index /> : <Home />} />
          <Route path="/:page" element={<PageRender />} />
          <Route path="/:page/:id" element={<PageRender />} />
          <Route path="/:page/:id/:step" element={<PageRender />} />
        </Routes>
      </Sidebar>
      {/* {navControl() && <Footer />} */}
      {/* <ModalComponents
				isOpen={error?.error?.length > 0}
				title="Error"
				size={"sm"}
				success="text-danger text-danger2"
				borderNone={"borderNone"}
				toggle={() => dispatch(clearErrors())}>
				<div className="downH2 flex flex-col">
					<div className="mx-auto mb-3">
						<img src={gif2} alt="Gif" className="img-fluid" />
					</div>
					{error?.error?.map((item, i) => (
						<p key={i} className="fw-bold Lexend text-center w-100">
							<span className="fontInherit me-2">{i + 1}.</span> {item?.msg}
						</p>
					))}
					<button
						onClick={() => dispatch(clearErrors())}
						className="inline-block w-full rounded bg-main px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-main hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-main focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-main active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] mt-3">
						close
					</button>
				</div>
			</ModalComponents> */}
    </>
  );
};

export default Routers;

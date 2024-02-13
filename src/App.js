import "./App.css";
import $ from "jquery";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import DataProvider from "./data/Context";
import store from "./data/Store";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./Routes";
import { useEffect } from "react";
import { TOKEN, loadUser } from "./data/Reducers/UserReducer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { SetAuthToken, SetDefaultHeaders } from "./data/Config";
import { PersistGate } from "redux-persist/integration/react";

// Preloader
$(window).on("load", function () {
  $(".lds-ellipsis").fadeOut(); // will first fade out the loading animation
  $(".preloader").delay(333).fadeOut("slow"); // will fade out the white DIV that covers the website.
  $("body").delay(333);
});

SetDefaultHeaders();

if (localStorage.getItem(TOKEN)) {
  SetAuthToken(localStorage.getItem(TOKEN));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  // const { store, persistor } = storeConfig();

  // const stripePromise = loadStripe(process.env.REACT_APP_STIPE_PUBLISH_KEY);
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <DataProvider>
          <Router>
            <Routers />
          </Router>
        </DataProvider>
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;

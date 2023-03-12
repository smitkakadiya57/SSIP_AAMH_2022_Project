import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";



// custom css file
import "./css/payment.css";
import "./css/style.css";
// import "./css/regform.css";
import "./css/login.css";
// import "./css/about.css";

// importing Provider Wrapper
import { Provider } from "react-redux";

//importing redux store
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/es/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
     
        <React.StrictMode>
          <App />
        </React.StrictMode>
     
    </PersistGate>
  </Provider>
);

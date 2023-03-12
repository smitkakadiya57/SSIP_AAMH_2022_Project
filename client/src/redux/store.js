//=======> REDUX STORE 

import { configureStore } from "@reduxjs/toolkit";

import { persistReducer,persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig={
  key:'persist-store',
  storage
}


// import saga file
// import Saga from "./saga";

// import rootReducer
import rootReducer from "./rootReducer";

const persistreducer= persistReducer(persistConfig,rootReducer);

// import create Saga Middleware
// import createSagaMiddleware  from "redux-saga";

// const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistreducer,
  // middleware:[sagaMiddleware]
    
  
});

export const persistor=persistStore(store);

// run productSaga file when middleware called 
// sagaMiddleware.run(Saga);


export default store;

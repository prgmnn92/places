import { createStore, applyMiddleware } from "redux";

import reducer from "./reducer";
import logger from "redux-logger";

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(reducer, applyMiddleware(...middlewares));

export default { store };

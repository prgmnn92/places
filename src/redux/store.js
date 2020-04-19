import { createStore, applyMiddleware } from "redux";

import reducer from "./reducer";
import logger from "redux-logger";

const middlewares = [logger];

export const store = createStore(reducer, applyMiddleware(...middlewares));

export default { store };

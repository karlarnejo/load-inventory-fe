import reducer from "./reducer";
import { routes } from "../routes";
import * as authOperations from "./operations";

export {
    authOperations
};

const exportedObjects = {
    routes,
    reducer
}

export default exportedObjects
import { PERSISTED_STATE_KEY } from "../config/settings";

const logout = () => {
    localStorage.removeItem(PERSISTED_STATE_KEY);
}

export default logout;
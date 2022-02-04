import { PERSISTED_STATE_KEY } from "../config/settings";

export default function() {
  localStorage.removeItem(PERSISTED_STATE_KEY);
}
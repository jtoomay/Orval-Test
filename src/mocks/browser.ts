import { setupWorker } from "msw/browser";
import { getTodoAPIMock } from "../api/endpoints.msw";

export const worker = setupWorker(...getTodoAPIMock());

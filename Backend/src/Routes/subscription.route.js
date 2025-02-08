import { Router } from "express";
import { isSubscribe, subscribe} from "../Controllers/subcriptionn.controller.js";
import { verifyJWT } from "../Middlewares/Auth.middleware.js";


const router = Router();

router.route("/subscribe").post(verifyJWT , subscribe);

router.route("/is-subscribe").post(verifyJWT , isSubscribe);

export default router;
import { Router } from "express";
import { getTopUsers } from "../controllers/users.controller";

const router = Router();

router.route("/").get(getTopUsers);

export default router;

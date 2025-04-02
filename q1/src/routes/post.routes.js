import { Router } from "express";
export { getTopOrLatestPosts } from "../controllers/posts.controller";

const router = Router();

app.use("/:type").get(getTopOrLatestPosts);

export default router;

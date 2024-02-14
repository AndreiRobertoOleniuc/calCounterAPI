import { Router, Request, Response } from "express";
import { searchFood } from "../services/foodService";
const router = Router();

router.get("/search", async (req: Request, res: Response) => {
  res.send(await searchFood(req.query.query as string));
});

export default router;

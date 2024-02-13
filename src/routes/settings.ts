import { Router, Request, Response } from "express";
import UserModal from "../models/user";
import UserType from "../types/user";

const router = Router();

//Remove app data from user
router.get("/deleteAppData", (req: Request, res: Response) => {
  const user = req.user as UserType;
  UserModal.deleteOne({ google_id: user.google_id }).then(() => {
    res.send(true);
  });
});

export default router;

import * as express from "express";
const router = express.Router();

router.get("/api/getCartTotal", (req, res, next) => {
  console.log("For timing's sake decided against doing this as an api");
  res.json("receipt");
});

export default router;

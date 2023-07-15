import { useRouter } from "next/router";

const { cookieSetter } = require("../../../../utils/features");
useRouter;
export default async function (req, res) {
  cookieSetter(res, "", false);
  res.status(200).json({ success: true, msg: "logout " });
}

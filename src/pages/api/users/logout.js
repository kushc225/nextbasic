const { cookieSetter } = require("../../../../utils/features");

export default async function Logout(req, res) {
  cookieSetter(res, "", false);
  res.status(200).json({ success: true, msg: "logout " });
}

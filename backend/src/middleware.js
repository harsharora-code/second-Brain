import jwt from "jsonwebtoken";
const JWT_SECRET = "a5sasery";
export function userMiddleware(req, res, next) {
    const authHeaders = req.headers["authorization"];
    if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
        return res.status(403).json({ msg: "user not valid" });
    }
    const token = authHeaders.split(' ')[1];
    const decodedUser = jwt.verify(token, JWT_SECRET);
    if (decodedUser) {
        if (typeof decodedUser === "string") {
            res.status(403).json({
                msg: "user not logged in"
            });
            return;
        }
        req.userId = decodedUser.id;
        next();
    }
    else {
        res.status(403).json({
            msg: "you have not logged in"
        });
    }
}
//# sourceMappingURL=middleware.js.map
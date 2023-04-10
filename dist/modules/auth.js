"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.createJWT = exports.hashPassword = exports.comparePasswords = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var comparePasswords = function (password, hashedPassword) {
    return bcrypt_1.default.compare(password, hashedPassword);
};
exports.comparePasswords = comparePasswords;
var hashPassword = function (password) {
    return bcrypt_1.default.hash(password, Math.random());
};
exports.hashPassword = hashPassword;
var createJWT = function (user) {
    var token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    return token;
};
exports.createJWT = createJWT;
//middleware
var protect = function (req, res, next) {
    var bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401);
        res.json({ message: 'Not allowed !' });
        return;
    }
    var _a = bearer.split(' '), token = _a[1];
    if (!token) {
        res.status(401);
        res.json({ message: 'Not valid token !' });
        return;
    }
    try {
        var user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401);
        res.json({ message: err });
    }
};
exports.protect = protect;

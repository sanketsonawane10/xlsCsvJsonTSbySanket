"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const PORT = process.env.PORT || 5000;
const api_1 = __importDefault(require("./routes/api"));
api_1.default(app);
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

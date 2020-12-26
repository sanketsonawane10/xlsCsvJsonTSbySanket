"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const xlsApiController_1 = __importDefault(require("../http/controllers/xlsApiController"));
function initApi(app) {
    // get list all books
    app.get('/get-book-list', xlsApiController_1.default().getBookList);
    // this is for quick seacrh with url query string
    app.get('/get-book-detail', xlsApiController_1.default().getBookDetail);
    // this is for quick seacrh with url params string
    app.get('/get-book-detail/:book', xlsApiController_1.default().getBookDetail);
}
module.exports = initApi;

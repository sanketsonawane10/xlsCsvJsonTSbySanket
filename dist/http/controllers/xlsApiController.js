"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const jsonexport_1 = __importDefault(require("jsonexport"));
const json2xls = require('json2xls');
function xlsApiController() {
    return {
        getBookList(req, res) {
            const bookListUrl = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=TksNM2M74TpFR0qWf5HLpsienG2K3UNo";
            node_fetch_1.default(`${bookListUrl}`)
                .then((res) => {
                return res.json();
            }).then((jsonData) => {
                ///////////// json to xlsx /////////////////////
                const xls = json2xls(jsonData.results.books);
                fs_1.default.writeFileSync('data.xlsx', xls, 'binary');
                res.send("data inserted in xls");
            }).catch((err) => {
                console.log(err);
            });
        },
        getBookDetail(req, res) {
            const bookDetailUrl = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=TksNM2M74TpFR0qWf5HLpsienG2K3UNo";
            node_fetch_1.default(bookDetailUrl)
                .then((res) => { return res.json(); })
                .then((json) => {
                var _a, _b;
                let newArr = [];
                for (let i = 0; i < json.results.books.length; i++) {
                    let book = json.results.books[i].title;
                    newArr.push(book);
                    let bookNameQuery = (_a = req.query.book) === null || _a === void 0 ? void 0 : _a.toString().toUpperCase();
                    let bookNameParams = (_b = req.params.book) === null || _b === void 0 ? void 0 : _b.toString().toUpperCase();
                    if (bookNameQuery == newArr[i] || bookNameParams == newArr[i]) {
                        ///////////// json to csv /////////////////////
                        const stats = json.results.books[i];
                        jsonexport_1.default(stats, function (err, csv) {
                            if (err)
                                return console.error(err);
                            console.log(csv);
                            fs_1.default.writeFileSync('file.csv', csv);
                        });
                        console.log("Successfully seacrhed for book name");
                        return res.json(json.results.books[i]);
                    }
                }
                console.log("You have entered wrong book name");
                return res.json("You have entered wrong book name");
            }).catch((err) => {
                console.log(err);
            });
        }
    };
}
module.exports = xlsApiController;


import express, { Request, Response } from 'express';

import fs from 'fs';
import fetch from 'node-fetch';
import jsonexport from 'jsonexport';
const json2xls = require('json2xls');



function xlsApiController() {

    return {

        getBookList(req: Request, res: Response) {

            const bookListUrl = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=TksNM2M74TpFR0qWf5HLpsienG2K3UNo";

            fetch(`${bookListUrl}`)
                .then((res: any) => {
                    return res.json();
                }).then((jsonData: any) => {

                    ///////////// json to xlsx /////////////////////
                    const xls = json2xls(jsonData.results.books);
                    fs.writeFileSync('data.xlsx', xls, 'binary');
                    res.send("data inserted in xls");
                }).catch((err: any) => {
                    console.log(err);
                });

        },

        getBookDetail(req: Request, res: Response) {

            const bookDetailUrl = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=TksNM2M74TpFR0qWf5HLpsienG2K3UNo";

            fetch(bookDetailUrl)
                .then((res: any) => { return res.json() })
                .then((json: any) => {

                    let newArr: string[] = [];

                    for (let i = 0; i < json.results.books.length; i++) {

                        let book: string = json.results.books[i].title;
                        newArr.push(book);

                        let bookNameQuery = req.query.book?.toString().toUpperCase();
                        let bookNameParams = req.params.book?.toString().toUpperCase();

                        if (bookNameQuery == newArr[i] || bookNameParams == newArr[i]) {

                            ///////////// json to csv /////////////////////
                            const stats = json.results.books[i];
                            jsonexport(stats, function (err: any, csv: any) {
                                if (err) return console.error(err);
                                console.log(csv);
                                fs.writeFileSync('file.csv', csv);
                            });
                            console.log("Successfully seacrhed for book name");
                            return res.json(json.results.books[i]);
                        }
                    }
                    console.log("You have entered wrong book name");
                    return res.json("You have entered wrong book name");

                }).catch((err: any) => {
                    console.log(err);
                })
        }


    }


}

export = xlsApiController;
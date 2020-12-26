
import express,{Application,Request,Response} from 'express';

const app:Application =  express();

const PORT = process.env.PORT || 5000;


import initApi from './routes/api';
initApi(app);



app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`);
})
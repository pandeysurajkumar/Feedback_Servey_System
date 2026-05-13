import {app } from './App.js';
import dotenv from 'dotenv';
import connectDb from '../Db/db.js';

dotenv.config({
    path: './.env'
});

connectDb().then(() =>{
    const PORT = process.env.PORT || 3000;
    app.listen(PORT,()=>{
        console.log(`⚙️ Server is running on port ${PORT}`);
    })

}).catch((error) => {


    console.log("DB Connection Error: ",error);
}
);


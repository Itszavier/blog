import express from 'express';
import next from 'next';
import dotenv from 'dotenv';

dotenv.config();


const port = 3000
const app = next({dev: false});
const handle = app.getRequestHandler();


app.prepare().then(function (){
    const server = express();

    server.get('*', async (req, res) => {
        try {
         await handle(req, res)
        } catch (error) {
          res.status(500)
        }  
    })


    server.listen(port, () => {
        console.log(`open on http://localhost:${port}/`)
    })
}).catch(function (error) {
 console.log(error)
})
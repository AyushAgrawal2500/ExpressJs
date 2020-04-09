const express=require('express');
const router=express.Router();
const path=require('path');
const fs=require('fs');

router.use(express.static(path.join(__dirname, "./../../Get_Parked")));
router.get('/', (req, res)=>{
    fs.readFile("./../../Get_Parked", (error, pgResp)=>{
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(pgResp);
        }

        res.end();
    });
});

module.exports=router;
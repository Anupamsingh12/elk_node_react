const fs = require('fs');
const readline = require('readline');
const client=require('../config/client')
const add=(req,res,next)=>{
    try {
        const jsonData = JSON.parse(fs.readFileSync('../data.json').toString());
        jsonData.items.map(async(data)=>{
             await client.index({
          index: "posts",
          document:data
        });
        })
        res.status(200).json({data:"uploaded data"})
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error'});
    }
  
}
module.exports=add;
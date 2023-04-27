
const client=require('../config/client')


const search=async (req,res,next)=>{
    try{
        const result = await client.search({
          index: "posts",
          from:5,
          size: 10,
          query: { match_all: { } },
        });
          res.json(result);
      }catch(e){
        console.log(e)
      }
}
module.exports=search;
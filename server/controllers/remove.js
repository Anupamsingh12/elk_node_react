
const client=require('../config/client')


const remove=async (req,res,next)=>{
    const result = await client.delete({
        index: "posts",
        id: req.query.id,
      });
    
      res.json(result);
}
module.exports=remove;
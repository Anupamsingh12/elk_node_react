
const client=require('../config/client')


const search=async (req,res,next)=>{
  try{
    const query=req.query.search
  var result= [];
  if(query){
  result= await client.search({
    index: "posts",
    from:0,
    size: 10,
    query: { multi_match:{query:query,fields:['ID','InfoDBServer','Name_DB','String','IDInfoBuffer']}},
  });}
  else{
    result= await client.search({
      index: "posts",
      from:0,
      size: 10,
      query: { match_all:{}},
    });
  }
    res.json(result);
}catch(e){
  console.log(e)
}

}
module.exports=search;
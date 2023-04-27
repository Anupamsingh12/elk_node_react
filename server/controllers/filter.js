
const client=require('../config/client')


const filter = async (req,res,next)=>{
  const body = req.body;
  console.log(body)
  const boolQuery = {
    bool: {
      must: [],
      must_not:[]

    },
  };
  Object.keys(body).forEach((key) => {
    const [field, operator] = key.split('=');
    const value = body[key];
    switch (operator) {
      case 'is':
        boolQuery.bool.must.push({ term: { [field]: value } });
        break;
      case 'isNot':
        boolQuery.bool.must_not.push({ term: { [field]: value } });
        break;
      case 'like':
        boolQuery.bool.must.push({ wildcard: { [field]: `*${value}*` } });
        break;
      default:
        break;
    }
  });
console.log(boolQuery)
  const  results  = await client.search({
    index: 'posts',
    body: { query: boolQuery, size: 10, from: 0 },
  });
  res.json({ results });

}
module.exports=filter;
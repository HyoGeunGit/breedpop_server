module.exports = auth;


function auth(app, Users, rndstring){

  app.post('/signup', async(req,res)=>{
    var new_user = new Users(req.body);
    new_user.token = rndstring.generate(23);
    try{
      var result = await new_user.save();
    }catch(e){
      if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
      if(e instanceof ValidationError) return res.status(400).json({message: e.message});
      if(e instanceof paramsError) return res.status(400).json({message: e.message});
    }
    return res.status(200).json({message : "success!"});
  })

  .post('/signin', async(req,res)=>{
    var result = await Users.findOne(req.body);
    if(!result) return res.status(404).json({message : "User not found!"})
    else return res.status(200).json({token : result.token})
  })

  .get('/auto/:token', async(req,res)=>{
    var token = req.params.token;
    var result = await Users.findOne({"token":token});
    if(!result) return res.status(404).json({message : "Not found user"})
    else return res.status(200).json({user : result})
  })

  .post('/chk', async(req,res)=>{
    var result = await Users.find();
    res.send(result);
  })

  .get('/', (req,res)=>{
    res.send('G')
  })
}

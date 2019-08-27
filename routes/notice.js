module.exports = notice;

function notice(app, CM, CAMPAIGN, MV, rndstring){
    app.post('/cm/write', async(req,res)=>{
        var cms = new CM(req.body);
        let listNum = await CM.find()
        listNum = listNum.length;
        cms.docNum = listNum + 1;
        cms.token =  rndstring.generate(23);
        var resultCm = await cms.save();    
        if(!resultCm.ok) res.status(200).json(cms);
        else res.status(500).json({message : "fail!"});
    })
    // length - (page - 1 ) * 10 부터 length - page * 10 까지 findOne으로 10개씩 찾아서 list에 push
    app.post('/cm/read', async(req,res)=>{
        let result = await CM.find();
        let list = [];
        for (var i=0; result[i] != null; i++) {
            let json = {
                title : result[i].title,
                brand : result[i].brand,
                agency: result[i].agency,
                production: result[i].production,
                imageUrl: result[i].imageUrl,
                docNum: result[i].docNum,
                token : result[i].token
            }

            list.push(json)
        }
        return res.status(200).json({list : list})
    })
    app.post('/cm/pages', async (req,res)=> {
        let list = await CM.find().sort({ docNum : -1 })
        let page = req.body.page
        var rList = []
        for ( var i = list.length - (( page - 1 ) * 10 ); i > list.length - (page * 10 ); i--) {
            let json = await CM.findOne({docNum : i});
            if(!json) break;
            rList.push(json)
        }
        res.status(200).send({list: rList})
    })
    app.post('/cm/page', async ( req,res)=> {
        let post = await CM.findOne({docNum : req.body.num})
        if(post) return res.status(200).json({post : post})
        else return res.status(404).json({message : "Not Found"})
    })
    app.post('/cm/change', async(req,res)=>{

    })

    app.post('/cm/del', async(req,res)=>{
        var result = await CM.remove({token : req.body.token})
        if(!result.ok) return res.status(500).json({message : "ERR!"})
        else return res.status(200).json({message : "success!"})
    })

    app.post('/cm/search/:title', async(req,res)=>{
        let result = await CM.find({title : {$regex: req.params.title, $options:"$i"}})
        let list = []
        let cmNum = 1;
        for( var i = 0; result[i] != null; i++) {
            let json = {
                title : result[i].title,
                brand : result[i].brand,
                agency: result[i].agency,
                production: result[i].production,
                imageUrl: result[i].imageUrl,
                docNum: cmNum,
                token : result[i].token
            }
            list.push(json)
            cmNum++;
        }
        return res.status(200).json({list : list})
    })

    app.post('/campaign/write', async(req,res)=>{
        var campaign = new CAMPAIGN(req.body);
        campaign.token =  rndstring.generate(23);
        var resultCampaign = await campaign.save();
        if(!resultCampaign.ok) res.status(200).json(campaign);
        else res.status(500).json({message : "fail!"});
    })

    app.post('/campaign/read', async(req,res)=>{
        let result = await CAMPAIGN.find();
        let list = [];
        let campNum = 1;
        for (var i=0; result[i] != null; i++) {
            let json = {
                title : result[i].title,
                brand : result[i].brand,
                agency: result[i].agency,
                production: result[i].production,
                imageUrl: result[i].imageUrl,
                docNum: campNum,
                token : result[i].token
            }
            campNum++;
            list.push(json)
        }
        return res.status(200).json({list : list})
    })
    
    app.post('/campaign/change', async(req,res)=>{

    })

    app.post('/campaign/del', async(req,res)=>{
        var result = await CAMPAIGN.remove({token : req.body.token})
        if(!result.ok) return res.status(500).json({message : "ERR!"})
        else return res.status(200).json({message : "success!"})
    })

    app.post('/campaign/search/:title', async(req,res)=>{
        let result = await CAMPAIGN.find({title : req.body.title})
        let list = []
        let campNum = 1;
        for( var i = 0; result[i] != null; i++) {
            let json = {
                title : result[i].title,
                brand : result[i].brand,
                agency: result[i].agency,
                production: result[i].production,
                imageUrl: result[i].imageUrl,
                docNum: campNum,
                token : result[i].token
            }
            campNum++;
            list.push(json)
        }
        return res.status(200).json({list : list})
    })

    app.post('/mv/write', async(req,res)=>{
        var mv = new MV(req.body);
        mv.token =  rndstring.generate(23);
        var resultMv = await mv.save();
        if(!resultMv.ok) res.status(200).json(mv);
        else res.status(500).json({message : "fail!"});
    })

    app.post('/mv/read', async(req,res)=>{
        let result = await MV.find();
        let list = [];
        let mvNum = 1;
        for (var i=0; result[i] != null; i++) {
            let json = {
                title : result[i].title,
                brand : result[i].brand,
                agency: result[i].agency,
                production: result[i].production,
                imageUrl: result[i].imageUrl,
                docNum: mvNum,
                token : result[i].token
            }
            mvNum++;
            list.push(json)
        }
        return res.status(200).json({list : list})
    })
    
    app.post('/mv/change', async(req,res)=>{
        var result = await MV.remove({token : req.body.token})
        var cms = new CM(req.body);
        cms.token =  rndstring.generate(23);
        var resultCm = await cms.save();    
        if(!resultCm.ok) res.status(200).json(cms);
        else res.status(500).json({message : "fail!"});
        if(!result.ok) return res.status(500).json({message : "ERR!"})
        else return res.status(200).json({message : "success!"})
    })

    app.post('/mv/del', async(req,res)=>{
        var result = await MV.remove({token : req.body.token})
        if(!result.ok) return res.status(500).json({message : "ERR!"})
        else return res.status(200).json({message : "success!"})
    })

    app.post('/mv/search/:title', async(req,res)=>{
        let result = await MV.find({title : req.body.title})
        let list = []
        let mvNum = 1;
        for( var i = 0; result[i] != null; i++) {
            let json = {
                title : result[i].title,
                brand : result[i].brand,
                agency: result[i].agency,
                production: result[i].production,
                imageUrl: result[i].imageUrl,
                docNum: mvNum,
                token : result[i].token
            }
            mvNum++;
            list.push(json)
        }
        return res.status(200).json({list : list})
    })
}

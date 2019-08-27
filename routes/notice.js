module.exports = notice;

function notice(app, CM, CAMPAIGN, MV, rndstring){
    app.post('/all/read', async(req,res)=>{
        let result1 = await CM.find();
        let result2= await CAMPAIGN.find();
        let result3 = await MV.find();
        let list = [];
        for (var i=0; result1[i] != null; i++) {
            let json = {
                title : result1[i].title,
                brand : result1[i].brand,
                agency: result1[i].agency,
                production: result1[i].production,
                imageUrl: result1[i].imageUrl,
                docNum: result1[i].docNum,
                token : result1[i].token,
                nowDate : result1[i].nowDate
            }

            list.push(json)
        }
        for (var i=0; result2[i] != null; i++) {
            let json = {
                title : result2[i].title,
                brand : result2[i].brand,
                agency: result2[i].agency,
                production: result2[i].production,
                imageUrl: result2[i].imageUrl,
                docNum: result2[i].docNum,
                token : result2[i].token,
                nowDate : result1[i].nowDate
            }

            list.push(json)
        }
        for (var i=0; result3[i] != null; i++) {
            let json = {
                title : result3[i].title,
                brand : result3[i].brand,
                agency: result3[i].agency,
                production: result3[i].production,
                imageUrl: result3[i].imageUrl,
                docNum: result3[i].docNum,
                token : result3[i].token,
                nowDate : result1[i].nowDate
            }

            list.push(json)
        }
        return res.status(200).json({list : list})

    })

    app.post('/all/pages', async(req,res)=>{
        let list2 = await CM.find().sort({ docNum : -1 }) 
        let list3 = await CAMPAIGN.find().sort({ docNum : -1 }) 
        let list4 = await MV.find().sort({ docNum : -1 }) 
        let list = list2 + list3 + list4;
        let page = req.body.page
        var rList = []
        for ( var i = list.length - (( page - 1 ) * 10 ); i > list.length - (page * 10 ); i--) {
            let json = await CM.findOne({docNum : i});
            if(!json) break;
            rList.push(json)
        }
        res.status(200).send({list: rList})
    })


    app.post('/cm/maxchk', async(req,res)=>{
        let result = await CM.find();
        if ( parseInt(req.body.docNum) == result.length){
            return res.status(200).json(true)
        }
        else{
           return res.status(200).json(false)
        }
    })

    app.post('/cm/write', async(req,res)=>{
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd
        } 
        if(mm<10) {
            mm='0'+mm
        } 
        today = yyyy+mm+dd;
        var cms = new CM(req.body);
        let listNum = await CM.find()
        listNum = listNum.length;
        cms.docNum = listNum + 1;
        cms.token =  rndstring.generate(23);
        cms.nowDate = today;
        cms.category = "CM";
        var resultCm = await cms.save();    
        if(!resultCm.ok) res.status(200).json(cms);
        else res.status(500).json({message : "fail!"});
    })
    // length - (page - 1 ) * 10 부터 length - page * 10 까지 findOne으로 10개씩 찾아서 list에 push
    app.post('/cm/read', async(req,res)=>{
        let result = await CM.find().sort({ docNum : -1 });
        let list = [];
        for (var i=0; result[i] != null; i++) {
            let json = {
                title : result[i].title,
                brand : result[i].brand,
                agency: result[i].agency,
                production: result[i].production,
                imageUrl: result[i].imageUrl,
                docNum: result[i].docNum,
                token : result[i].token,
                nowDate : result[i].nowDate
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
        var result = await CM.remove({token : req.body.token})   
        var cms = new CM(req.body);
        let listNum = await CM.find()
        listNum = listNum.length;
        cms.docNum = req.body.docNum;
        cms.token =  req.body.token;
        cms.nowDate = req.body.date;
        cms.category = "CM";
        var resultcms = await cms.save();
        if(!resultcms.ok || !result.ok) res.status(200).json(cms);
        else res.status(500).json({message : "fail!"});
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
                token : result[i].token,
                nowDate : result[i].nowDate
            }
            list.push(json)
            cmNum++;
        }
        return res.status(200).json({list : list})
    })

    app.post('/cm/change/pdocnum',async(req, res)=>{
        let soda =  await CM.findOne({docNum : parseInt(req.body.docNum) + 1});
        let originSoda = await CM.findOne({docNum : req.body.docNum});
        console.log(1 + req.body.docNum, originSoda)
        let sodaUpdate = await CM.update({token : soda.token}, {
            $set : {docNum : soda.docNum - 1}
        })
        let originSodaUpdate = await CM.update({token : originSoda.token}, {
            $set : {docNum : originSoda.docNum + 1}
        })
        if(!sodaUpdate.ok||!originSodaUpdate.ok) return res.status(500).json({message : "ERR!"})
        else return res.status(200).json({message : "success!"})
    })

    app.post('/cm/change/mdocnum',async(req, res)=>{
        let soda =  await CM.findOne({docNum : parseInt(req.body.docNum) -1 });
        let originSoda = await CM.findOne({docNum : req.body.docNum});

        let sodaUpdate = await CM.update({token : soda.token}, {
            $set : {docNum : soda.docNum + 1}
        })
        let originSodaUpdate = await CM.update({token : originSoda.token}, {
            $set : {docNum : originSoda.docNum - 1}
        })
        if(!sodaUpdate.ok||!originSodaUpdate.ok) return res.status(500).json({message : "ERR!"})
        else return res.status(200).json({message : "success!"})
    })
    app.post('/campaign/write', async(req,res)=>{   
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd
        } 
        if(mm<10) {
            mm='0'+mm
        } 
        today = yyyy+mm+dd;
        var campaign = new CAMPAIGN(req.body);
        let listNum = await CAMPAIGN.find()
        listNum = listNum.length;
        campaign.docNum = listNum + 1;
        campaign.token =  rndstring.generate(23);
        campaign.nowDate = today;
        campaign.category = "campaign";
        var resultCampaign = await campaign.save();
        if(!resultCampaign.ok) res.status(200).json(campaign);
        else res.status(500).json({message : "fail!"});
    })



    app.post('/campaign/maxchk', async(req,res)=>{
        let result = await CAMPAIGN.find();
        if ( parseInt(req.body.docNum) == result.length){
           return res.status(200).json(true)
        }
        else{
            return res.status(200).json(false)
        }
    })

    app.post('/campaign/read', async(req,res)=>{
        let result = await CAMPAIGN.find().sort({ docNum : -1 });
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
                token : result[i].token,
                nowDate : result[i].nowDate
            }
            campNum++;
            list.push(json)
        }
        return res.status(200).json({list : list})
    })
    
    app.post('/campaign/change', async(req,res)=>{
        var result = await CAMPAIGN.remove({token : req.body.token})   
        var campaign = new CAMPAIGN(req.body);
        let listNum = await CAMPAIGN.find()
        listNum = listNum.length;
        campaign.docNum = req.body.docNum;
        campaign.token =  req.body.token;
        campaign.nowDate = req.body.date;
        campaign.category = "campaign";
        var resultCampaign = await campaign.save();
        if(!resultCampaign.ok) res.status(200).json(campaign);
        else res.status(500).json({message : "fail!"});
    })

    app.post('/campaign/del', async(req,res)=>{
        var result = await CAMPAIGN.remove({token : req.body.token})
        if(!result.ok) return res.status(500).json({message : "ERR!"})
        else return res.status(200).json({message : "success!"})
    })

    app.post('/campaign/pages', async (req,res)=> {
        let list = await CAMPAIGN.find().sort({ docNum : -1 })
        let page = req.body.page
        var rList = []
        for ( var i = list.length - (( page - 1 ) * 10 ); i > list.length - (page * 10 ); i--) {
            let json = await CAMPAIGN.findOne({docNum : i});
            if(!json) break;
            rList.push(json)
        }
        res.status(200).send({list: rList})
    })

    app.post('/campaign/page', async ( req,res)=> {
        let post = await CAMPAIGN.findOne({docNum : req.body.num})
        if(post) return res.status(200).json({post : post})
        else return res.status(404).json({message : "Not Found"})
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
                token : result[i].token,
                nowDate : result[i].nowDate
            }
            campNum++;
            list.push(json)
        }
        return res.status(200).json({list : list})
    })

    app.post('/mv/maxchk', async(req,res)=>{
        let result = await MV.find();
        if ( parseInt(req.body.docNum) == result.length){
           return res.status(200).json(true)
        }
        else{
           return res.status(200).json(false)
        }
    })

    app.post('/mv/write', async(req,res)=>{
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd
        } 
        if(mm<10) {
            mm='0'+mm
        } 
        today = yyyy+mm+dd;
        var mv = new MV(req.body);
        let listNum = await MV.find()
        listNum = listNum.length;
        mv.docNum = listNum + 1;
        mv.token =  rndstring.generate(23);
        mv.nowDate = today;
        mv.category = "MV";
        var resultMv = await mv.save();
        if(!resultMv.ok) res.status(200).json(mv);
        else res.status(500).json({message : "fail!"});
    })

    app.post('/mv/read', async(req,res)=>{
        let result = await MV.find().sort({ docNum : -1 });
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
                token : result[i].token,
                nowDate : result[i].nowDate
            }
            mvNum++;
            list.push(json)
        }
        return res.status(200).json({list : list})
    })
    
    app.post('/mv/change', async(req,res)=>{  
    var result = await MV.remove({token : req.body.token})   
    var mvs = new MV(req.body);
    let listNum = await MV.find()
    listNum = listNum.length;
    mvs.docNum = req.body.docNum;
    mvs.token =  req.body.token;
    mvs.nowDate = req.body.date;
    mvs.category = "MV";
    var resultmvs = await mvs.save();
    if(!resultmvs.ok || !result.ok) res.status(200).json(mvs);
    else res.status(500).json({message : "fail!"});
    })

    app.post('/mv/del', async(req,res)=>{
        var result = await MV.remove({token : req.body.token})
        if(!result.ok) return res.status(500).json({message : "ERR!"})
        else return res.status(200).json({message : "success!"})
    })

    app.post('/mv/pages', async (req,res)=> {
        let list = await MV.find().sort({ docNum : -1 })
        let page = req.body.page
        var rList = []
        for ( var i = list.length - (( page - 1 ) * 10 ); i > list.length - (page * 10 ); i--) {
            let json = await MV.findOne({docNum : i});
            if(!json) break;
            rList.push(json)
        }
        res.status(200).send({list: rList})
    })

    app.post('/mv/page', async ( req,res)=> {
        let post = await MV.findOne({docNum : req.body.num})
        if(post) return res.status(200).json({post : post})
        else return res.status(404).json({message : "Not Found"})
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
                token : result[i].token,
                nowDate : result[i].nowDate
            }
            mvNum++;
            list.push(json)
        }
        return res.status(200).json({list : list})
    })
}

const Url = require('../models/Url.js');
const { nanoid } = require("nanoid");

exports.createShortUrl = async (req , res) =>{
    try{
        const { originalUrl } = req.body;

        if(!originalUrl){
            return res.status(401).json({
                success : false , 
                message : "Original Url is reauired"
            });
        }

        const shortCode = nanoid(6);
        const expireDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        const url = new Url({
            originalUrl,
            shortCode,
            expireDate,
            userId : req.user.id
        })

        await url.save()
        
        res.status(201).json({
            success : true ,
            message : "Short Url was created successFully",
            shortCode
        })

    }catch(err){
        console.log(err.message);
        
        console.log("Url Controller Dengindi");
        
        res.status(500).json({
            success : false,
            message : " Server Error"
        })
    }
}

exports.redirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const Surl = await Url.findOne({ shortCode });

        if (!Surl) {
            return res.status(404).json({
                success: false,
                message: "Short URL not found"
            });
        }

        const currentDate = new Date();

        if (Surl.expireDate && currentDate >Surl.expiryDate) {
            return res.status(400).json({
                success: false,
                message: "URL has expired"
            });
        }

        Surl.clicks += 1;

        await Surl.save();

        console.log("SucessFUlly completed")

        return res.redirect(Surl.originalUrl);

    } catch (err) {
        console.log(err.message);
        console.log("Redirect Failed");

        return res.status(500).json({
            success: false,
            message: "Failed to redirect URL"
        });
    }
};

exports.getAnalytics = async (req , res) =>{
    try{
        const {shortCode} = req.params;
        const url = await Url.findOne({ shortCode });

        if(!url){
            return res.status(401).json({
                success : false,
                message : "URL not Found"
            })
        }
        

        return res.status(200).json({
            success : true,
            data :{
                originalUrl : url.originalUrl,
                shortCode : url.shortCode,
                clicks : url.clicks,
                expiryDate : url.expireDate
            }
        })

    }catch(err){
        console.log(err.message);
        console.log("Analytics dengindi")
    }
}

exports.getMyUrls = async (req , res) =>{
    try{
        const urls = await Url.find({
            userId : req.user.id
        });
        return res.status(200).json({
            success : true,
            count : urls.length,
            data : urls
        });
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

exports.deleteUrls = async (req , res) =>{
    try{
        const {id} = req.params;
        const url = await Url.findById(id);

        if(!url){
            console.log("Url not found ");
            return res.status(404).json({
                success : false,
                message : "URL not found"
            })
        }

        if(url.userId.toString() !== req.user.id){
            return res.status(403).json({
                success : false,
                message : "Unauthorized"
            })
        }

        await url.deleteOne();

        return res.status(200).json({
            success : true,
            message : "Url deleted successfully"
        })
    }catch(err){
        console.log(err.message);
        return res.status(401).json({
            success : false,
            message : err.message
        })
    }
}
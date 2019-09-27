module.exports=(res, success, message, data)=>{
    res.json({
        success: success,
        message: message,
        data: data
    })
}
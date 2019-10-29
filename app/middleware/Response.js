module.exports=(res, success, message, data, status)=>{
    res.status(status||200).json({
        success: success,
        message: message,
        data: data
    })
}
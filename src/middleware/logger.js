const logger = (req,res,next) => {
    const receivedAt = new Date();
    console.log(`${req.method} ${req.url} (${receivedAt.toTimeString()})`);
    next();
}

module.exports = logger;
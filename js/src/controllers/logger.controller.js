export const loggerTest = (req, res)=>{

    req.logger.debug('Test debug log');
    req.logger.http('Test http log');
    req.logger.info('Test info log');
    req.logger.warning('Test warning log');
    req.logger.error('Test error log');
    req.logger.fatal('Test fatal log');

    res.send({message: 'Resultado en consola'})
}
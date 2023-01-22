const DEFAULT_NAMESPACE = "[Cool-Tools]";
const logger = console;

const info = (message: any, ...params: any) => {
    if (typeof message === 'string')
        logger.log(`[${getDate()}] [${DEFAULT_NAMESPACE}] [INFO] ${message} ${params}`)
    else
        logger.log(`[${getDate()}] [${DEFAULT_NAMESPACE}] [INFO] ${message.message} ${params}`)

}

const debug = (message: any, ...params: any) => {
    if (typeof message === 'string')
        logger.log(`[${getDate()}] [${DEFAULT_NAMESPACE}] [DEBUG] ${message} ${params}`)
    else
        logger.log(`[${getDate()}] [${DEFAULT_NAMESPACE}] [DEBUG] ${message.message} ${params}`)
}

const warn = (message: any, ...params: any) => {
    if (typeof message === 'string')
        logger.log(`[${getDate()}] [${DEFAULT_NAMESPACE}] [WARN] ${message} ${params}`)
    else
        logger.log(`[${getDate()}] [${DEFAULT_NAMESPACE}] [WARN] ${message.message} ${params}`)
}

const error = (message: any, ...params: any) => {
    if (typeof message === 'string')
        logger.log(`[${getDate()}] [${DEFAULT_NAMESPACE}] [ERROR] ${message} ${params}`)
    else
        logger.log(`[${getDate()}] [${DEFAULT_NAMESPACE}] [ERROR] ${message.message} ${params}`)
}

const getDate = () => {
    return new Date().toISOString();
}

const logging = {
    info,
    debug,
    warn,
    error
}

export default logging;
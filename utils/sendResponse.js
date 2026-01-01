export const sendResponse = (res, type, statusCode, payload) => {
    res.setHeader('Content-Type', type)
    res.statusCode = statusCode
    res.end(payload)
}
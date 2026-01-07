export async function parseJSONbody(req) {
    try {
        let body = ''
        for await (const chunks of req) {
            body += chunks
        }
        return JSON.parse(body)
    } catch (error) {
        throw new Error(`Invalid JSON format: ${error}`)
    }
}
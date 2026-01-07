import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendResponse.js";
import { parseJSONbody } from "../utils/parseJSONbody.js";
import { addNewSighting } from "../utils/addNewSighting.js";


// handle GET
export async function handleGet(res) {
    const data = await getData()
    const content = JSON.stringify(data)
    sendResponse(res, 'application/json', 200, content)
}

export async function handlePost(req, res) {
    try {
        const parsedBody = await parseJSONbody(req)
        await addNewSighting(parsedBody)
        sendResponse(res, 'application/json', 201, JSON.stringify(parsedBody))
    } catch (err) {
        sendResponse(res, 'application/json', 400, JSON.stringify({error: err}))
    }
}
// handle POST
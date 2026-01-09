import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendResponse.js";
import { parseJSONbody } from "../utils/parseJSONbody.js";
import { addNewSighting } from "../utils/addNewSighting.js";
import { sanitizeInput } from "../utils/sanitizeInput.js";
import { sightingEvents } from "../events/sightingEvents.js";

// handle GET
export async function handleGet(res) {
    const data = await getData()
    const content = JSON.stringify(data)
    sendResponse(res, 'application/json', 200, content)
}

export async function handlePost(req, res) {
    try {
        const parsedBody = await parseJSONbody(req)
        const sanitizedBody = sanitizeInput(parsedBody)
        // await addNewSighting(sanitizedBody)

        sightingEvents.emit('sighting-added', sanitizedBody)

        sendResponse(res, 'application/json', 201, JSON.stringify(sanitizedBody))
    } catch (err) {
        sendResponse(res, 'application/json', 400, JSON.stringify({error: err}))
    }
}
// handle POST
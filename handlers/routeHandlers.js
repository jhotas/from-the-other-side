import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendResponse.js";
import { parseJSONbody } from "../utils/parseJSONbody.js";
import { addNewSighting } from "../utils/addNewSighting.js";
import { sanitizeInput } from "../utils/sanitizeInput.js";
import { sightingEvents } from "../events/sightingEvents.js";
import { stories } from "../data/stories.js";

// handle GET
export async function handleGet(res) {
    const data = await getData()
    const content = JSON.stringify(data)
    sendResponse(res, 'application/json', 200, content)
}

// handle POST
export async function handlePost(req, res) {
    try {
        const parsedBody = await parseJSONbody(req)
        const sanitizedBody = sanitizeInput(parsedBody)
        await addNewSighting(sanitizedBody)

        sightingEvents.emit('sighting-added', sanitizedBody)

        sendResponse(res, 'application/json', 201, JSON.stringify(sanitizedBody))
    } catch (err) {
        sendResponse(res, 'application/json', 400, JSON.stringify({error: err}))
    }
}

// handle NEWS
export async function handleNews(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    setInterval(() => {
        let randomIndex = Math.floor(Math.random() * stories.length)

        res.write(
            `data: ${JSON.stringify({ event: 'news-updated', story: stories[randomIndex] })}\n\n`
        )
    }, 3000)
}
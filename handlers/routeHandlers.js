import { getData } from "../utils/getData.js";
import { parseJSONbody } from "../utils/parseJSONbody.js";
import { sendResponse } from "../utils/sendResponse.js";


// handle GET
export async function handleGet(res) {
    const data = await getData()
    const content = JSON.stringify(data)
    sendResponse(res, 'application/json', 200, content)
}

export async function handlePost() {
    const rawBody = await parseJSONbody(req)
    console.log(rawBody)
}
// handle POST
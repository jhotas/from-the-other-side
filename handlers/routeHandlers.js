import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendResponse.js";


// handle GET
export async function handleGet(res) {
    const data = await getData()
    const content = JSON.stringify(data)
    sendResponse(res, 'application/json', 200, content)
}
// handle POST
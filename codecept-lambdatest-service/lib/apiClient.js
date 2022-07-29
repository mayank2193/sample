import axios from 'axios';
import {baseUrl, baseUrlApp} from "./constant"
module.exports = {
    updateSessionById: async function(sessionId, requestBody, lambdaCredentials) {

        if(!sessionId || !requestBody) {
            throw new Error('session Id || requestBody not correct');
        }
        let data = JSON.stringify(requestBody);
        let url = ""
        if (lambdaCredentials.isApp) url = baseUrlApp
        if (!url) url = baseUrl
        
        const response = await axios.patch(`${url}/sessions/${sessionId}`, data, {
            headers: {
                Authorization: "Basic " +
                Buffer.from(lambdaCredentials.username + ":" + lambdaCredentials.accessKey).toString(
                  "base64"
                )
            }
        })
        return response.status;
    }
}


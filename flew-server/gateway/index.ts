/**
 * Gateway - Rest API Manager
 * Used to link the Flew Rest API with the Gateway server
 */

import axios from 'axios';

const send = (path: string, data: any) => {
    return axios.post(process.env.URL_GATEWAY + '/api/socket/' + path, data);
}

export default {
    send
}

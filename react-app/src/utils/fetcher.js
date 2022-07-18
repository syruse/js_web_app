import axios from 'axios'

const Method = { GET: 'get', POST: 'post' };

async function fetch(enddoint, token, method, data) {

    if (!enddoint || !method) {
        throw new Error("fetch empty parameters");
    }

    return new Promise(async (resolve, reject) => {
        let result = undefined;
        try {
            if (method === Method.GET || method === Method.POST) {
                result = await axios({
                    method: method,
                    url: enddoint,
                    data: data,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } else {
                throw new Error(" invalid method");
            }
        } catch (error) {
            reject(new Error(" error raised during fetching " + error?.response?.data));
        }

        resolve(result);
    });
};

export {Method, fetch};
import axios from 'axios'

const Method = { GET: 'get', POST: 'post' };

async function fetch(enddoint, token, method) {

    if (!enddoint || !token || !method) {
        throw new Error("fetch empty parameters");
    }

    return new Promise(async (resolve, reject) => {
        let data = undefined;
        try {
            if (method === Method.GET) {
                data = await axios.get(enddoint,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
            } else if (method === Method.POST) {
                data = await axios.post(enddoint,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
            } else {
                throw new Error(" invalid method");
            }
        } catch (error) {
            reject(new Error(" error raised during fetching " + error));
        }

        resolve(data);
    });
};

export {Method, fetch};
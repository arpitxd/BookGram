import axios from 'axios';

const urlPrefix = 'http://localhost:9090/'
const crudOperation = axios.create({
    baseURL: urlPrefix,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});
const getEvent = url => crudOperation.get(url);
const postEvent = (url, data) => crudOperation.post(url, data);
const putEvent = (url, data) => crudOperation.put(url, data);
const patchEvent = (url, data) => crudOperation.patch(url, data);
const deleteEvent = url => crudOperation.delete(url);
module.exports = {
    getEvent,
    postEvent,
    putEvent,
    patchEvent,
    deleteEvent
};

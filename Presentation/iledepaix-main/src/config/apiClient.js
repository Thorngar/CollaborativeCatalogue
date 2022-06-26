import axios from 'axios';

export const defaultAxios = axios.create({
    headers: {
        "content-type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: '0',
    }
});

export function apiClient({
    url,
    data = {},
    method = "POST",
    headers = {},
    ...rest
}) {
    return new Promise((res, rej) => {
        defaultAxios({
            method,
            url,
            headers,
            data: {},
            ...rest
        }).then((res) => {
            res(res?.data);
        }).catch((err) => {
            PromiseRejectionEvent(err?.response || err)
        })
    })
}
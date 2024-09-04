import { _post } from "./Helper";


export function customerstatus(
    id,
    status,
    callback = (f) => f,
    fallback = (f) => f
) {
    _post(
        `/api/`,
        [],
        (resp) => {
            if (resp.success) {
                callback(resp)
            }
        },
        (err) => {
            console.log(err);
            fallback();
        }
    )
}
export const handleAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).then((data) => {
        if (data) {
            sendStatus(res, 200, data);
        } else {
            sendNotFound(res, 'Data not found');
        }
    }).catch((error) => {
        if (error.status) {
            sendStatus(res, error.status, { message: error.message });
        } else {
            handleErrors(res, error);
        }
    });
};

export const handleErrors = (res, error) => {
    sendStatus(res, 500, { message: error.message });
};

export const sendNotFound = (res, message) => {
    sendStatus(res, 404, { message: message });
};

export const sendStatus = (res, status, data) => {
    res.status(status).json(data);
};
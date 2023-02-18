// helpers.js

export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        handleErrors(res, error);
    });
};

export const handleErrors = (res, error) => {
    res.status(500).json({ message: error.message });
};

export const sendNotFound = (res, message) => {
    res.status(404).json({ message: message });
};

export const sendResponse = (res, data) => {
    res.status(200).json(data);
};

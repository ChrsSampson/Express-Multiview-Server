// server response class for standardized responses

//*
// * @param {number} status - HTTP status code
// * @param {string} message - Message to send to client
// * @param {object} data - Data to send to client
// * @param {object} error - Error to send to client
// */
class Response {
    constructor(status, message = null, data = null, error = null) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.error = error;
    }

    // *
    // * @param {object} res - Express response object
    // */
    send(res) {
        res.status(this.status).json(this);
    }
}

module.exports = Response;
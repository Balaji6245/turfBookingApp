function Responder() {
    this.sendSuccessMessage = (message, res) => {
        res.setHeader('content-type', 'application/json')
        let result = { success: true, message }
        res.end(JSON.stringify(result))
    }

    this.sendFailureMessage = (message, res) => {
        res.setHeader('content-type', 'application/json');
        let result = { success: false, message }
        res.end(JSON.stringify(result))
    }

    this.sendSuccessData = (data, message, res) => {
        res.setHeader('content-type', 'application/json');
        let result = { success: true, message, data }
        res.end(JSON.stringify(result));

    }
}

module.exports = new Responder();
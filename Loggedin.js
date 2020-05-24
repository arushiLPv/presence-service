const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const LogScheme = mongoose.model('loggedin', LogSchema);

module.exports = LogSchema; 
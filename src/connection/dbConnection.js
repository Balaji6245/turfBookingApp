const mongoose = require('mongoose');

module.exports = async function dbConnect() {
    await mongoose.connect(process.env.DB_STRING + 'turfBooking')
        .then((data) => console.log('Data base connected successfully enjoy'.green.bold))
        .catch((err) => console.log('Could not connect data base'.red.bold));
}

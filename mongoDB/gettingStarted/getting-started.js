var mongoose = require('mongoose');
var db = mongoose.connection;

db('mongodb://localhost/test');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});
let mongoose = require('mongoose');

setTimeout(() => mongoose.disconnect(() => console.log("Disconnected from server")), 5000);
//let dbConnect = mongoose.connect();

mongoose.connect("mongodb+srv://admin:Tango1325@gettingstarted-gkfvh.mongodb.net/test?retryWrites=true",
    {useNewUrlParser: true, useCreateIndex: true})
    .then((con) => console.log("Connected to Mongo"))
    .catch(err => console.log("Ooops: " + err))

let userSchema = new mongoose.Schema({
    userName: String,
    email: {type: String, unique: true},
    created: {type: Date, default: Date.now}
});
// Build the User model
let User = mongoose.model('User', userSchema);

async function addUser(username, email) {
    let user = new User({username, email});
    await user.save();
}

async function testAddUser() {
    try {
        //await User.deleteMany({});
        await addUser("olle Løye", "o@o.dk");
        await addUser("bolle Løye", "b@o.dk");
        await addUser("kolle", "k@o.dk");
        await addUser("dolle", "d@o.dk");

        console.log("Users added");
    } catch (e) {
        console.log("Error in testAddUsers: " + e);
    }
}

async function findUser() {
    return await User.find({ username: /Løye/i }, {username: 1, _id:0});
    //return User.find(fields, projection);
}

async function testFindUser() {
    let users = await findUser();
    console.log(users);
}

async function updateUser() {

}

//testAddUser();
testFindUser();
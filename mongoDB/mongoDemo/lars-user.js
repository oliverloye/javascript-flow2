var mongoose = require( 'mongoose' )

mongoose.connect("mongodb+srv://admin:Tango1325@gettingstarted-gkfvh.mongodb.net/test?retryWrites=true",
    { useNewUrlParser: true, useCreateIndex: true })
    .then((con)=> console.log("Connected to Mongo"))
    .catch(err=> console.log("UPPS: "+err) )

setTimeout(()=> mongoose.disconnect(()=> console.log("Disconnected")),3000);

var userSchema = new mongoose.Schema({
    userName: String,
    email: {type: String, unique:true},
    created : {type: Date, default: Date.now}
});
// Build the User model
var User = mongoose.model( 'User', userSchema );

async function addUser(userName, email){
    var user = new User({userName,email})
    await user.save();
}

async function testAddUser(){
    try{
        await User.deleteMany({});
        await addUser("aaaa","a@b.dk");
        await addUser("bbbb","b@b.dk");
        await addUser("cccc","c@b.dk");
        await addUser("dddd","d@b.dk");
        await addUser("Kurt Wonnegut","kw@b.dk");
        await addUser("Hanne Wonnegut","hw@b.dk");
        await addUser("ib Wonnegut","ib@b.dk");
        console.log("Users added");
    } catch(err){
        console.log("ERROR in Add Users : "+err);
    }
}

async function findUser(fields, projection){
    return await User.find({userName: /Wonnegut/i},{userName: 1,_id:0})
        .sort({userName: -1})
        .collation({locale: "da"})
        .limit(6)
    //return await User.find(fields,projection)
}
async function testFindUser(){
    var users = await findUser("ddd","ddd");
    console.log(users);
}

async function editUser() {
    let user = await User.findOneAndUpdate(
        {userName: "aaaa"},
        {email: "lol@me.com"},
        {new: true}
    )
    console.log(user);
}

async function deleteUser() {
    await User.findOneAndDelete({userName: "cccc"});
    let user = await User.findOne({userName: "cccc"});
    console.log("Status: " + (user === null));
}


//testAddUser();
//testFindUser();
//editUser();
deleteUser();



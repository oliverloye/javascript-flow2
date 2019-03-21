const LocationBlog = require('../models/locationBlog');

async function addLocationBlog(info = "undefined", slug = "undefined", img = "undefined", pos, authorID, likedByUserID = "undefined") {
    var blog = new locationBlog({
        info: [info],
        slug: [slug],
        img: [img],
        pos: [pos],
        authorID: [authorID],
        likedByUserID: [likedByUserID]
    });
    await blog.save();

}


async function likeLocationBlog(blogid, userid){
    var blog = await LocationBlog.findOneAndUpdate({_id : [blogid]}, { $push: {likedBy: userid} }, {new: true}).exec();
    return blog;
}

module.exports = {addLocationBlog, likeLocationBlog};
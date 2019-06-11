const LocationBlog = require('../models/locationBlog');

async function addLocationBlog(info, slug, img, pos, author, likedByUserID) {
    var blog = new LocationBlog({
        info,
        slug,
        img,
        pos,
        author,
        likedByUserID
    });
    await blog.save();
    return blog;

}

async function findAllBlogs() {
    return await LocationBlog.find({}).exec();
}

async function findBlogByUsername(username) {
    return await LocationBlog.find({
        "username": username
    });
}


async function likeLocationBlog(blogid, userid){
    var blog = await LocationBlog.findOneAndUpdate({_id : [blogid]}, { $push: {likedBy: userid} }, {new: true}).exec();
    return blog;
}

module.exports = {addLocationBlog, findBlogByUsername, likeLocationBlog, findAllBlogs};
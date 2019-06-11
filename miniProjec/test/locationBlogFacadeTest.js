const expect = require("chai").expect;

const User = require('../models/user');
const LocationBlog = require('../models/locationBlog');

const blogFacade = require('../facades/blogFacade');
const userFacade = require('../facades/userFacade');

// Connects to test-DB in mongoDB
require('../dbConnect')(require('../settings').TEST_DB_URI);

describe("Testing blogFacade", function () {

    before(async function () {
        await LocationBlog.deleteMany({});
        users = await userFacade.getAllUsers();
        locationBlogs = await LocationBlog.insertMany([
            {
                info: "place 1",
                slug: "slug 1",
                img: "img1",
                pos: {longitude: 12, latitude: 12},
                author: users[0]._id
            },
            {
                info: "place 2",
                slug: "slug 2",
                img: "img2",
                pos: {longitude: 18, latitude: 12},
                author: users[0]._id
            }
        ]);
    });

    it("Should find all blogs", async function () {
        var locationBlogs = await blogFacade.findAllBlogs();
        expect(locationBlogs.length).to.be.equal(2);
    })

    it("Test find blog by username", async function () {
        var user = await User.find({firstName: "firstname"});
        var userId = user[0]._id;
        var log = await blogFacade.addLocationBlog("Info", "Slug", "imgUrl", {longitude:70, latitude:87}, userId)
            .catch((err) => {
                throw err
            });
        var logByUsername = await blogFacade.findBlogByUsername(user.username);
        expect(log.info).to.be.equal("Info");
    })

    it("Test creation of a blog and add it to a user", async function () {
        var user = await User.find({firstName: "firstname"}) //.select({_id: 1}).exec();
        var userId = user[0]._id;
        var log = await blogFacade.addLocationBlog("This is info", "this is slug", "this is img", {longitude:70,latitude:90}, userId)
            .catch((err) => {
                throw err
            });
        expect(log.author).to.be.equal(userId);

    });

    // it("test if user can like a blog", async function () {
    //     var users = await User.find({}).select({_id: 1, firstName: 1}).exec()
    //         .then((data) => {
    //             if (data !== []) {
    //                 return [data[1], data[2]]
    //             } else {
    //                 throw Error("User you were looking for doesnt exist")
    //             }
    //         })
    //         .catch((err) => err);
    //
    //     log = await blogFacade.likeLocationBlog(log._id, [users[0]._id, users[1]._id]);
    //
    //     expect(log.likedBy.length).to.be.equal(2);
    //
    // })

});

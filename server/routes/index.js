module.exports = app => { 
    app.use("/api", require("./auth.routes"))
    app.use("/api", require("./users.routes"))
    app.use("/api/book", require("./books.routes"))
    app.use("/api/post", require("./posts.routes"))
    app.use("/api/review", require("./reviews.routes"))
    app.use("/api", require("./friends.routes"))
    app.use("/api/", require("./unsplash.routes"))
    app.use("/api/upload", require("./uploads.routes"))
}



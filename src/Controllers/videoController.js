export const homepageVideos = (req, res) =>{
    return res.render("home");
}
export const see = (req, res) =>{
    return res.render("watch");
}
export const edit = (req, res) =>{
    return res.render("edit");
}
export const search = (req, res) =>{
    return res.send("search");
}
export const deleteVideo = (req, res) =>{
    console.log(req.params);
    return res.send("delete");
}
export const upload = (req, res) =>{
    return res.send("upload");
}
import User from "../models/User";
import Video from "../models/Video";
export const homepageVideos = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort({ createdAt: "desc" })
      .populate("owner");
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    return res.render("server Error", { error });
  }
};
export const watch = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id).populate("owner");
    return res.render("watch", { pageTitle: video.title, video });
  } catch {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
};
export const getEdit = async (req, res) => {
  const { _id } = req.session.user;
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video Not Found" });
  }
  if (String(video.owner) !== _id) {
    req.flash("error", "Not authorized");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit ${video.title} `, video });
};
export const postEdit = async (req, res) => {
  const {
    sesson: {
      user: { _id },
    },
    params: { id },
    body: { title, description, hashtags },
  } = req;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  if (String(video.owner) !== _id) {
    req.flash("error", "Not authorized");
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
  const {
    body: { title, description, hashtags },
    files: { video, thumb },
    session: {
      user: { _id },
    },
  } = req;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].path,
      thumbUrl: thumb[0].path,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });

    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.body;
  const { _id } = req.session.user;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  if (String(video.owner) !== _id) {
    return res.status(403).redirect("/");
  }
  await Video.findOneAndDelete(id);
  return res.redirect("/");
};

export const searchVideo = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};
export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};
export const createComment = (req, res) => {
  console.log("req.body :>> ", req.body);
  console.log("req.params :>> ", req.params);
  return res.end();
};

import User from "../models/User";

export const getJoin = async (req, res) => {
  return res.render("join",{pageTitle:"join"});
};
export const postJoin = async (req, res) => {
  const {name, username, email, password, location} = req.body;
  await User.create({
    name, username, email, password, location,
  });
  return res.redirect("/login");
};
export const edit = (req, res) => {
  return res.send("edit");
};
export const deleteUser = (req, res) => {
  return res.send("delete");
};
export const login = (req, res) => {
  return res.send("login");
};
export const logout = (req, res) => {
  return res.send("logout");
};
export const see = (req, res) => {
  return res.send("see");
};

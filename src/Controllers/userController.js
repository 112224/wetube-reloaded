import User from "../models/User";

export const getJoin = async (req, res) => {
  return res.render("join",{pageTitle:"join"});
};
export const postJoin = async (req, res) => {
  const {name, username, email, password1,password2, location} = req.body;
  const usernameExists = await User.exists({$or:[{username},{email}]})
  if(password1 !== password2){
    return res.render("join",{
      pageTitle:"join", 
      errorMessage:"Password doesn`t matched!"
    });
  }
  if(usernameExists){
    return res.render("join",{
      pageTitle:"join", 
      errorMessage:"username is already exist!!"
    });
  }
  
  await User.create({
    name, username, email, password1, location,
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

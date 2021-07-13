import User from "../models/User";

export const getJoin = async (req, res) => {
  return res.render("join",{pageTitle:"Join"});
};
export const postJoin = async (req, res) => {
  const {name, username, email, password1,password2, location} = req.body;
  const usernameExists = await User.exists({$or:[{username},{email}]})
  if(password1 !== password2){
    return res.status(400).locationrender("join",{
      pageTitle:"Join", 
      errorMessage:"Password doesn`t matched!"
    });
  }
  if(usernameExists){
    return res.status(400).render("join",{
      pageTitle:"Join", 
      errorMessage:"username is already exist!!"
    });
  }
  try{
    await User.create({
      name, username, email, password1, location,
    });
  } catch(error){
    return res.status(400).render("/join",{
      pageTitle:"Join",
      errorMessage: error._message,
    })
  }
  
  return res.redirect("/login");
};
export const getLogin = (req, res) => {
  return res.render("login",{pageTitle:"Login"});
};
export const postLogin = async (req, res) => {
  const {username, password} = req.body;
  const exists = await User.exists({username});

  if(!exists){
    return res.status(400).render("login",{pageTitle:"Login", errorMessage:"An account with this username doesn't exists"})
  }

  // check if account exists
  // check if password correct
  return res.send("login");
};
export const edit = (req, res) => {
  return res.send("edit");
};
export const deleteUser = (req, res) => {
  return res.send("delete");
};
export const logout = (req, res) => {
  return res.send("logout");
};
export const see = (req, res) => {
  return res.send("see");
};

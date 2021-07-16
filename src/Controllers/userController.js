import User from "../models/User";
import bcrypt from "bcrypt"
import { application } from "express";

export const getJoin = async (req, res) => {
  return res.render("join",{pageTitle:"Join"});
};
export const postJoin = async (req, res) => {
  const {name, username, email, password,password2, location} = req.body;
  const usernameExists = await User.exists({$or:[{username},{email}]})
  
  if(password !== password2){
    return res.status(400).render("join",{
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
      name, username, email, password, location,
    });
  } catch(error){
    return res.status(400).render("join",{
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
  const pageTitle = "Login";
  const user = await User.findOne({username})

  if (!user){
    return res.status(400).render("login",{
      pageTitle, 
      errorMessage:"An account with this username doesn't exists"
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
export const startGithubLogin = (req, res) =>{
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id : process.env.GH_CLIENT,
    scope : "read:user user:email",
  }
  const params = new URLSearchParams(config).toString();
  console.log('params :>> ', params);
  const finalUrl = `${baseUrl}?${params}`;

  return res.redirect(finalUrl);
};
export const finishGithubLogin = async (req, res) =>{
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config ={
    client_id:process.env.GH_CLIENT,
    cilent_secret:process.env.GH_SECRET,
    code:req.query.code,
  };
  console.log('config :>> ', config);
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  const data = await fetch(finalUrl,{
    method:"POST",
    headers:{
      Accept: "application/json",
    },
  });
  const json = await data.json();
  console.log('json :>> ', json);
  return res.end();
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

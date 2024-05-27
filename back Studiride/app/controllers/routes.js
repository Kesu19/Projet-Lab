const Login = require("./Login/login.js")
const CreateUser = require("./Login/createLogin.js")
const GetUser = require("./GetUser/getUser.js")
const Reservaton = require("./Reservation/reservation.js")


module.exports = {
  login:{
    Login,
	  CreateUser
  },
  get:{
    GetUser
  },
  reservation:{
    Reservaton
  }
}
const Login = require("./Login/login.js")
const CreateUser = require("./Login/createLogin.js")
const GetUser = require("./GetUser/getUser.js")
const Reservaton = require("./Reservation/reservation.js")
const ConversationManager = require("./Conversations/createConversation.js")
const SendMessage = require("./Conversations/sendMessage.js")
const GetMessages = require("./Conversations/getMessages.js")

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
  },
  conversation:{
    ConversationManager,
    SendMessage,
    GetMessages
  }
}
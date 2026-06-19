const router = require("express").Router();

const Message = require("../modules/Message");
const auth = require("../middleware/auth")

//get message between two users

router.get("/:reciver",auth, async(req,res)=>{
  const {reciver}= req.params;
  const sender = req.user.username;
  const messages =  await Message.find({
    $or:[
        {sender:reciver},
        {sender:reciver,reciver:sender}
    ]
  }).sort({ createdAt:1});
  res.json(messages)
})

//Send message to a specific User

router.post("/",auth,async(req,res)=>{
    const {text,reciver} = req.body;
    const message = await message.create({
        sender:req.user.username,
        reciver,
        text,
    })
    res.json(message);
})

module.exports=router;
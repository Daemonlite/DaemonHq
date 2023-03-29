const Reply = require('../Models/replyModel') 
const Comment = require('../Models/commentModel')

const getReplies = async (req,res) => {
    try {
        const com = await Reply.find();
        return res.status(200).json(com);
         
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to retrieve replies" });
      }
}

const addReply = async (req,res) => {
    const { userProfile, userName, content, comment } = req.body;
  
    if (!content) {
      return res.status(400).json({ message: "please add comment" });
    }
  
    let existingComment;
    try {
     existingComment = await Comment.findById(comment);
    } catch (error) {
      console.log(error);
    }
    if (!existingComment) {
      return res.status(400).json({ message: "Comment not found" });
    }
  
    const reply = new Reply({
      userProfile,
      userName,
      content,
     comment,
     replies:[]
    });
  
    try {
      await reply.save();
      existingComment.replies.unshift(reply);
      await existingComment.save();
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
    return res.status(201).json(reply);
}

const deleteReply = async (req,res) => {
    const id = req.params.id;
  
    let reply;
    try {
      reply = await Reply.findOne({ _id: id });
      if (!reply) {
        return res
          .status(404)
          .json({ message: "The specified reply was not found." });
      }
      await reply.deleteOne({ _id: id });
      await Comment.updateOne(
        { _id: reply.comment },
        { $pull: { replies: { _id: reply._id } } }
      );
    } catch (err) {
      return res.status(500).json({
        message:
          "Unable to delete the  reply. An internal server error has occurred.",
      });
    }
    return res
      .status(200)
      .json({ message: "Successfully deleted the  reply." });
}

module.exports = {
    getReplies,
    addReply,
    deleteReply
}
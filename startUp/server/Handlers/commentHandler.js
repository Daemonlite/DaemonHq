const Comment = require('../Models/commentModel')
const Listing = require('../Models/listingModel')

const getComments = async (req,res) => {
    try {
        const com = await Comment.find();
        return res.status(200).json(com);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to retrieve comments" });
      }
}

const addComment = async (req, res) => {
    const { userProfile, userName, content, listing } = req.body;
  
    if (!content) {
      return res.status(400).json({ message: "please add comment" });
    }
  
    let existingListing;
    try {
     existingListing = await Listing.findById(listing);
    } catch (error) {
      console.log(error);
    }
    if (!existingListing) {
      return res.status(400).json({ message: "comment not found" });
    }
  
    const comment = new Comment({
      userProfile,
      userName,
      content,
     listing,
     replies:[]
    });
  
    try {
      await comment.save();
      existingListing.comments.unshift(comment);
      await existingListing.save();
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error });
    }
    return res.status(201).json(comment);
  };

  const deleteComment = async (req, res) => {
    const id = req.params.id;
  
    let comment;
    try {
      comment = await Comment.findOne({ _id: id });
      if (!comment) {
        return res
          .status(404)
          .json({ message: "The specified comment was not found." });
      }
      await comment.deleteOne({ _id: id });
      await Listing.updateOne(
        { _id: comment.listing },
        { $pull: { comments: { _id: comment._id } } }
      );
    } catch (err) {
      return res.status(500).json({
        message:
          "Unable to delete the  comment. An internal server error has occurred.",
      });
    }
    return res
      .status(200)
      .json({ message: "Successfully deleted the  comment." });
  };

module.exports = {
    getComments,
    addComment,
    deleteComment
}
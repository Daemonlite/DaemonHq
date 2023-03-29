const Rating = require('../Models/reviewModel')
const Company = require('../Models/companyModel')


const getRatings = async (req,res) => {
    try {
        const rate = await Rating.find();
        return res.status(200).json(rate);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to retrieve ratingss" });
      }
}

const addRating = async (req,res) => {
    const {user,rating,comment,comp} = req.body
    
    if(!user || !rating ||!comment || !comp){
        return res.status(400).json({message:"fill in required fields"})
    }

    let review;
    try {
       review = await Company.findById(comp) 
    } catch (error) {
        console.log(error)
    }
    if(!review){
        return res.status(400).json({ message: "Company not found" });
    }

    const ratings = new Rating({
        user,
        rating,
        comment,
        comp
    }) 

    try {
        await ratings.save()
        await review.ratings.unshift(ratings)
        await review.save()
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error })
    }
    
    return res.status(201).json(ratings)
}

 const deleteRating = async (req,res) => {
    const id = req.params.id;
    let rating;
    try {
      rating = await Rating.findOne({ _id: id });
      if (!rating) {
        return res
          .status(404)
          .json({ message: "The specified rating was not found." });
      }
      await rating.deleteOne({ _id: id });
      await Company.updateOne(
        { _id: rating.comp },
        { $pull: { ratings: { _id: rating._id } } }
      );
    } catch (err) {
      return res.status(500).json({
        message:
          "Unable to remove the rating. An internal server error has occurred.",
      });
    }
    return res
      .status(200)
      .json({ message: "rating removed successfully" });
}
module.exports = {
    getRatings,
    addRating,
    deleteRating
}
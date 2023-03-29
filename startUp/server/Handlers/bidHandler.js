const Bid = require('../Models/bidModel')
const Listing = require('../Models/listingModel')

const getBids = async (req,res) => {
    try {
        const bid = await Bid.find();
        return res.status(200).json(bid);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to retrieve Bids" });
      }
}

const getBidsById = async (req,res) => {
  const { id } = req.params;
  try {
    const bid = await Bid.findById(id);
    if (!bid) {
      return res.status(404).json({ message: "biding not found" });
    }
    return res.status(200).json(bid);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve Bids" });
  }
}
const placeBid = async (req,res) => {
    const {userName,userProfile,stake,listing,isAccepted} = req.body
      
    if (!userName || !userProfile || !stake){
        return res.status(400).json({message:"Please add required fields"})
    }

    let existingListing;
    try {
     existingListing = await Listing.findById(listing);
    } catch (error) {
      console.log(error);
    }
    if (!existingListing) {
      return res.status(400).json({ message: "Listing not found" });
    }

    const bid = new Bid({
        userProfile,
        userName,
        stake,
        listing,
        isAccepted
    })

     try {
        await bid.save()
        existingListing.bids.unshift(bid);
        await existingListing.save();
     } catch (error) {
        console.log(error)
        res.status(400).json({ error: error });
     }

     return res.status(201).json(bid);
}

const updateBid = async (req,res) => {
  const compId = req.params.id;
  const updatedInfo = req.body;

  const upbidInfo = await Bid.findByIdAndUpdate(compId, updatedInfo, {
    new: true,
  });

  if (!upbidInfo) {
    return res.status(404).json({ message: "bid not found" });
  }

  res.status(200).json(upbidInfo);
}
const withdrawBid = async (req,res) => {

 let bid;
    try {
      bid = await Bid.findOne({ _id: id });
      if (!bid) {
        return res
          .status(404)
          .json({ message: "The specified bid was not found." });
      }
      await bid.deleteOne({ _id: id });
      await Listing.updateOne(
        { _id: bid.listing },
        { $pull: { bids: { _id: bid._id } } }
      );
    } catch (err) {
      return res.status(500).json({
        message:
          "Unable to withdraw the  bid. An internal server error has occurred.",
      });
    }
    return res
      .status(200)
      .json({ message: "Bid withdrawn  successfully" });
}

module.exports = {
    getBids,
    placeBid,
    withdrawBid,
    getBidsById,
    updateBid
}
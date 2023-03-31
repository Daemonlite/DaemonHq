const Bid = require('../Models/bidModel')
const Listing = require('../Models/listingModel')

const getBids = async (req, res) => {
  try {
    const bids = await Bid.find();
    res.status(200).json(bids);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve bids" });
  }
};

const getBidById = async (req, res) => {
  const { id } = req.params;
  try {
    const bid = await Bid.findById(id);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }
    res.status(200).json(bid);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve bid" });
  }
};

const placeBid = async (req, res) => {
  const { userName, userProfile, stake, listing, isAccepted } = req.body;

  if (!userName || !userProfile || !stake) {
    return res.status(400).json({ message: "Please add required fields" });
  }

  try {
    const existingListing = await Listing.findById(listing);
    if (!existingListing) {
      return res.status(400).json({ message: "Listing not found" });
    }

    const bid = new Bid({
      userProfile,
      userName,
      stake,
      listing,
      isAccepted,
    });

    await bid.save();
    existingListing.bids.unshift(bid);
    await existingListing.save();

    return res.status(201).json(bid);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to place bid" });
  }
};

const updateBid = async (req, res) => {
  const bidId = req.params.id;
  const updatedInfo = req.body;

  try {
    const updatedBid = await Bid.findByIdAndUpdate(bidId, updatedInfo, {
      new: true,
    });
    if (!updatedBid) {
      return res.status(404).json({ message: "Bid not found" });
    }
    return res.status(200).json(updatedBid);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update bid" });
  }
};
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
    getBidById,
    updateBid
}
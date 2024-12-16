const Listing =require("../models/listing");
const Review =require("../models/review");

module.exports.createReview =(async (req, res) => {
          // console.log(req.body.review.rating); // Log the rating to verify its value
          // console.log(req.params.id);
          let listing = await Listing.findById(req.params.id);
          let newReview = new Review(req.body.review);
          newReview.author =req.user._id;
          console.log(newReview);
      
          listing.reviews.push(newReview);
          await newReview.save();
          await listing.save();
  
          req.flash("success", "New Review  Created!");

          res.redirect(`/listings/${listing._id}`);

      });

module.exports.destroyReview =(async (req, res) => {
          let { id, reviewId } = req.params;
  
          // Remove the review ID from the listing's reviews array
          await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  
          // Delete the review document from the Review collection
          await Review.findByIdAndDelete(reviewId);
  
          req.flash("success", " Review  Deleted!");

          // Corrected redirect syntax
          res.redirect(`/listings/${id}`);
      })
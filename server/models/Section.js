const mongoose = require("mongoose");
const SubSection = require("./SubSection");

const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
    trim: true,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
      required: true,
    },
  ],
});

// * use pre middleware
sectionSchema.pre(
  "deleteOne",
  { document: true, query: true },
  async function (next) {
    try {
      console.log("Inside section pre middleware -> ", this);

      await SubSection.deleteMany({ _id: { $in: this.subSection } });
      next();
    } catch (error) {
      console.log(
        "Error in section's subsection deleting pre middleware ",
        error
      );
      next(error);
    }
  }
);

//  ! not use because if any error is occurred then deleted but subsections not.
// sectionSchema.post("findOneAndDelete", async function (doc) {
//   if (doc) {
//     try {
//       console.log("Section in post middleware -> ", doc);
//       if (doc) {
//         await SubSection.deleteMany({ _id: { $in: doc.subSection } });
//       }
//     } catch (error) {
//       console.log(
//         "Error in section's subsection deleting post middleware ",
//         error
//       );
//     }
//   }
// });

module.exports = mongoose.model("Section", sectionSchema);

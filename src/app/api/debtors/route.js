import mongoose from "mongoose";
import { Debt } from "../../models/Debt";
import { User } from "../../models/User";
import { UserInfo } from "../../models/UserInfo";

export async function GET() {
    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URL);
  
    try {
      let debtorsIds = await Debt.distinct('userId');
    //   console.log("debtorsIds", debtorsIds);
       // Use $in operator to find users with matching IDs
    let debtors = await User.find({ _id: { $in: debtorsIds } });
    //   console.log("userssss", debtors);
      const debtorsEmails = debtors.map(debtor => {
        // console.log("DeebtUserId", debtor._id )
        return debtor.email});
    //   console.log("debtorsEmail", debtorsEmails)

      let debtorsInfo = await UserInfo.find({email: {$in: debtorsEmails}});
     
      const response = debtors.map((debtor, index) => {
        return {
         ...debtor.toObject(), // Convert Mongoose document to plain object
          // debtorsInfo: debtorsInfo[index].toObject(), // Convert Mongoose document to plain object
           ...debtorsInfo[index].toObject(), // Convert Mongoose document to plain object

        };
      });
console.log('ghfftff', response);

const extractedData = response.map((debtor) => {
  return {
    image: debtor.image,
    userId: debtor.userId.toString(),
    name: debtor.name,
    streetAddress: debtor.streetAddress,
    phone: debtor.phone,
  };
});

// console.log("extracted", extractedData);

return Response.json(extractedData);
    } catch (error) {
      console.error(error);
      return Response.json(
        { error: "An error occurred while fetching the user IDs." },
        { status: 500 }
      );
    }
  }
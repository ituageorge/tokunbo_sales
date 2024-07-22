// import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
// import { isAdmin } from "../auth/[...nextauth]/route";
import { isAdmin } from "../auth/[...nextauth]/route";
import { Debt } from "../../models/Debt";

export async function POST(req) {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);

  // Check if the user is admin
  if (!(await isAdmin(req))) {
    throw new Error("Unauthorized");
  }

  // Read and parse the request body
  const body = await req.json();
  // console.log("lllop1", body);

  try {
    const { additionalDebt, amountPaid, newBalance, userId } = body;

    const debt = new Debt({
      userId,
      amountPaid,
      additionalDebt,
      newBalance,
    });

    await debt.save();

    return Response.json({
      message: "Debt saved successfully.",
      //  data
    });
  } catch (error) {
    console.error("erro24", error);
    return Response.json(
      { error: "An error occurred while saving the debt." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL);

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  // Convert the _id string to an ObjectId
  const userId = new mongoose.Types.ObjectId(_id);

  try {
    let data = await Debt.find({ userId });
  
    // console.log("datayy", data);
    // console.log("datayylength", data.length);
    // return Response.json( await Debt.findById(userId) );
    return Response.json({ data });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "An error occurred while fetching the debt." },
      { status: 500 }
    );
  }
}

export async function DELETE_USER_DEBTS(req) {
  mongoose.connect(process.env.MONGO_URL);
  // const url = new URL(req.url);
  // const _id = url.searchParams.get("_id");

  // Convert the _id string to an ObjectId
  // const userId = new mongoose.Types.ObjectId(_id);
 
  // Check if the user is admin
 if (!(await isAdmin(req))) {
  throw new Error("Unauthorized");
}

  try {
    // let data = await Debt.deleteMany({ userId });
    // console.log("deleteDebtHistory", data);
    return Response.status(200).json({ message: 'Debt history deleted successfully' });
  } catch (error) {
    console.error(error);
    return Response.json({
      error: {
        message: "An error occurred while deleting user debt record.",
        details: error.message,
        statusCode: 500,
      },
    });
  }
  // if (await isAdmin()) {
  // await Debt.deleteOne({userId});
  // }
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const id = url.searchParams.get("_id");

  // Convert the _id string to an ObjectId
  const _id = new mongoose.Types.ObjectId(id);

  try {
     // Find the debt by ID and delete it
     const debt = await Debt.findByIdAndDelete(_id);
     if (!debt) {
       return Response.json({ message: "Debt not found" });
     }
    //  console.log("deleteDebtRow", debt);

     // Return the deleted debt
     return Response.json({
      message: "This is deleted successfully.",
       debt
    });

     } catch (error) {
      console.error("Error deleting a particular debt row:", error);
    return Response.json({
      error: {
        message: "Failed to delete the particular debt row ",
        details: error.message,
        statusCode: 500,
      },
    });
  }
  // if (await isAdmin()) {
  // await Debt.deleteOne({userId});
  // }
}

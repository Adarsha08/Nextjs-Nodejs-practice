import { Request, Response } from "express";
import prisma from "../lib/prisma";
export const createReview = async (req: Request, res: Response) => {
  try {
    //take the productid from params
    const productId = req.params.id as string;
    //take the userid from the cookies
    console.log(req.user);
    const userId = req.user!.id 
    
    const { rating, comment } = req.body;
    if (!rating || !comment) {
      return res.status(401).json({ message: "the field are empty" });
    }

    //now add the review based on the productid and userid
    const addedReview = await prisma.review.create({
      data: {
        rating,
        comment,
        productId,
        userId,
      },
    });
    return res
      .status(201)
      .json({ message: "Sucessfully added the review ", review: addedReview });
  } catch (err: any) {
     if (err.code === "P2002") {
    return res.status(400).json({
      message: "You have already reviewed this product",
    });
  }
    return res.status(500).json({ message: err.message });
  }
};

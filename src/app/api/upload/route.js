import { NextResponse } from "next/server";

export const POST = async(req) => {
  
    const formData = await req.formData()
    // console.log('req12', req.formData())
    formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET)
    formData.append("cloud_name", process.env.CLOUDINARY_NAME)

    const file = formData.get('file')
    console.log('file', file)
    let rez
      try {
        console.log("hi")
        // const result = await cloudinary.uploader.upload(file, { upload_preset: 'uploads' });
         rez = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`, {
          method: "POST", 
          body: formData  
        })
        const response = await rez.json()
        console.log('reeespo', response)
        // return
        return new NextResponse(JSON.stringify(response.url), {status: 201})
        // res.status(200).json({ url: result.secure_url });
      } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({message: "Something went wrong"}), {status: 500})

        // res.status(500).json({ error: 'Error uploading image' });
      }
  }
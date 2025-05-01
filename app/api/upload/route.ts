import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("studentPhoto") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResponse = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              upload_preset: "talent",
            },
            (error, result) => {
              if (error) reject(error);
              if (!result) reject(new Error("No result from Cloudinary"));
              resolve(result!);
            }
          )
          .end(buffer);
      }
    );

    return NextResponse.json(
      { url: uploadResponse.secure_url },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Cloudinary upload failed" },
      { status: 500 }
    );
  }
}

// THIS IS FOR MEDIA, WHEN CLOUDINARY IS SETUP.

// export async function POST(req: NextRequest) {
//     try {
//       const formData = await req.formData();
//       const mediaFiles = formData.getAll("media") as File[];

//       if (!mediaFiles.length) {
//         return NextResponse.json({ error: "No media files uploaded" }, { status: 400 });
//       }

//       const urls: string[] = [];

//       for (const file of mediaFiles) {
//         const buffer = Buffer.from(await file.arrayBuffer());

//         const uploadResponse = await new Promise<{ secure_url: string }>((resolve, reject) => {
//           cloudinary.uploader
//             .upload_stream(
//               {
//                 upload_preset: "talent",
//                 resource_type: "auto", // automatically detects image/video/etc
//               },
//               (error, result) => {
//                 if (error) return reject(error);
//                 if (!result) return reject(new Error("No result from Cloudinary"));
//                 resolve(result);
//               }
//             )
//             .end(buffer);
//         });

//         urls.push(uploadResponse.secure_url);
//       }

//       return NextResponse.json({ urls }, { status: 200 });
//     } catch (error) {
//       console.error("Upload error:", error);
//       return NextResponse.json(
//         { error: "Cloudinary upload failed" },
//         { status: 500 }
//       );
//     }
//   }

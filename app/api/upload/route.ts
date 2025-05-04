// import { NextRequest, NextResponse } from "next/server";
// import cloudinary from "@/lib/cloudinary";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("studentPhoto") as File;

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());

//     const uploadResponse = await new Promise<{ secure_url: string }>(
//       (resolve, reject) => {
//         cloudinary.uploader
//           .upload_stream(
//             {
//               upload_preset: "talent",
//             },
//             (error, result) => {
//               if (error) reject(error);
//               if (!result) reject(new Error("No result from Cloudinary"));
//               resolve(result!);
//             }
//           )
//           .end(buffer);
//       }
//     );

//     return NextResponse.json(
//       { url: uploadResponse.secure_url },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Cloudinary upload failed" },
//       { status: 500 }
//     );
//   }
// }

// // THIS IS FOR MEDIA, WHEN CLOUDINARY IS SETUP.

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

// import { NextRequest, NextResponse } from "next/server";
// import cloudinary from "@/lib/cloudinary";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     // Handle studentPhoto (single file)
//     const studentPhoto = formData.get("studentPhoto") as File | null;
//     let studentPhotoUrl = "";

//     if (studentPhoto) {
//       const buffer = Buffer.from(await studentPhoto.arrayBuffer());

//       const uploadResponse = await new Promise<{ secure_url: string }>(
//         (resolve, reject) => {
//           cloudinary.uploader
//             .upload_stream(
//               {
//                 upload_preset: "talent",
//               },
//               (error, result) => {
//                 if (error) return reject(error);
//                 if (!result)
//                   return reject(new Error("No result from Cloudinary"));
//                 resolve(result);
//               }
//             )
//             .end(buffer);
//         }
//       );

//       studentPhotoUrl = uploadResponse.secure_url;
//     }

//     // Handle media files (multiple)
//     const mediaFiles = formData.getAll("media") as File[];
//     const mediaUrls: string[] = [];

//     for (const file of mediaFiles) {
//       const buffer = Buffer.from(await file.arrayBuffer());

//       const uploadResponse = await new Promise<{ secure_url: string }>(
//         (resolve, reject) => {
//           cloudinary.uploader
//             .upload_stream(
//               {
//                 upload_preset: "talent",
//                 resource_type: "auto",
//               },
//               (error, result) => {
//                 if (error) return reject(error);
//                 if (!result)
//                   return reject(new Error("No result from Cloudinary"));
//                 resolve(result);
//               }
//             )
//             .end(buffer);
//         }
//       );

//       mediaUrls.push(uploadResponse.secure_url);
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         studentPhoto: studentPhotoUrl,
//         media: mediaUrls,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     return NextResponse.json(
//       { success: false, error: "Cloudinary upload failed" },
//       { status: 500 }
//     );
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import cloudinary from "@/lib/cloudinary";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     // === Handle studentPhoto (single file) ===
//     const studentPhotoFile = formData.get("studentPhoto") as File | null;
//     let studentPhotoUrl = "";

//     if (studentPhotoFile) {
//       const buffer = Buffer.from(await studentPhotoFile.arrayBuffer());

//       const uploadResult = await new Promise<{ secure_url: string }>(
//         (resolve, reject) => {
//           cloudinary.uploader
//             .upload_stream(
//               {
//                 upload_preset: "talent",
//                 folder: "student_photos",
//               },
//               (error, result) => {
//                 if (error) return reject(error);
//                 if (!result)
//                   return reject(new Error("No result from Cloudinary"));
//                 resolve(result);
//               }
//             )
//             .end(buffer);
//         }
//       );

//       studentPhotoUrl = uploadResult.secure_url;
//     }

//     // === Handle talent media (multiple files) ===
//     const mediaFiles = formData.getAll("media") as File[];
//     const mediaUrls: string[] = [];

//     for (const file of mediaFiles) {
//       const buffer = Buffer.from(await file.arrayBuffer());

//       const uploadResult = await new Promise<{ secure_url: string }>(
//         (resolve, reject) => {
//           cloudinary.uploader
//             .upload_stream(
//               {
//                 upload_preset: "talent",
//                 resource_type: "auto", // Supports image/video/pdf etc.
//                 folder: "talent_media",
//               },
//               (error, result) => {
//                 if (error) return reject(error);
//                 if (!result)
//                   return reject(new Error("No result from Cloudinary"));
//                 resolve(result);
//               }
//             )
//             .end(buffer);
//         }
//       );

//       mediaUrls.push(uploadResult.secure_url);
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         studentPhoto: studentPhotoUrl,
//         media: mediaUrls,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     return NextResponse.json(
//       { success: false, error: "Cloudinary upload failed" },
//       { status: 500 }
//     );
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import cloudinary from "@/lib/cloudinary";

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     // === Handle studentPhoto (single file) ===
//     const studentPhotoFile = formData.get("studentPhoto") as File | null;
//     let studentPhotoUrl = "";

//     if (!studentPhotoFile) {
//       return NextResponse.json(
//         { success: false, message: "No student photo provided." },
//         { status: 400 }
//       );
//     }

//     const studentBuffer = Buffer.from(await studentPhotoFile.arrayBuffer());

//     const uploadedPhoto = await new Promise<{ secure_url: string }>(
//       (resolve, reject) => {
//         cloudinary.uploader
//           .upload_stream(
//             {
//               upload_preset: "talent",
//               folder: "student_photos",
//               resource_type: "auto",
//             },
//             (error, result) => {
//               if (error || !result) return reject(error || "No result");
//               resolve(result);
//             }
//           )
//           .end(studentBuffer);
//       }
//     );

//     studentPhotoUrl = uploadedPhoto.secure_url;

//     // === Handle media files (multiple) ===
//     const mediaFiles = formData.getAll("media") as File[];
//     if (mediaFiles.length === 0) {
//       return NextResponse.json(
//         { success: false, message: "No media files provided." },
//         { status: 400 }
//       );
//     }

//     const mediaUrls: string[] = [];

//     for (const file of mediaFiles) {
//       const mediaBuffer = Buffer.from(await file.arrayBuffer());

//       const uploadedMedia = await new Promise<{ secure_url: string }>(
//         (resolve, reject) => {
//           cloudinary.uploader
//             .upload_stream(
//               {
//                 upload_preset: "talent",
//                 folder: "talent_media",
//                 resource_type: "auto",
//               },
//               (error, result) => {
//                 if (error || !result) return reject(error || "No result");
//                 resolve(result);
//               }
//             )
//             .end(mediaBuffer);
//         }
//       );

//       mediaUrls.push(uploadedMedia.secure_url);
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         studentPhoto: studentPhotoUrl,
//         media: mediaUrls,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     return NextResponse.json(
//       { success: false, error: "Cloudinary upload failed" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // === Handle studentPhoto (single file) ===
    const studentPhotoFile = formData.get("studentPhoto") as File | null;
    if (!studentPhotoFile) {
      return NextResponse.json(
        { success: false, message: "No student photo provided." },
        { status: 400 }
      );
    }

    const studentBuffer = Buffer.from(await studentPhotoFile.arrayBuffer());

    const uploadedPhoto = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              upload_preset: "talent",
              folder: "student_photos",
              resource_type: "auto",
            },
            (error, result) => {
              if (error || !result) return reject(error || "Upload failed");
              resolve(result);
            }
          )
          .end(studentBuffer);
      }
    );

    // === Handle talent media files (multiple) ===
    let mediaFiles = formData.getAll("media") as File[];
    if (mediaFiles.length === 0) {
      mediaFiles = formData.getAll("media[]") as File[];
    }

    if (mediaFiles.length === 0) {
      return NextResponse.json(
        { success: false, message: "No media files provided." },
        { status: 400 }
      );
    }

    // Use Promise.all to upload all media files in parallel
    const mediaUploadPromises = mediaFiles.map(async (file) => {
      const mediaBuffer = Buffer.from(await file.arrayBuffer());

      const uploadedMedia = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                upload_preset: "talent",
                folder: "talent_media",
                resource_type: "auto",
              },
              (error, result) => {
                if (error || !result) return reject(error || "Upload failed");
                resolve(result);
              }
            )
            .end(mediaBuffer);
        }
      );

      return uploadedMedia.secure_url;
    });

    const mediaUrls = await Promise.all(mediaUploadPromises);
    console.log("testmedia" + mediaUrls);

    return NextResponse.json(
      {
        success: true,
        studentPhoto: uploadedPhoto.secure_url,
        media: mediaUrls,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { success: false, error: "Cloudinary upload failed" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File;
        
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        
        const uploadResponse = await new Promise<{ secure_url: string }>((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                upload_preset: 'talent',
            }, (error, result) => {
                if (error) reject(error);
                if (!result) reject(new Error('No result from Cloudinary'));
                resolve(result!);
            }).end(buffer);
        });
        
        return NextResponse.json({ url: uploadResponse.secure_url }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Cloudinary upload failed' }, { status: 500 });
    }
}
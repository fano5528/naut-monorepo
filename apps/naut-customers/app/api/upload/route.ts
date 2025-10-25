import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // You can add authentication checks here
        return {
          allowedContentTypes: [
            'image/jpeg', 
            'image/png', 
            'image/gif', 
            'image/webp',
            'video/mp4',
            'video/webm',
            'video/ogg',
            'video/quicktime' // For .mov files
          ],
          maximumSizeInBytes: 500 * 1024 * 1024, // 500MB - adjust as needed
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // You can save the blob URL to your database here
        console.log('Upload completed', blob);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 400 },
    );
  }
}
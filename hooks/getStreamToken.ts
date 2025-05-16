import { NextRequest, NextResponse } from 'next/server';
import { StreamChat } from 'stream-chat';
import { auth } from '@clerk/nextjs/server';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const apiSecret = process.env.STREAM_SECRET!; // Store this securely
const serverClient = StreamChat.getInstance(apiKey, apiSecret);

export async function GET(req: NextRequest) {
    const { userId } = auth();

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure user exists in Stream Chat
    const token = serverClient.createToken(userId);

    return NextResponse.json({ token });
}

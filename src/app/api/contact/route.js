// app/api/contact/route.js
import { NextResponse } from 'next/server';
import { createClient } from 'redis';

// Create a Redis client
const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

async function connectRedis() {
    await client.connect(); // Ensure the client is connected
  }
  
connectRedis().catch(console.error);

export async function POST(request) {
    const { name, email, message } = await request.json();

    // Simple validation
    if (!name || !email || !message) {
        return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Create a unique key for each message submission
    const messageId = `message:${Date.now()}`; // Using timestamp as a unique ID

    try {
        // Store the message in Redis as a hash
        await client.hSet(messageId, { name, email, message });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error saving message to Redis:', error);
        return NextResponse.json({ error: 'Failed to submit message.' }, { status: 500 });
    }
}

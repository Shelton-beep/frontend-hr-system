import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import https from "https";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = session.user.email;

  // Create an HTTPS agent that ignores self-signed certificates
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const response = await axios.get(
      `${process.env.DATABASE_URL}/Auth/${userEmail}`,
      { httpsAgent: agent } // Pass the agent to Axios
    );

    const { Id } = response.data; // Destructure userId from the response data

    response.data.Id = Id; // Add Id to the response data

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error getting user:", error);
    return NextResponse.json({ error: "Failed to get user." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import https from "https";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const userRegisterDto = {
    FullName: session.user.name,
    Email: session.user.email,
    Religion: body.Religion,
    Nationality: body.Nationality,
    NationalIdNumber: body.NationalIdNumber,
    MaritalStatus: body.MaritalStatus,
    DateOfBirth: body.DateOfBirth,
    Gender: body.Gender,
    PhoneNumber: body.PhoneNumber,
    ProfileComplete: true,
  };

  // Create an HTTPS agent that ignores self-signed certificates
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const response = await axios.post(
      `${process.env.DATABASE_URL}/Auth/register`,
      userRegisterDto,
      { httpsAgent: agent } // Pass the agent to Axios
    );

    // Revalidate the path before returning the response
    revalidatePath("/profile");

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Error posting user:", error);
    return NextResponse.json(
      { error: "Failed to register user." },
      { status: 500 }
    );
  }
}

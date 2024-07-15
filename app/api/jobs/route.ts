import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session || session.user.role !== "user") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const job = {
    title: body.title,
    jobLocation: body.jobLocation,
    jobType: body.jobType,
    applicationDeadline: body.applicationDeadline,
    grade: body.grade,
    description: body.description,
    createdAt: new Date(),
    isActive: body.applicationDeadline
      ? new Date(body.applicationDeadline) >= new Date()
      : true,
  };

  try {
    const createdJob = await prisma.job.create({
      data: job,
    });

    // Revalidate the path before returning the response
    revalidatePath("/admin/dashboard");

    return NextResponse.json(createdJob, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        requirements: true,
        keyOutputs: true,
        skills: true,
      },
    });

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs." },
      { status: 500 }
    );
  }
}

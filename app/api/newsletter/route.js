import { NextResponse } from "next/server";

export async function POST(req) {
  const { email } = await req.json();

  // Basic validation
  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { message: "Please provide a valid email." },
      { status: 400 }
    );
  }

  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
    },
    body: JSON.stringify({
      email,
      groups: [process.env.MAILERLITE_GROUP_ID],
      status: "active",
    }),
  });

  const json = await res.json();

  if (res.ok) {
    return NextResponse.json({ message: "Thanks for subscribing! 🎉" });
  } else {
    return NextResponse.json(
      { message: json.message || "Subscription failed." },
      { status: res.status }
    );
  }
}

import { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log("======================================");
  console.log("NEWSLETTER API CALLED");
  console.log("Method:", req.method);
  console.log("======================================");

  if (req.method !== "POST") {
    console.log("Rejected - Method not allowed");
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    console.log("Request Body:");
    console.log(req.body);

    const { email } = req.body;

    console.log("Extracted email:", email);

    console.log("===== ENV CHECK =====");
    console.log("process.cwd():", process.cwd());
    console.log("TO_EMAIL =", process.env.TO_EMAIL);
    console.log("RESEND_API_KEY =", process.env.RESEND_API_KEY ? "YES" : "NO");
    console.log("Keys containing EMAIL or RESEND:");
    Object.keys(process.env)  
      .filter(k => k.includes("EMAIL") || k.includes("RESEND"))  
      .sort()  
      .forEach(k => console.log(`${k} = ${process.env[k]}`));
    
    console.log("=====================");

    console.log("Calling Resend API...");

    const { data, error } = await resend.emails.send({
      from: "Naveen Landscapes <info@naveenlandscapes.com>",
      to: process.env.TO_EMAIL!,
      subject: "🌿 New Newsletter Subscriber",
      html: `
        <h2>New Newsletter Subscription</h2>

        <p><strong>Email:</strong> ${email}</p>

        <hr>

        <p>
          Submitted:
          ${new Date().toLocaleString()}
        </p>
      `,
    });

    console.log("Returned from Resend");

    if (error) {
      console.log("Resend Error:");
      console.log(error);

      return res.status(500).json({
        success: false,
        error,
      });
    }

    console.log("SUCCESS!");
    console.log(data);

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (err: any) {

    console.log("UNCAUGHT ERROR");
    console.log(err);

    return res.status(500).json({
      success: false,
      error: err.message,
      stack: err.stack,
    });

  }
}
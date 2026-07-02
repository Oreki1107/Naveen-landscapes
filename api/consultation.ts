import { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const {
      name,
      phone,
      email,
      city,
      service,
      preferred_date,
      message,
    } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        error: "Name, Phone and Email are required.",
      });
    }

    const { data, error } = await resend.emails.send({
      from: "Naveen Landscapes <info@naveenlandscapes.com>",
      to: process.env.TO_EMAIL!,
      subject: "🌿 New Consultation Request",

      html: `
      <div style="font-family:Arial,sans-serif;background:#f4f7f4;padding:30px;">
        <div style="max-width:700px;margin:auto;background:white;border-radius:12px;padding:30px;border:1px solid #ddd;">

          <h1 style="color:#2E7D32;margin-top:0;">
            🌿 New Consultation Request
          </h1>

          <hr>

          <table style="width:100%;border-collapse:collapse;">

            <tr>
              <td style="padding:10px;"><strong>Name</strong></td>
              <td>${name}</td>
            </tr>

            <tr>
              <td style="padding:10px;"><strong>Phone</strong></td>
              <td>${phone}</td>
            </tr>

            <tr>
              <td style="padding:10px;"><strong>Email</strong></td>
              <td>${email}</td>
            </tr>

            <tr>
              <td style="padding:10px;"><strong>City</strong></td>
              <td>${city || "-"}</td>
            </tr>

            <tr>
              <td style="padding:10px;"><strong>Service Required</strong></td>
              <td>${service || "-"}</td>
            </tr>

            <tr>
              <td style="padding:10px;"><strong>Preferred Date</strong></td>
              <td>${preferred_date || "-"}</td>
            </tr>

          </table>

          <hr>

          <h3>Customer Message</h3>

          <div style="
            background:#f8f8f8;
            padding:15px;
            border-radius:8px;
            white-space:pre-wrap;
          ">
            ${message || "No message provided."}
          </div>

          <hr>

          <p style="color:#666;font-size:13px;">
            Submitted on ${new Date().toLocaleString()}
          </p>

        </div>
      </div>
      `,
    });

    if (error) {
      return res.status(500).json({
        success: false,
        error,
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (err: any) {

    return res.status(500).json({
      success: false,
      error: err.message,
    });

  }
}
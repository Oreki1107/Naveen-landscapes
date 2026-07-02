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
      full_name,
      phone_number,
      whatsapp_number,
      email,
      city,
      state,
      company_organization,
      project_location,
      product_interested,
      quantity_required,
      preferred_colour,
      application_type,
      delivery_location,
      additional_requirements,
    } = req.body;

    const { data, error } = await resend.emails.send({
      from: "Naveen Landscapes <info@naveenlandscapes.com>",
      to: process.env.TO_EMAIL!,
      subject: "🌿 New Product Enquiry",
      html: `
      <h2>New Product Enquiry</h2>

      <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;font-family:Arial,sans-serif;">
        <tr><td><b>Full Name</b></td><td>${full_name ?? "-"}</td></tr>
        <tr><td><b>Phone Number</b></td><td>${phone_number ?? "-"}</td></tr>
        <tr><td><b>WhatsApp Number</b></td><td>${whatsapp_number ?? "-"}</td></tr>
        <tr><td><b>Email</b></td><td>${email ?? "-"}</td></tr>
        <tr><td><b>City</b></td><td>${city ?? "-"}</td></tr>
        <tr><td><b>State</b></td><td>${state ?? "-"}</td></tr>
        <tr><td><b>Company / Organization</b></td><td>${company_organization ?? "-"}</td></tr>
        <tr><td><b>Project Location</b></td><td>${project_location ?? "-"}</td></tr>
        <tr><td><b>Product Interested</b></td><td>${product_interested ?? "-"}</td></tr>
        <tr><td><b>Quantity Required</b></td><td>${quantity_required ?? "-"}</td></tr>
        <tr><td><b>Preferred Colour</b></td><td>${preferred_colour ?? "-"}</td></tr>
        <tr><td><b>Application Type</b></td><td>${application_type ?? "-"}</td></tr>
        <tr><td><b>Delivery Location</b></td><td>${delivery_location ?? "-"}</td></tr>
      </table>

      <br>

      <h3>Additional Requirements</h3>

      <div style="padding:15px;background:#f5f5f5;border-radius:8px;">
        ${additional_requirements || "None"}
      </div>

      <br>

      <small>
        Submitted on ${new Date().toLocaleString()}
      </small>
      `,
    });

    if (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        error,
      });
    }

    console.log("PRODUCT ENQUIRY EMAIL SENT");
    console.log(data);

    return res.status(200).json({
      success: true,
    });
  } catch (err: any) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "eurostar014@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function handleFormSubmit(
  prevState: any,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  console.log("--- New Contact Form Submission ---");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);
  console.log("------------------------------------");

  // Here you would typically send an email using a service like Nodemailer, Resend, or SendGrid.
  // For this example, we'll just return a success message.

  if (name && email && message) {
    try {
      await transporter.sendMail({
        from: "eurostar014@gmail.com", // Gmail forces this to be the authenticated user
        to: "eurostar014@gmail.com",
        replyTo: email, // Reply to the user
        subject: `Contact Form: New Message from ${name}`,
        text: `
            Name: ${name}
            Email: ${email}
            
            Message:
            ${message}
          `,
        html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
      });
      return { success: true, message: "Your message has been sent successfully!" };
    } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, message: "Failed to send message. Please try again later." };
    }
  } else {
    return { success: false, message: "Please fill out all fields." };
  }
}

"use server";

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
      // In a real application, you would add your email sending logic here.
      // For now, we simulate a successful submission.
      return { success: true, message: "Your message has been sent successfully!" };
    } else {
      return { success: false, message: "Please fill out all fields." };
    }
}

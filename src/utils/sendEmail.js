import emailjs from "@emailjs/browser";

const sendEmail = (shippingInfo, cart) => {
    if (!shippingInfo.email) {
        alert("Error: Email is missing!");
        return;
    }

    const templateParams = {
        to_email: shippingInfo.email,  // Ensure email is passed
        user_name: shippingInfo.name || "Unknown",
        user_address: `${shippingInfo.address || "N/A"}, ${shippingInfo.city || "N/A"}, ${shippingInfo.zip || "N/A"}, ${shippingInfo.country || "N/A"}`,
        order_details: cart
            .map((item) => `${item.title} - ₹${item.price} x ${item.quantity}`)
            .join("\n"),
        total_price: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };

    console.log("🚀 Sending Email with Params:", templateParams);  // Debugging

    emailjs
        .send(process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            templateParams,
            `${process.env.REACT_APP_EMAILJS_PUBLIC_KEY}-S`)
        .then(() => {
            // alert("✅ Order email sent!");
        })
        .catch((error) => {
            // alert("❌ Email failed to send.");
            console.error("EmailJS error:", error);
        });
};

export default sendEmail;

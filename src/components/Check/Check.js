import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

function Check() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const sending = {
      to_name: "hadi",
      price: 500,
      message: "hello world",
      date: "30",
    };

    emailjs
      .send("service_waru9nb", "template_bbdnd4j", sending, "JGzKA2xcoNIE8mFWN")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default Check;

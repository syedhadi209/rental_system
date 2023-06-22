import React, { useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function PropertyBox({ ele, handleDelete, date }) {
  useEffect(() => {
    const checkDate = () => {
      const currentDate = new Date();
      const targetDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        date
      );

      if (currentDate >= targetDate) {
        // Target date has arrived
        const sending = {
          to_name: ele.renterName,
          price: ele.rentPrice,
          message: "Please Collect The Rent",
          date: ele.collectionDate,
          address: ele.address,
        };

        emailjs
          .send(
            "service_waru9nb",
            "template_bbdnd4j",
            sending,
            "JGzKA2xcoNIE8mFWN"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
        console.log("Target date has arrived!");
      } else {
        // Target date has not arrived yet
        console.log("Target date has not arrived yet.");
      }
    };

    // Check the date every day at 12 AM
    const intervalId = setInterval(checkDate, 24 * 60 * 60 * 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [date]);
  return (
    <div className="property-box">
      <div className="property-text-data">
        <h3>{ele.renterName}</h3>
        <p>{ele.address}</p>
      </div>
      <div className="property-date-data">
        <p>
          <span style={{ fontWeight: "bold" }}>Collection Date: </span>{" "}
          {ele.collectionDate}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Rent Price:</span> $
          {ele.rentPrice}
        </p>
        <button onClick={() => handleDelete(ele.propertyId)}>X</button>
      </div>
    </div>
  );
}

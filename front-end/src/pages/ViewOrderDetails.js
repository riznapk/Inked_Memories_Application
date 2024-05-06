import React from "react";

function ViewOrderDetails({ data }) {
  return (
    <div>
      <h2>Order Details</h2>
      <p>Order ID: {data.orderID}</p>
      <p>Order Placed Date: {data.orderPlacedDate}</p>
      <p>Status: {data.status}</p>
      <p>Payment: {data.payment}</p>
      <p>Amount: £{data.amount.toFixed(2)}</p>

      <h3>Cart Items: </h3>
      {data.cartItems.map((item, index) => (
        <div key={index} style={{ marginTop: "30px", marginBottom: "30px" }}>
          <img
            src={item.designImageURI}
            style={{ objectFit: "contain", height: "180px", width: "180px" }}
          />
          <p>Cart ID: {item.cartID}</p>
          <p>Design Font: {item.designFont}</p>
          <p>Design Price: £{item.designPrice}</p>
          <p>Message: {item.message.split(" ").slice(0, 20).join(" ")}</p>
          <p>Scheduled Date: {item.scheduledDate}</p>
          {item?.isLetterIncluded ? <p>Letter: Included with the card</p> : ""}

          <h4>Address: </h4>
          <p>Street Address: {item.address.streetAddress}</p>
          <p>City: {item.address.city}</p>
          <p>County: {item.address.county}</p>
          <p>Postal Code: {item.address.postalCode}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewOrderDetails;

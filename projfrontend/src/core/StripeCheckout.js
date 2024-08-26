import React, { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({
  products,
  setReload = f => f,
  reload = undefined
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  });

  const token= isAutheticated() && isAutheticated().token;
  const userId = isAutheticated() && isAutheticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = token => {
   
    const body = {
      token,
      products
    };
    const headers = {
      "Content-Type": "application/json"
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log(response);
        // const orderData = {
        //   products: products,
        //   transaction_id: response.token.id,
        //   amount: response.token.amount
        // };
        // createOrder(userId, token, orderData);
        cartEmpty(() => {
          console.log("Did we got a crash?");
        });

        setReload(!reload);
      })
      .catch(error => console.log(error));
  };
  
  const showStripeButton = () => {
    return isAutheticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51I1r6aActpcVvEoyGU5bLAwCknicuJsjTftyI3gNC4RYh86HCugPSPWiSsKpxbCaHOmzkwUBXCc36ntT7gbqJSx8006pez3V6S"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Proceed to Buy</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Pay Now ${getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;

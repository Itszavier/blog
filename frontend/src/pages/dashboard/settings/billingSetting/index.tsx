/** @format */

import React from "react";
import style from "./style.module.css";

function BillingSettings() {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.title}>Billing Settings</h2>
        <p className={style.section_description}>Update your billing information below</p>
      </div>

      <form className={style.form}>
        <div className={style.input_group}>
          <div className={style.input_wrapper}>
            <label>Cardholder Name</label>
            <input className={style.input} type="text" placeholder="Cardholder Name" />
            <p className={style.description}>Enter the name on your card</p>
          </div>

          <div className={style.input_wrapper}>
            <label>Card Number</label>
            <input className={style.input} type="text" placeholder="Card Number" />
            <p className={style.description}>Enter your card number</p>
          </div>

          <div className={style.input_wrapper}>
            <label>Expiration Date</label>
            <input className={style.input} type="text" placeholder="MM/YY" />
            <p className={style.description}>Enter the expiration date</p>
          </div>

          <div className={style.input_wrapper}>
            <label>CVV</label>
            <input className={style.input} type="text" placeholder="CVV" />
            <p className={style.description}>Enter the CVV code</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BillingSettings;

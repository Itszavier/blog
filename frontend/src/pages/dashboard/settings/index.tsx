/** @format */

//** @format */
import style from "./style.module.css";
import AccountSettings from "./accountSettings";
import PrivacySettings from "./accountPrivciy";
import BillingSettings from "./billingSetting";

const defaultUrl =
  "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";

export default function ProfileTab() {
  return (
    <div className={style.container}>
      <AccountSettings />
      <PrivacySettings />
      <BillingSettings />
    </div>
  );
}

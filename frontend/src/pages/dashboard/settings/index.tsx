/** @format */

//** @format */
import style from "./style.module.css";
import AccountSettings from "./accountSettings";
import PrivacySettings from "./accountPrivciy";
import BillingSettings from "./billingSetting";
import Tabs, { Tab } from "../../../components/Tabs";

const defaultUrl =
  "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";

export default function ProfileTab() {
  return (
    <div className={style.container}>
      <Tabs
        bodyClassName={style.tab_body}
        containerClassName={style.tab_container}
        headerClassName={style.tab_header}
        ActiveClassName={style.active}
      >
        <Tab label="Public Profile">
          <AccountSettings />
        </Tab>
        <Tab label="Privacy">"hello wrold"</Tab>

        <Tab label="Billing & MemberShip">"hello wrold"</Tab>
      </Tabs>
    </div>
  );
}

/** @format */

import { NavLink } from "react-router-dom";
import styles from "./style.module.css";

type NavigationLink = {
  path: string;
  label: string;
  icon?: string;
  className?: string; // Optional property
  subLinks?: NavigationLink[]; // Optional nested array
};

const navigationLinks = [
  {
    path: "/",
    label: "overview",
    icon: "list",
  },
  {
    path: "/privacy",
    label: "Privacy",
    icon: "security",
  },
  {
    label: "Account",
    icon: "account_circle", // Icon for Account category
    subLinks: [
      { path: "/membership", label: "Membership" },
      { path: "/billing", label: "Billing" },
      { path: "/settings", label: "Settings" },
    ],
  },
  { path: "/logout", label: "Logout", icon: "logout", className: "logout_btn" },
];

export default function SideNav() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>Narrate</div>

      <nav className={styles.nav}>
        {navigationLinks.map((link) => (
          <div key={link.path || link.label}>
            {" "}
            {/* Use path or label for key */}
            {link.subLinks ? (
              <>
                <NavLink
                  to="#" // Prevent default anchor behavior for categories
                  className={styles.navLink}
                >
                  <span className="material-icons">{link.icon}</span>
                  {link.label}
                </NavLink>
                <ul className={styles.subLinkList}>
                  {link.subLinks.map((subLink) => (
                    <li key={subLink.path}>
                      <NavLink
                        style={{ marginLeft: "30px" }}
                        to={subLink.path}
                        className={styles.subLink}
                      >
                        {subLink.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <NavLink to={link.path} className={styles.navLink}>
                <span className="material-icons">{link.icon}</span>
                {link.label}
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      <button className={styles.logoutBtn}>
        logout
        <span className="material-icons"></span>
      </button>
    </div>
  );
}

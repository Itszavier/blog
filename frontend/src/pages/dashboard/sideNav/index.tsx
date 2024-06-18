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
    path: "/dashboard",
    label: "Overview",
    icon: "list",
  },
  {
    path: "/dashboard/privacy",
    label: "Privacy",
    icon: "security",
  },
  {
    label: "Account",
    icon: "account_circle", // Icon for Account category
    subLinks: [
      { path: "/dashboard/membership", label: "Membership" },
      { path: "/dashboard/billing", label: "Billing" },
      { path: "/dashboard/settings", label: "Settings" },
    ],
  },
];

export default function SideNav() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <h3 className={styles.logo_text}>Narrate</h3>
      </div>

      <nav className={styles.nav}>
        {navigationLinks.map((link) => (
          <div key={link.path || link.label}>
            {link.subLinks ? (
              <>
                <NavLink to="#" className={styles.navLink}>
                  <span className="material-icons">{link.icon}</span>
                  {link.label}
                </NavLink>
                <ul className={styles.subLinkList}>
                  {link.subLinks.map((subLink) => (
                    <li key={subLink.path}>
                      <NavLink
                        to={subLink.path}
                        className={({ isActive }) =>
                          isActive
                            ? `${styles.subLink} ${styles.activeNavLink}`
                            : styles.subLink
                        }
                      >
                        <span style={{ marginLeft: "30px" }}>{subLink.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
                }
              >
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

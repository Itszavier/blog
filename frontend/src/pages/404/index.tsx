/** @format */
import Footer from "../../components/footer";
import style from "./style.module.css";

export default function NotFound() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.wrapper}>
          <h1>Oops! Page Not Found (404)</h1>
          <p>
            We're sorry, but the page you're looking for doesn't exist. It looks like the
            page you were trying to reach is no longer here or never existed in the first
            place. This might be due to: A mistyped URL A moved or deleted page An
            out-of-date link
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

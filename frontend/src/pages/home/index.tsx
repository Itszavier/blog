import { useModal } from "../../context/modalContext";
import style from "./style.module.css";

export default function Home() {
  const { openModal } = useModal("auth");

  return (
    <div className={style.container}>
      <div className={style.landing}>
        <h3 className={style.title}>
          {" "}
          Join the Exchange: Share Your Insights, Expand Your Mind!
        </h3>

        <p className={style.text}>
          Join our community-driven platform for sharing insights and ideas.
          Dive into a wealth of knowledge contributed by passionate individuals.
          Contribute your expertise or find inspiration. Explore, learn, and
          innovate with us.
        </p>

        <div className={style.button_wrapper}>
          <button
            onClick={() => {
              openModal();
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

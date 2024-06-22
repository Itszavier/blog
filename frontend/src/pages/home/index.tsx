/** @format */

//import { useModal } from "../../context/modalContext";
import styles from "./style.module.css";
//import Image from "../../assets/landingImage.jpg";
import style from "./style.module.css";
import image from "../../assets/landing.png";
import Footer from "../../components/footer";
export default function Home() {
  return (
    <div className={styles.container}>
      <header>
        <div className={style.heroContent}>
          <img className={style.landing_image} src={image} />
          <h1>
            Create and Share Your <span>Expertise with ProArticle</span>
          </h1>
          <p>Empower Your Writing. Engage with Professionals. Share Your Knowledge.</p>
          <button className={style.ctaButton}>Get Started Now</button>
        </div>
      </header>

      <section className={style.features}>
        <div className={style.divider}>
          <div className={style.editor_features}>
            <h2>Powerful Rich Text Editor</h2>
            <p>
              Our intuitive rich text editor makes writing and formatting your articles a
              breeze. With a wide range of styling options and media integration, you can
              focus on crafting compelling content without any distractions.
            </p>
          </div>

          <ul className={style.featureList}>
            <li className={style.featureListItem}>
              <h2>Easy Formatting</h2>
              <p>Bold, italicize, underline, and more with a single click.</p>
            </li>

            <li className={style.featureListItem}>
              <h2>Media Integration</h2>
              <p>Embed images, videos, and other media directly into your articles.</p>
            </li>

            <li className={style.featureListItem}>
              <h2>Media Integration</h2>
              <p>Embed images, videos, and other media directly into your articles.</p>
            </li>

            <li className={style.featureListItem}>
              <h2>Live Preview</h2>
              <p>See how your article will look to your readers in real-time.</p>
            </li>
          </ul>
        </div>
        <section className={style.writing_community}>
          <div className={style.community_intro}>
            <h2 className={style.community_title}>Join a Vibrant Writing Community</h2>
            <p className={style.community_description}>
              ProArticle isn't just a writing platform; it's a welcoming community for
              writers of all levels. Whether you're a seasoned professional or just
              starting out, you'll find a supportive network of fellow writers eager to
              connect, share insights, and help each other grow.
            </p>
          </div>

          <ul className={style.community_features}>
            <li className={`card ${style.feature_item}`}>
              <h2 className={style.feature_title}>Follow and Connect</h2>
              <p className={style.feature_description}>
                Expand your network by following other writers and discovering new voices.
              </p>
            </li>
            <li className={`card ${style.feature_item}`}>
              <h2 className={style.feature_title}>Engage with Content</h2>
              <p className={style.feature_description}>
                Like and comment on articles to exchange thoughts and provide feedback.
              </p>
            </li>

            <li className={`card ${style.feature_item}`}>
              <h2 className={style.feature_title}>Stay Updated</h2>
              <p className={style.feature_description}>
                Receive notifications about new followers, comments, and likes on your
                posts, keeping you connected and informed.
              </p>
            </li>
          </ul>
        </section>
        <div className={`${style.divider} ${style.dashboard_features}`}>
          <div className={`${style.editor_features}`}>
            <h2>Comprehensive Dashboard</h2>
            <p>
              Manage your articles and interactions seamlessly with our user-friendly
              dashboard. Whether you're editing drafts or monitoring reader engagement,
              our dashboard provides all the tools you need in one place.
            </p>
          </div>

          <ul className={style.featureList}>
            <li className={style.featureListItem}>
              <h2>Draft Management</h2>
              <p>Save your work as drafts and publish when ready.</p>
            </li>

            <li className={style.featureListItem}>
              <h2>Edit and Update:</h2>
              <p>Make changes to your articles anytime with our easy-to-use editor</p>
            </li>

            <li className={style.featureListItem}>
              <h2>Reader Interaction</h2>
              <p>Track likes, comments, and followers to gauge reader engagement.</p>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}

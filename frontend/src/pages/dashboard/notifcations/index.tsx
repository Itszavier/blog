/** @format */
import style from "./style.module.css";
const notifications = [
  {
    id: 1,
    title: "New Like",
    message: "John Doe liked your article.",
    type: "like",
    time: "2m ago",
    read: false,
    author: "John Doe",
  },
  {
    id: 2,
    title: "New Comment",
    message: "Jane Smith commented on your post.",
    type: "comment",
    time: "10m ago",
    read: false,
    author: "Jane Smith",
  },
  {
    id: 3,
    title: "New Follower",
    message: "You have a new follower.",
    type: "follower",
    time: "1h ago",
    read: true,
    author: "Jane Smith",
  },
  {
    id: 4,
    title: "Article Published",
    message: "Your article was published successfully.",
    type: "system",
    time: "3h ago",
    read: true,
    author: "System",
  },
];

export default function Notifcations() {
  console.log("runing notifcation page");
  return (
    <div className={style.container}>
      <h2 className={style.title}>Notifications</h2>
      <div className={style.controls}>
        <input className={style.input} type="text" placeholder="Search notifications" />
        <select>
          <option value="all">All</option>
          <option value="like">Likes</option>
          <option value="comment">Comments</option>
          <option value="follower">Followers</option>
          <option value="system">System</option>
        </select>
        <button className={style.search_btn}>search</button>
      </div>

      <ul className={style.notifcation_list}>
        {notifications.map((notifcation) => {
          return (
            <li className={style.notifcation_item}>
              <div className={style.header}>
                <button className={style.remove_btn}>
                  <i className="bx bxs-x-square"></i>
                </button>
                <span className={style.type_tag}>{notifcation.type}</span>
                <p className={style.time}>
                  <span>
                    <i className="bx bxs-time"></i>
                  </span>
                  {notifcation.time}
                </p>
              </div>

              <div className={style.body}>
                <h4 className={style.text}>{notifcation.title}</h4>
                <p className={style.text}>{notifcation.message}</p>

                <p className={style.author}>{notifcation.author}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

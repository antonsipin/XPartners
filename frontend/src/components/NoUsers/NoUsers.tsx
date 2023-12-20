import styles from "./NoUsers.module.scss";

export default function NoUsers(): JSX.Element {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Users}>There are no users here yet!</div>
    </div>
  );
}

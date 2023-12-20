import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NoUsers } from "../../components/NoUsers";
import useAccount from "../../hooks/useAccount";
import styles from "./Users.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { Select } from "../../components/Select/Select";
import { ThemeContext } from "../../App/ThemeContext";
import cn from "classnames";
import Button from "../../components/Button";
import { MdOutlineChevronRight } from "react-icons/md";
import Carousel from "react-bootstrap/Carousel";
import { getAge } from "../../utils/getAge";

export const Users = () => {
  const { users, handleGetUsers } = useAccount();
  const { accessToken } = useAuth();
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetUsers(accessToken);
  }, []);

  const handleAccount = () => {
    navigate("/account");
  };

  return (
    <div className={cn(styles.Wrapper, styles[`Wrapper--${theme}`])}>
      <div className={styles.header}>
        <Link to="/logout" className={styles.LogoutLink}>
          Logout
        </Link>
        <div className={styles.Select}>
          <Select value={theme} setTheme={setTheme} />
        </div>
      </div>
      <div className={styles.Body}>
        <div>
          <h4 className={styles.Title}>Scroll to view accounts below</h4>
        </div>
        {users.length ? (
          <div>
            <Carousel
              variant="dark"
              interval={3000}
              style={{ height: "22rem", width: "100%" }}
            >
              {users.map((user, index) => (
                <Carousel.Item>
                  <img src={`/files/${user.photo}`} alt={""} />
                  <h4 className={styles.Name}>{user.name}</h4>
                  <p className={styles.Age}>Age: {getAge(user.birthDate)}</p>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        ) : (
          <NoUsers />
        )}
        <div className={styles.btnBack}>
          <Button
            btnType={"submit"}
            children={
              <div>
                Back to account <MdOutlineChevronRight />
              </div>
            }
            onClick={handleAccount}
          />
        </div>
      </div>
    </div>
  );
};

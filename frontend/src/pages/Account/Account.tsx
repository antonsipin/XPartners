import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
  useCallback,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Account.module.scss";
import "../../components/Logout";
import useAccount from "../../hooks/useAccount";
import { Spinner } from "../../components/Loader";
import cn from "classnames";
import Button from "../../components/Button";
import { AlertComponent } from "../../components/Alert";
import { MdCreate, MdOutlineChevronRight, MdClear } from "react-icons/md";
import { Select } from "../../components/Select/Select";
import { ThemeContext } from "../../App/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { getAge } from "../../utils/getAge";
import Form from "react-bootstrap/Form";
import { UpdateUser } from "../../types/UpdateUser";

function Account(): JSX.Element {
  const { info, handleInfo, handleError, handleUpdateUser } = useAccount();
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, accessToken, error } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const age = useMemo(() => getAge(user.birthDate), []);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState<any>();
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = useCallback(
    async ({ name, password, photo }: UpdateUser) => {
      try {
        if (name.trim() && password.trim() && photo) {
          const updateInput = { name, password, photo };
          await handleUpdateUser(accessToken, updateInput);
        } else {
          handleError("All fields must be filled");
        }
      } catch (e) {
        handleError(String(e));
      }
    },
    []
  );

  useEffect(() => {
    if (isSubmit) {
      handleUpdate({ name, password, photo });
      setIsSubmit(false);
      setShowSettings(!showSettings);
    }
  }, [setIsSubmit, isSubmit]);

  useEffect(() => {
    if (error === "Please Log In!") {
      navigate("/");
    }
  }, [error]);

  const handleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleCloseForm = () => {
    setShowSettings(!showSettings);
  };

  const handleAccounts = () => {
    navigate("/people");
  };

  const handleFile = (e: any) => {
    const file = e.currentTarget.files[0];
    setPhoto(file);
  };

  return (
    <div className={cn(styles.Wrapper, styles[`Wrapper--${theme}`])}>
      {user.name ? (
        <div>
          <div className={styles.header}>
            <Link to="/logout" className={styles.LogoutLink}>
              Logout
            </Link>
            <div className={styles.Select}>
              <Select value={theme} setTheme={setTheme} />
            </div>
            <span className={styles.userName}>
              {`${user.name}, welcome to your account!`}
            </span>
          </div>

          {info || error ? (
            <div className={styles.Alert}>
              <AlertComponent
                error={error}
                info={info}
                onHandleInfo={handleInfo}
                onHandleError={handleError}
              />
            </div>
          ) : (
            ""
          )}
          <div className={styles.card}>
            <Card style={{ width: "21rem" }}>
              {!showSettings && (
                <div>
                  <Card.Img variant="top" src={`/files/${user.photo}`} />
                </div>
              )}
              <Card.Body>
                <Card.Title className={styles.cardTitle}>
                  {user.name}
                </Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item className={styles.cardField}>
                  Age: {age}
                </ListGroup.Item>
                <ListGroup.Item className={styles.cardField}>
                  {user.gender}
                </ListGroup.Item>
              </ListGroup>
              <div className={styles.cardBody}>
                {!showSettings && (
                  <Button
                    btnType={"submit"}
                    children={
                      <div>
                        Edit account <MdCreate />
                      </div>
                    }
                    onClick={handleSettings}
                  />
                )}
                <Button
                  btnType={"submit"}
                  children={
                    <div>
                      User Accounts <MdOutlineChevronRight />
                    </div>
                  }
                  onClick={handleAccounts}
                />
              </div>
            </Card>
            {showSettings && (
              <div className={styles.form}>
                <div className={styles.formClearBtn}>
                  <MdClear onClick={handleCloseForm} />
                </div>

                <Form id="user-form">
                  <Form.Group
                    style={{ color: "grey" }}
                    className="mb-3"
                    controlId="text"
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={name}
                      placeholder="Enter new name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Text className="text-muted" />
                  </Form.Group>

                  <Form.Group
                    style={{ color: "grey" }}
                    className="mb-3"
                    controlId="formBasicPassword"
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group
                    style={{ color: "grey" }}
                    className="mb-3"
                    controlId="formBasicPhoto"
                  >
                    <Form.Label>Add Photo</Form.Label>
                    <Form.Control
                      type="file"
                      name="photo"
                      accept=".png,.jpg,.jpeg,.gif"
                      placeholder="Photo"
                      onInput={(e) => {
                        handleFile(e);
                      }}
                    />
                  </Form.Group>

                  <Button
                    btnType={"submit"}
                    children={
                      <div>
                        Save <MdOutlineChevronRight />
                      </div>
                    }
                    onClick={() => setIsSubmit(true)}
                  />
                </Form>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.loader}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default React.memo(Account);

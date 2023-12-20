import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.scss";
import Form from "react-bootstrap/Form";
import { Button } from "../../components/Button";
import UserAlert from "../UserAlert";
import { User } from "../../types/User";
import { validateEmail } from "../../utils/validate";
import { MdOutlineChevronRight } from "react-icons/md";
import cn from "classnames";
import { ThemeContext } from "../../App/ThemeContext";
import { Header } from "../Header";
import { useAuth } from "../../hooks/useAuth";

function SignUp(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [photo, setPhoto] = useState<any>();
  const [gender, setGender] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { error, handleError, handleRegister, register } = useAuth();

  const signUp = useCallback(
    async ({ name, email, password, birthDate, photo, gender }: User) => {
      try {
        if (
          name.trim() &&
          email.trim() &&
          password.trim() &&
          gender &&
          photo &&
          birthDate
        ) {
          if (validateEmail(email)) {
            const user = { name, email, password, birthDate, photo, gender };
            const response = await handleRegister(user);
            if (register.fulfilled.match(response)) {
              navigate("/signIn");
            }
          } else {
            handleError("Invalid email format");
          }
        } else {
          handleError("All fields must be filled");
        }
      } catch (e) {
        handleError(String(e));
      }
    },
    []
  );

  const handleFile = (e: any) => {
    const file = e.currentTarget.files[0];
    setPhoto(file);
  };

  useEffect(() => {
    if (isSubmit) {
      signUp({ name, email, password, birthDate, photo, gender });
      setIsSubmit(false);
    }
  }, [setIsSubmit, isSubmit]);

  return (
    <div className={cn(styles.Wrapper, styles[`Wrapper--${theme}`])}>
      <Header />
      <div className={styles.WrapperAlertForm}>
        {error && <UserAlert error={error} onHandleError={handleError} />}
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
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Text className="text-muted" />
          </Form.Group>

          <Form.Group
            style={{ color: "grey" }}
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            style={{ color: "grey" }}
            className="mb-3"
            controlId="formBasicBirthDay"
          >
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              name="birthDate"
              placeholder="Birthday"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </Form.Group>

          <div key={"default-checkbox"} className="mb-3">
            <Form.Check
              type={"checkbox"}
              id={`default-checkbox`}
              label={"Male"}
              value={"Male"}
              name="gender"
              onChange={(e) => setGender(!gender ? e.target.value : "")}
              disabled={gender === "Female" ? true : false}
            />

            <Form.Check
              type={"checkbox"}
              label={"Female"}
              value={"Female"}
              name="gender"
              id={`disabled-default-checkbox`}
              onChange={(e) => setGender(!gender ? e.target.value : "")}
              disabled={gender === "Male" ? true : false}
            />
          </div>

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
                Register <MdOutlineChevronRight />
              </div>
            }
            onClick={() => setIsSubmit(true)}
          />
        </Form>
      </div>
    </div>
  );
}

export default React.memo(SignUp);

import React, { useContext } from "react";
import styles from "./MainPage.module.scss";
import cn from "classnames";
import { ThemeContext } from "../../App/ThemeContext";
import { SignIn } from "../../components/SignIn";

function MainPage(): JSX.Element {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={cn(styles.Wrapper, styles[`Wrapper--${theme}`])}>
      <SignIn />
    </div>
  );
}

export default React.memo(MainPage);

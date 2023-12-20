import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "./UserCard.module.scss";
import { getAge } from "../../utils/getAge";

export const UserCard = ({ user: { photo, name, birthDate } }: any) => {
  return (
    <div className={styles.Wrapper}>
      <Card style={{ width: "18rem" }}>
        <div>
          <Card.Img variant="top" src={`/files/${photo}`} />
        </div>
        <Card.Body>
          <Card.Title className={styles.cardTitle}>{name}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className={styles.cardField}>
            Age: {getAge(birthDate)}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

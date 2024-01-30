import { Modal } from "react-bootstrap";
import Login from "../pages/Login";

function MyModel(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Login modelvalue={props.modelvalue} />
        </Modal>
    );
}
export default MyModel;
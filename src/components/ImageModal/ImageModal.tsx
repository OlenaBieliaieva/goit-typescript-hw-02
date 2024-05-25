import css from "./ImageModal.module.css";
import Modal from "react-modal";
// import { Image } from "../../types";

Modal.setAppElement("#root");

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//   },
// };

interface ImageModalProps {
  // image: Image | null;
  url: string;
  alt: string;
  modalIsOpen: boolean;
  closeModal: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  modalIsOpen,
  closeModal,
  url,
  alt,
}) => {
  return (
    <div className={css.modal}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "grey",
            zIndex: 999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            border: "none",
            background: "none",
            overflow: "visible",
          },
        }}
      >
        <img src={url} alt={alt} className={css.modalImg} />
      </Modal>
    </div>
  );
};

export default ImageModal;

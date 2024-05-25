import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ modalIsOpen, closeModal, url, alt }) => {
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

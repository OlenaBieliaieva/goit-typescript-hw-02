import css from "./ImageCard.module.css";

const ImageCard = ({ image, openModal }) => {
  return (
    <div className={css.imageWrap}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={css.image}
        onClick={() => openModal(image.urls.regular, image.alt_description)}
      />
    </div>
  );
};

export default ImageCard;

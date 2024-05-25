import css from "./ImageCard.module.css";
import { Image } from "../../types";

interface ImageCardProps {
  image: Image;
  openModal: (obj: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
  return (
    <div className={css.imageWrap}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={css.image}
        onClick={() => openModal(image)}
      />
    </div>
  );
};

export default ImageCard;

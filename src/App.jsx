import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { getPhotos } from "./services/api";

import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const { results, total_pages } = await getPhotos(query, page);
        if (!results.length) {
          setIsEmpty(true);
          return;
        }
        setImages((prevImages) => [...prevImages, ...results]);
        setVisible(page < total_pages);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, query]);

  const onHandleSubmit = (value) => {
    setQuery(value);
    setIsEmpty(false);
    setImages([]);
    setPage(1);
  };

  const onClick = () => setPage((prevPage) => prevPage + 1);

  const openModal = (url, alt) => {
    setShowModal(true);
    setUrl(url);
    setAlt(alt);
  };

  const closeModal = () => {
    setShowModal(false);
    setUrl("");
    setAlt("");
  };

  return (
    <div>
      <SearchBar onSubmit={onHandleSubmit} />
      {isEmpty && <p>Try to find something else</p>}
      <Toaster />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      <ImageModal
        modalIsOpen={showModal}
        closeModal={closeModal}
        url={url}
        alt={alt}
      />
      {isVisible && <LoadMoreBtn onClick={onClick} />}
      {loading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
};

export default App;

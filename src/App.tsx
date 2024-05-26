import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { getPhotos } from "./services/api";
import { Image } from "./types";

import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isVisible, setVisible] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [alt, setAlt] = useState<string>("");

  interface Interface {
    total_pages: number;
    results: Image[];
  }

  useEffect(() => {
    if (!query) return;
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      setError(false);
      try {
        const { results, total_pages }: Interface = await getPhotos(
          query,
          page
        );
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

  const onHandleSubmit = (value: string): void => {
    setQuery(value);
    setIsEmpty(false);
    setImages([]);
    setPage(1);
    setError(false);
  };

  const onClick = (): void => setPage((prevPage) => prevPage + 1);

  const openModal = (obj: Image): void => {
    setShowModal(true);
    setUrl(obj.urls.regular);
    setAlt(obj.alt_description);
  };

  const closeModal = (): void => {
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
    </div>
  );
};

export default App;

/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useState } from "react";
import image1 from "./assets/image-1.jpg";
import image2 from "./assets/image-2.jpg";
import image3 from "./assets/image-3.jpg";
import image4 from "./assets/image-4.jpg";
import image5 from "./assets/image-5.jpg";
import image6 from "./assets/image-6.jpg";
import image7 from "./assets/image-7.jpg";
import image8 from "./assets/image-8.jpg";
import image9 from "./assets/image-9.jpg";
import image10 from "./assets/image-10.jpg";
import image11 from "./assets/image-11.jpg";
import styles from './styles/App.module.css'
import { LiaImageSolid } from 'react-icons/lia';
import DraggableImage from "./components/DraggableImage";

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isFileInputVisible, setFileInputVisible] = useState(false);
  const [deletingIndices, setDeletingIndices] = useState([]);
  const [images, setImages] = useState([
    { src: image1, alt: "Image 1" },
    { src: image2, alt: "Image 2" },
    { src: image3, alt: "Image 3" },
    { src: image4, alt: "Image 4" },
    { src: image5, alt: "Image 5" },
    { src: image6, alt: "Image 6" },
    { src: image7, alt: "Image 7" },
    { src: image8, alt: "Image 8" },
    { src: image9, alt: "Image 9" },
    { src: image10, alt: "Image 10" },
    { src: image11, alt: "Image 11" },
  ]);

  const handleFileSelect = (index) => {
    const newSelectedFiles = [...selectedFiles];
    if (newSelectedFiles.includes(index)) {
      const idx = newSelectedFiles.indexOf(index);
      newSelectedFiles.splice(idx, 1);
    } else {
      newSelectedFiles.push(index);
    }
    setSelectedFiles(newSelectedFiles);
  };

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const [movedItem] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedItem);

    const updatedSelectedFiles = selectedFiles.map((idx) =>
      idx === fromIndex
        ? toIndex
        : idx > fromIndex && idx <= toIndex
        ? idx - 1
        : idx < fromIndex && idx >= toIndex
        ? idx + 1
        : idx
    );

    setImages(updatedImages);
    setSelectedFiles(updatedSelectedFiles);
  };

  const handleDeleteSelected = () => {
    setDeletingIndices(selectedFiles);

    setTimeout(() => {
      const updatedImages = images.filter(
        (_, index) => !selectedFiles.includes(index)
      );
      setImages(updatedImages);
      setSelectedFiles([]);
      setDeletingIndices([]); 
    }, 300); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => [
          ...prev,
          { src: event.target.result, alt: "New Image" },
        ]);
      };
      reader.readAsDataURL(file);
    }
    setFileInputVisible(false);
  };
  return (
    <div className={styles.container}>
       {/* Header */}
      <div className={styles.header}>
        <span>
          {selectedFiles.length === 0 ? (
            <span className={`${styles.bold} ${styles.fontSize20}`}>Gallery</span>
          ) : (
            <div className={styles.flexSpaceBetween}>
              <span className={styles.bold}>
                <input type="checkbox" checked /> {selectedFiles.length + " files Selected"}
              </span>
              <span className={`${styles.colorRed} ${styles.cursorPointer}`} onClick={handleDeleteSelected}>
                Delete files
              </span>
            </div>
          )}
        </span>
      </div>
      
      {/* Image Grid */}
      <div className={styles.imageGrid}>
        {/* Displaying Feature Image */}
        {images[0] ? (
          <div className={styles.mainImageContainer}>
            <DraggableImage
              key={0}
              img={images[0]}
              index={0}
              moveImage={moveImage}
              handleFileSelect={handleFileSelect}
              isSelected={selectedFiles.includes(0)}
              deletingIndices={deletingIndices}
            />
          </div>
        ) : (
          <div className={styles.mainImageContainer}>
            No images available.
          </div>
        )}


        {/* Mapping through rest of the images  */}
        {images.slice(1).map((img, index) => (
          <div className={styles.imageContainer}>
            <DraggableImage
              key={index + 1}
              img={img}
              index={index + 1}
              moveImage={moveImage}
              handleFileSelect={handleFileSelect}
              isSelected={selectedFiles.includes(index + 1)}
              deletingIndices={deletingIndices}
            />
          </div>
        ))}

         {/* File input for adding new images */}
        {isFileInputVisible && (
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            ref={(input) => input && input.click()}
          />
        )}
        
        {/* Add Image Button */}
        <div className={styles.addImageContainer} onClick={() => setFileInputVisible(true)}>
          <div className={styles.addImageInner}>
            <LiaImageSolid /> Add Images
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

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
import { useDrag, useDrop } from "react-dnd";

function DraggableImage({
  img,
  index,
  moveImage,
  handleFileSelect,
  isSelected,
  deletingIndices,
}) {
  const [, ref] = useDrag({
    type: "IMAGE",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover(item) {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });
  const [hover, setHover] = useState(false);

  return (
    <div
      ref={(node) => ref(drop(node))}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        opacity: deletingIndices && deletingIndices.includes(index) ? 0 : 1,
        transition: "opacity 300ms ease-in-out filter 0.3s",
        filter: hover ? "brightness(0.7)" : "none",
      }}
    >
      <img
        src={img.src}
        alt={img.alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          cursor: "pointer",
          opacity: isSelected ? 0.7 : 1,
          transition: "filter 0.3s",
          
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => handleFileSelect(index)}
      />
      {isSelected && (
        <div
          style={{
            position: "absolute",
            top: "5px",
            left: "5px",
            background: "rgba(255, 255, 255, 0.5)",
            padding: "2px",
            borderRadius: "50%",
          }}
        >
          ✔️
        </div>
      )}
    </div>
  );
}

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

    // Update selected files
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
    // Mark the selected images as being in the process of deletion
    setDeletingIndices(selectedFiles);

    // Wait for the transition duration, then remove the images
    setTimeout(() => {
      const updatedImages = images.filter(
        (_, index) => !selectedFiles.includes(index)
      );
      setImages(updatedImages);
      setSelectedFiles([]);
      setDeletingIndices([]); // Clear the deleting indices
    }, 300); // Assuming 300ms is your transition duration. Adjust as needed.
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      <div
        style={{
          borderTop: "1px solid lightgray",
          borderBottom: "1px solid lightgray",
          width: "57.5rem",
          marginBottom: "10px",
          padding: "10px 0 10px 0",
        }}
      >
        <span>
          {selectedFiles.length === 0 ? (
           <span style={{fontWeight:"bold" , fontSize:"20px"}}>Gallery</span>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize:"20px"
              }}
            >
              <span style={{fontWeight:"bold"}}>{selectedFiles.length + " files Selected"}</span>
              <span
                style={{ color: "red", cursor: "pointer" }}
                onClick={handleDeleteSelected}
              >
                Delete files
              </span>
            </div>
          )}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "40px",
          maxWidth: "1000px",
          gridAutoRows: "150px",
        }}
      >
        {/* Conditional rendering for first image or message if no images */}
        {images[0] ? (
          <div
            style={{
              gridArea: "1 / 1 / 3 / 3",
              borderRadius: "10px",
              overflow: "hidden",
              width: "100%",
              height: "100%",
              border: "1px solid lightgray",
            }}
          >
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
          <div
            style={{
              gridArea: "1 / 1 / 3 / 3",
              borderRadius: "10px",
              overflow: "hidden",
              width: "100%",
              height: "100%",
            }}
          >
            No images available.
          </div>
        )}

        {/* Map remaining images */}
        {images.slice(1).map((img, index) => (
          <div style={{ borderRadius: "10px", overflow: "hidden" ,border: "1px solid lightgray",}}>
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
        {/* Always display Add Image */}
        {isFileInputVisible && (
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            ref={(input) => input && input.click()}
          />
        )}
        <div
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setFileInputVisible(true)}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#e0e0e0",
              cursor: "pointer",
            }}
          >
            + Add Image
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       flexDirection: "column",
  //       justifyContent: "center",
  //       alignItems: "center",
  //     }}
  //   >
  //     <div>
  //       <span>{selectedFiles.length} Files Selected</span>
  //       <button onClick={handleDeleteSelected}>Delete files</button>
  //     </div>

  //     <div
  //       style={{
  //         display: "grid",
  //         gridTemplateColumns: "repeat(5, 1fr)",
  //         gap: "40px",
  //         maxWidth: "1000px",
  //         gridAutoRows: "150px", // Set the default height for the grid rows
  //       }}
  //     >
  //       <div
  //         style={{
  //           gridArea: "1 / 1 / 3 / 3",
  //           borderRadius: "10px",
  //           overflow: "hidden",
  //           width: "100%",
  //           height: "100%",
  //         }}
  //       >
  //         <DraggableImage
  //           key={0}
  //           img={images[0]}
  //           index={0}
  //           moveImage={moveImage}
  //           handleFileSelect={handleFileSelect}
  //           isSelected={selectedFiles.includes(0)}
  //         />
  //       </div>
  //       {images.slice(1).map((img, index) => (
  //         <div style={{ borderRadius: "10px", overflow: "hidden" }}>
  //           <DraggableImage
  //             key={index + 1}
  //             img={img}
  //             index={index + 1}
  //             moveImage={moveImage}
  //             handleFileSelect={handleFileSelect}
  //             isSelected={selectedFiles.includes(index + 1)}
  //             deletingIndices={deletingIndices}
  //           />
  //         </div>
  //       ))}
  //       {isFileInputVisible && (
  //         <input
  //           type="file"
  //           onChange={handleFileChange}
  //           style={{ display: "none" }}
  //           ref={(input) => input && input.click()}
  //         />
  //       )}

  //       <div
  //         style={{
  //           borderRadius: "10px",
  //           overflow: "hidden",
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //         onClick={() => setFileInputVisible(true)}
  //       >
  //         <div
  //           style={{
  //             width: "100%",
  //             height: "100%",
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "center",
  //             background: "#e0e0e0",
  //             cursor: "pointer",
  //           }}
  //         >
  //           + Add Image
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default App;

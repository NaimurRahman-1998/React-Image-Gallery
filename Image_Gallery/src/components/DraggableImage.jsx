/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import { useState } from "react";
import { useDrag, useDrop } from "react-dnd"; // Importing drag and drop hooks from react-dnd
import styles from '../styles/App.module.css'

const DraggableImage = ({ img, index, moveImage, handleFileSelect, isSelected, deletingIndices }) =>  {
  
    const [hover, setHover] = useState(false);

    const [postDrag, setPostDrag] = useState(false);
  
    // Configuring drag properties
    const [, ref] = useDrag({
      type: "IMAGE", 
      item: { index }, 
    });
  
    // Configuring drop properties
    const [, drop] = useDrop({
      accept: "IMAGE", 
      hover(item) { // Function that will be called when an item is hovered over the drop target
        if (item.index !== index) {
          moveImage(item.index, index); // Rearrange image
          item.index = index; // Update index of the item being dragged
          setPostDrag(true); // Flag to show that an item was dragged
          setTimeout(() => setPostDrag(false), 300); // Reset flag after 300 milliseconds
        }
      },
    });

    return (
      <div
        ref={(node) => ref(drop(node))} // Assign both drag and drop refs
        className={`
        ${styles.draggableContainer} 
        ${deletingIndices && deletingIndices.includes(index) ? styles.deleting : ''}
        ${hover ? styles.hoverEffect : ''}
        ${postDrag ? styles.postDragEffect : ''}
          `}
      >
        {/* Image element */}
        <img
          src={img.src} alt={img.alt}
          className={`${styles.image} ${isSelected ? styles.imageSelected : ''}`}
          onMouseEnter={() => setHover(true)} 
          onMouseLeave={() => setHover(false)} 
          onClick={() => handleFileSelect(index)} // Handler for file selection
        />
        
        {/* Checkbox for selection state */}
        {isSelected && (
          <div className={styles.selectionIndicator}>
            <input type="checkbox" checked />
          </div>
        )}
      </div>
    );
  }

export default DraggableImage;

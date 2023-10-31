/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from '../styles/App.module.css'
const DraggableImage = ({ img, index, moveImage, handleFileSelect, isSelected, deletingIndices }) =>  {
    const [hover, setHover] = useState(false);
    const [postDrag, setPostDrag] = useState(false);
  
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
          setPostDrag(true);
          setTimeout(() => setPostDrag(false), 300); 
        }
      },
  });
    
    return (
      <div
        ref={(node) => ref(drop(node))}
        className={`
        ${styles.draggableContainer} 
        ${deletingIndices && deletingIndices.includes(index) ? styles.deleting : ''}
        ${hover ? styles.hoverEffect : ''}
        ${postDrag ? styles.postDragEffect : ''}
          `}
      >
        <img
          src={img.src} alt={img.alt} className={`${styles.image} ${isSelected ? styles.imageSelected : ''}`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => handleFileSelect(index)}
        />
        {isSelected && (
          <div className={styles.selectionIndicator}>
            <input type="checkbox" checked />
          </div>
        )}
      </div>
    );
  }

export default DraggableImage;

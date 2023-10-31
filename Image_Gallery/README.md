# React Image Gallery Manager

## Description

This project is a simple yet powerful image gallery manager built using React. The application allows users to:
- View images in a grid layout.
- Drag and drop to rearrange images.
- Select multiple images.
- Delete selected images.
- Add new images from the file system.

## Technologies Used

- **React**: For building the UI components.
- **React-DnD**: For the drag-and-drop functionality.
- **CSS Modules**: For styling individual React components.

## Project Structure

```
src/
|-- assets/            # Store static images
|-- components/
|   |-- DraggableImage.js  # Component for individual draggable images
|-- styles/
|   |-- App.module.css     # Styles for the App component
|-- App.js            # Main Application file
|-- index.js          # Entry point for the React app
```

## Setup & Installation

1. Clone the repository
    ```
    git clone https://github.com/NaimurRahman-1998/React-Image-Gallery/
    ```

2. Navigate to project directory
    ```
    cd react-image-gallery-manager
    ```

3. Install dependencies
    ```
    npm install
    ```

4. Run the development server
    ```
    npm run dev
    ```

# Live Link : https://reactjs-gallery1998.netlify.app

## Usage

1. The gallery displays images in a grid layout.
2. Click on images to select them. Selected images will display a checkbox.
3. Click on the "Delete files" button to delete selected images.
4. Use drag-and-drop to rearrange images in the gallery.
5. Click on the "Add Images" button to add new images to the gallery.

## License


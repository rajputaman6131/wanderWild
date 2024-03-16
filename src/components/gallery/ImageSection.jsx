import React from "react";



const chunkArray = (arr, size) => {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
  }
  return chunkedArr;
};

const ImageSection = ({ images }) => {
  const chunkedImages = chunkArray(images, 3); // Change the number to the desired number of columns
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {chunkedImages.map((row, rowIndex) => (
        <div key={rowIndex} className="grid gap-4">
          {row.map((image, colIndex) => (
            <div key={rowIndex * 3 + colIndex}>
              <img
                className="h-auto max-w-full rounded-lg"
                src={image}
                alt={`Image ${rowIndex * 3 + colIndex + 1}`}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageSection;

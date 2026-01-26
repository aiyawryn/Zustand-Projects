import React, { useEffect } from "react";
import { useProducStore } from "../store/store";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Product {
  id: string;
  title: string;
  price: number;
  img: {
    black: string;
    [key: string]: string;
  };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  console.log(product);

  const { productStates, setProductImage, setProductHover, initializeProduct } =
    useProducStore();

  // Initial State
  const productState = productStates[product.id] || {};
  const currentImage = productState.currentImage || product.img.black;
  const hover = productState.hover || false;
  const images = Object.values(product.img);

  useEffect(() => {
    initializeProduct(product.id, product.img.black);
  }, [product.id, product.img.black, initializeProduct]);

  const handlePrev = () => {
    const currentIndex = images.indexOf(currentImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setProductImage(product.id, images[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = images.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setProductImage(product.id, images[nextIndex]);
  };

  return (
    <div
      onMouseEnter={() => setProductHover(product.id, true)}
      onMouseLeave={() => setProductHover(product.id, false)}
      className="relative w-[20rem] m-[1rem] border-[#ECECEC] ml-[3rem] p-4"
    >
      <div className="relative bg-gray-200 p-4">
        <img
          src={currentImage}
          alt={product.title}
          className="object-cover w-[12rem] h-[12rem] rounded-md ml-[1rem]"
        />

        {hover && (
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button className="carousel-button text-white">
              <FaChevronLeft
                onClick={handlePrev}
                className="bg-gray-300 rounded-full"
              />
            </button>
            <button className="carousel-button text-white">
              <FaChevronRight
                onClick={handleNext}
                className="bg-gray-300 rounded-full"
              />
            </button>
          </div>
        )}
      </div>

      <div className="mt-[1rem]">
        <h2>{product.title}</h2>
        <p>${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;

import styled from "styled-components";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import convertPrice from "@/utils/convertPrice";
import FlyingButton from "./FlyingButton";
import HeartOutlineIcon from "./icons/HeartOutlineIcon";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import axios from "axios";

const ProductWrapper = styled.div`
  width: 270px;
  background-color: #fff;
  padding-bottom: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 0px;
  height: 250px;
  width: 270px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    width: 270px;
    height: 250px;
  }
`;

const Title = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0 20px;
  color: #fb7185;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;

export default function ProductBox({
  _id,
  title,
  description,
  price,
  images,
  discount,
  wished = false,
  onRemoveFromWishlist = () => {},
}) {
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;
  const [isWished, setIsWished] = useState(wished);
  function addToWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    const nextValue = !isWished;
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }
    axios
      .post("/api/wishlist", {
        product: _id,
      })
      .then(() => {});
    setIsWished(nextValue);
  }
  return (
    <div className="bg-white h-full w-full shadow-md rounded-md overflow-hidden hover:shadow-lg hover:cursor-pointer transform hover:-translate-y-0.5 transition-transform ease-in-out duration-200">
      <Link href={url} className="w-full h-full p-0 relative">
        <div>
          <button
            className={
              isWished
                ? "absolute top-2 right-2 w-10 h-10 p-[10px] bg-white cursor-pointer rounded-full text-red-600"
                : "absolute top-2 right-2 w-10 h-10 p-[10px] bg-white cursor-pointer rounded-full text-black"
            }
            onClick={addToWishlist}
          >
            {isWished ? (
              <HeartSolidIcon className="w-full h-full" />
            ) : (
              <HeartOutlineIcon className="w-full h-full" />
            )}
          </button>
          <img
            src={images?.[0]}
            alt=""
            className="w-full h-[250px] rounded-lg"
          />
        </div>
      </Link>
      <div className="px-5 my-3 text-base flex flex-col">
        <Link href={url} className="h-12 text-main-bg">
          {title}
        </Link>
        <div className="flex justify-between">
          <Link href={url}>
            <div className="text-xl font-bold text-main-bg">
              {convertPrice((price * (100 - discount)) / 100)} đ
            </div>
          </Link>
          <FlyingButton
            white={1}
            _id={_id}
            src={images?.[0]}
            className=" bg-white hover:ring-main-bg hover:ring-offset-0 hover:bg-main-bg hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 22 22"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </FlyingButton>
        </div>
        <Link href={url}>
          <div className="flex gap-3 mt-1">
            <div className="text-sm text-gray-400 line-through">
              {convertPrice(price)} đ
            </div>
            <div className="text-sm flex items-center justify-center font-semibold rounded-md px-1 bg-rose-50 text-main-bg">
              - {discount}%
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

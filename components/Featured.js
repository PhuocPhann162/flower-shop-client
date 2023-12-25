import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import Link from "next/link";
import trimmedText from "@/utils/trimText";
import { RevealWrapper } from "next-reveal";
import FlyingButton from "./FlyingButton";

const Bg = styled.div`
  background-color: #f472b6;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }

    img {
      max-width: 100%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeatureToCart() {
    addProduct(product._id);
  }
  return (
    <Center>
      <div className="bg-feature-bg bg-cover bg-no-repeat rounded-md mt-[50px] py-5">
        <div className="grid grid-cols-3 p-5">
          <div className="flex items-center justify-around col-span-2 mx-11">
            <div>
              <RevealWrapper origin={"left"} delay={0}>
                <div className="font-bold font-roboto-slab text-5xl py-5 text-main-bg">
                  {product?.title}
                </div>
                <div
                  className="mb-5 pl-1 pr-10"
                  dangerouslySetInnerHTML={{
                    __html: trimmedText(
                      product?.description.replace(/\n/g, "<br />")
                    ),
                  }}
                >
                  {}
                </div>
                <div className="flex gap-2">
                  <Link
                    href={"/product/" + product?._id}
                    className="btn-primary px-4 flex items-center bg-main-bg hover:bg-red-900 hover:ring-1 hover:ring-offset-0 hover:ring-main-bg"
                  >
                    Read more
                  </Link>
                  <FlyingButton
                    white={1}
                    _id={product._id}
                    src={product.images?.[0]}
                    className="flex items-center gap-1 border-2 border-main-bg rounded-md text-main-bg px-4 py-1  bg-white hover:ring-main-bg hover:ring-1 hover:ring-offset-0 hover:bg-slate-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
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
                    Add to cart
                  </FlyingButton>
                </div>
              </RevealWrapper>
            </div>
          </div>
          <div className="col-span-1" mx-1>
            <RevealWrapper delay={0}>
              <div className="flex items-center justify-center">
                <img
                  src={product.images?.[0]}
                  alt=""
                  className="h-[400px] rounded-lg"
                />
              </div>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </Center>
  );
}

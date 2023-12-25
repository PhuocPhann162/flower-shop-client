import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import FlyingButton from "@/components/FlyingButton";
import Header from "@/components/Header";
import Meta from "@/components/Meta";
import ProductImages from "@/components/ProductImages";
import ProductReviews from "@/components/ProductReviews";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import convertPrice from "@/utils/convertPrice";
import { RevealWrapper } from "next-reveal";
import { useContext } from "react";
import styled from "styled-components";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  return (
    <>
      <Meta title={product.title} />
      <Header />
      <Center>
        <RevealWrapper delay={0}>
          <div className="grid grid-cols-3 m-10 box shadow-md border rounded-lg p-10">
            <div className="col-span-1">
              <ProductImages images={product.images} />
            </div>
            <div className="col-span-2 flex flex-col gap-4">
              <div className="font-semibold text-2xl text-main-bg">
                {product.title}
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: product?.description.replace(/\n/g, "<br />"),
                }}
              ></p>
              <div className="flex items-center gap-7">
                <div className="text-2xl font-bold text-main-bg">
                  {convertPrice(
                    (product.price * (100 - product.discount)) / 100
                  )}{" "}
                  đ
                </div>
                <div className="text-base text-gray-400 line-through">
                  {convertPrice(product.price)} đ
                </div>
                <div className="text-sm flex items-center justify-center text-main-bg font-semibold rounded-md px-1 bg-rose-50">
                  -{product.discount}%
                </div>
              </div>
              <div>
                <FlyingButton
                  white={1}
                  _id={product._id}
                  src={product.images?.[0]}
                  className="flex items-center gap-1 border-2 border-main-bg rounded-md text-main-bg px-4 py-1  bg-white hover:ring-main-bg hover:ring-offset-0 hover:bg-main-bg hover:text-white"
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
            </div>
          </div>
        </RevealWrapper>

        <div className="m-10">
          <ProductReviews product={product} />
        </div>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

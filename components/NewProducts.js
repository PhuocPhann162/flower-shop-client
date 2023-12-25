import styled from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;

export default function NewProducts({ products, wishedProducts }) {
  return (
    <Center>
      <div
        className="font-semibold text-2xl py-2 my-2 "
        style={{ color: "#5D3D2E" }}
      >
        New Products
      </div>
      <ProductsGrid products={products} wishedProducts={wishedProducts} />
    </Center>
  );
}

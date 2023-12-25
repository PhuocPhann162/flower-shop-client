import { useState } from "react";
import styled from "styled-components";
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;
const ImageButton = styled.div`
  border: 2px solid #ccc;
  ${(props) =>
    props.active
      ? `border-color: #ccc;`
      : `border-color: transparent; opacity: .7;`}
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <BigImageWrapper>
        <img
          src={activeImage}
          className="w-[330px] h-[320px] rounded-md overflow-hidden"
        />
        <div className="flex gap-2 mt-2">
          {images.map((image) => (
            <div
              key={image}
              active={image === activeImage}
              onClick={() => setActiveImage(image)}
              className="rounded-md cursor-pointer border-2 overflow-hidden"
            >
              <img src={image} alt="" className="w-[45px] h-[45px] " />
            </div>
          ))}
        </div>
      </BigImageWrapper>
    </>
  );
}

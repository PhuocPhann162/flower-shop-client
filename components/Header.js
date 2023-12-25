import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import Search from "./icons/Search";

// #E1CFBB
// #5D3D2E
//#f472b6
const StyledHeader = styled.header`
  background-color: #f472b6;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  font-size: 20px;
`;

const StyledNav = styled.nav`
  ${(props) => (props.mobileNavActive ? `display: block;` : `display: none;`)}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  color: #f9fafb;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SideIcons = styled.div`
  display: flex;
  align-items: center;
  a {
    display: inline-block;
    min-width: 20px;
    color: #5d3d2e;
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export default function Header() {
  const inactiveLink = "text-main-bg  hover:text-red-700";
  const activeLink = "text-white hover:text-gray-50";
  const { cartProducts } = useContext(CartContext);

  const router = useRouter();
  const { pathname } = router;
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const { linkColor, setLinkColor } = useState();

  const checkIsActive = (path) => {
    return path === pathname;
  };

  console.log(pathname);

  return (
    <div className="bg-second-bg">
      <Center>
        <Wrapper>
          <div className="flex items-center ml-2">
            <Link
              href={"/"}
              className="flex w-max items-center gap-2 font-semibold font-roboto-slab text-3xl text-main-bg"
            >
              <div className="flex items-center justify-center">
                <img
                  src="https://manh-nextjs-ecommerce.s3.amazonaws.com/1703413923368.png"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              Flower Shop
            </Link>
          </div>
          <div className="flex items-center justify-center w-10/12">
            <div className="flex gap-5">
              <Link
                href={"/"}
                className={checkIsActive("/") ? activeLink : inactiveLink}
              >
                Home
              </Link>
              <Link
                href={"/products"}
                className={
                  checkIsActive("/products") ? activeLink : inactiveLink
                }
              >
                All flowers
              </Link>
              <Link
                href={"/categories"}
                className={
                  checkIsActive("/categories") ? activeLink : inactiveLink
                }
              >
                Categories
              </Link>
              <Link
                href={"/account"}
                className={
                  checkIsActive("/account") ? activeLink : inactiveLink
                }
              >
                Account
              </Link>
              <Link
                href={"/cart"}
                className={checkIsActive("/cart") ? activeLink : inactiveLink}
              >
                Cart ({cartProducts.length})
              </Link>
            </div>
          </div>
          <SideIcons>
            <Link href={"/search"}>
              <Search />
            </Link>
          </SideIcons>
        </Wrapper>
      </Center>
    </div>
  );
}

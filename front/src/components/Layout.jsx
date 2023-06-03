import Link from "next/link";
import { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { getAll, getCart } from "@/slices/cartSlice";

const Layout = ({ children }) => {
  const [menu, setMenu] = useState(false);
  const navLinks = [
    {
      name: "home",
      to: "/",
    },
    {
      name: "all products",
      to: "/products",
    },

    {
      name: "categories",
      to: "/categories",
    },
    {
      name: "account",
      to: "account",
    },
    {
      name: "cart",
      to: "cart",
    },
  ];

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const isScrolling = () => {
      setScroll(window.scrollY > 30);
    };

    window.addEventListener("scroll", isScrolling);

    return () => {
      window.removeEventListener("scroll", isScrolling);
    };
  }, []);

  const {cart,loading} = useSelector(getCart);
  const dispatch = useDispatch()
useEffect(()=>{
    dispatch(getAll())
},[])


if(loading) return 'loading..'

  return (
    <div>
      <header
        className={` ${
          scroll ? "bg-white" : "bg-zinc-800"
        } duration-300  sticky top-0 ${
          scroll && "shadow-sm"
        } shadow-zinc-800 relative`}
      >
        <div
          className={`flex justify-between max-w-[1100px] mx-auto p-6 px-5 ${
            scroll ? "text-zinc-700" : "text-white"
          }`}
        >
          <div className={`font-bold capitalize `}>
            <Link href={"/"}>ecommerce</Link>
          </div>

          <nav className="md:flex items-center hidden   gap-8 capitalize  font-semibold text-sm">
            {navLinks.map((el, i) => (
              <Link key={i} href={el.to}>
                {el.name} {el.name === "cart" && `(${cart.length})`}
              </Link>
            ))}
          </nav>
          {menu && (
            <div
              className={`flex flex-col absolute top-[100%] text-center p-2 right-0 w-full capitalize rounded-b-lg ${
                scroll ? " bg-zinc-800 text-white" : " bg-white text-zinc-800"
              }`}
            >
              {" "}
              {navLinks.map((el, i) => (
                <Link
                  className={`p-4 ${
                    scroll ? "hover:bg-zinc-600" : "hover:bg-zinc-200"
                  } rounded-lg duration-300`}
                  key={i}
                  href={el.to}
                >
                  {el.name} {el.name === "cart" && `(${cart.length})`}
                </Link>
              ))}{" "}
            </div>
          )}
          <span
            onClick={() => setMenu((prev) => !prev)}
            className={`md:hidden w-8 h-8 flex items-center ${
              scroll
                ? "text-zinc-800 border-zinc-800"
                : "border-white text-white"
            } justify-center border  rounded-md p-1 cursor-pointer`}
          >
            <Bars3Icon className="h-6" />
          </span>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default Layout;

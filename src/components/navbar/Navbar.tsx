/** @format */

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import logo from "../../assets/logo/logo.png"
import { Link, useLocation } from "react-router-dom"
import { pageButtons } from "../../data/PageButtons"
import githubIcon from "../../assets/icons/github.png"
import { setPath } from "./navbarSlice"

const Navbar = () => {
  const { pathArray } = useAppSelector(store => store.navbar)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [subMenuVis, setSubMenuVis] = useState(false)
  const dispatch = useAppDispatch()
  const location = useLocation()

  const updateWindowWidth = () => {
    setWindowWidth(() => window.innerWidth)
  }
  useEffect(() => {
    dispatch(setPath(location.pathname))
    window.addEventListener("resize", updateWindowWidth)

    return () => window.removeEventListener("resize", updateWindowWidth)
  }, [location])

  return (
    <div className="z-40 h-fit bg-primary sm:h-16">
      <nav className="mx-auto h-fit max-w-4xl items-center justify-between align-bottom sm:flex sm:h-16 sm:px-4">
        {/* home */}
        <div className="mx-auto w-fit py-2 pl-8 sm:mx-0 sm:p-0">
          <Link to="/">
            <img
              className="h-12 cursor-pointer duration-200 active:brightness-75  "
              src={logo}
              alt="logo"
            />
          </Link>
        </div>
        {/* home */}

        <ul className=" bg-slate-700 py-2 text-center sm:flex sm:bg-transparent sm:py-0 sm:text-start">
          {pageButtons.map((category, i) => (
            <li
              key={i}
              className={` ${
                pathArray[0] === category.catPath &&
                "   mx-4 !bg-slate-500 sm:mx-0 sm:!bg-secondary  "
              }  group shrink-0 cursor-pointer select-none whitespace-nowrap rounded-2xl  px-4 py-1 font-cursiveCustom text-xl  font-bold duration-200  sm:hover:bg-[rgba(255,114,94,0.8)] `}
            >
              {windowWidth < 540 ? (
                <div onClick={() => setSubMenuVis(true)}> {category.catName}</div>
              ) : (
                <Link to={category.catPath}>
                  <div> {category.catName}</div>
                </Link>
              )}

              {/* dropdown menu */}
              <ul
                className={`${
                  pathArray[0] === category.catPath ? "  block  sm:hidden" : "hidden"
                } static    translate-x-[0]  translate-y-[2px] rounded-lg  border-0  bg-none from-[#151f36]  to-slate-900 px-4 py-2 duration-200  sm:absolute sm:translate-x-[-30px] sm:border-2 sm:bg-gradient-to-r sm:group-hover:block`}
              >
                {category.catCon.map((btn, index) => (
                  <li
                    key={index}
                    className={`${
                      pathArray[1] === btn.path && "   !bg-secondary  "
                    } shrink-0 cursor-pointer select-none rounded-2xl   py-1 px-4 font-cursiveCustom text-base  font-bold duration-300 active:brightness-75 sm:text-lg sm:hover:bg-[rgba(255,114,94,0.8)] `}
                  >
                    <Link className="p-1" to={category.catPath + "/" + btn.path}>
                      {btn.name}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* dropdown menu */}
            </li>
          ))}
          {/* github link */}
          <li
            className={` my-1 ml-4 hidden shrink-0  cursor-pointer select-none rounded-full border-2  border-transparent text-lg duration-300 active:brightness-75 sm:block sm:hover:border-white`}
          >
            <a href="https://github.com/Levan-D/CSSHomie" target="_blank">
              <img className="h-6" src={githubIcon} alt="" />
            </a>
          </li>
          {/* github link */}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar

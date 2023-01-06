/** @format */

import React from "react"
import { Link } from "react-router-dom"

type CardProps = { title: string; children: React.ReactNode; path?: string }

const Card = ({ title, children, path }: CardProps) => {
  return (
    <Link to={path ? path : "#"}>
      <div className="w-fit border-2 border-transparent hover:shadow-[0px_0px_37px_10px_rgba(_255,_114,_94,0.8)]  hover:border-secondary rounded-xl p-4 pl-7 bg-slate-200 cursor-pointer duration-300 hover:translate-y-[-10px] active:brightness-90">
        <h2 className="text-center mr-6 mb-2 font-cursiveCustom text-xl text-dark select-none">
          {title}
        </h2>
        {children}
      </div>
    </Link>
  )
}

export default Card

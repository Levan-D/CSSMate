/** @format */

import React from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import RgbToHex from "../../../../utils/RGBToHex"
import HexToRGB from "../../../../utils/HexToRGB"
import {
  setStopColor,
  setStopOpacity,
  setStopPercentage,
  deleteStop,
} from "../linearGradientSlice"
const StopsDisplay = () => {
  const dispatch = useAppDispatch()

  const { stops } = useAppSelector(store => store.linearGradient)
  const colorRegex = /^#([0-9a-f]{3}){1,2}$/i

  return (
    <div className="max-h-[350px] overflow-y-auto">
      {stops.map((stop, i) => (
        <div key={stop.id} className="menuBlock m-2   p-2">
          <div className="flex justify-between">
            <input
              type="color"
              id="colorpicker"
              value={RgbToHex(stop.stop.color)}
              onChange={e => {
                dispatch(
                  setStopColor({
                    index: i,
                    color: HexToRGB((e.target as HTMLInputElement).value),
                  })
                )
              }}
              style={{ backgroundColor: `rgb(${stop.stop.color})` }}
              className=" block h-10 w-10 cursor-pointer  rounded-md border-2 border-slate-400 "
            ></input>
            <input
              type="text"
              id="hexText"
              value={RgbToHex(stop.stop.color)}
              onChange={e => {
                dispatch(
                  setStopColor({
                    index: i,
                    color: HexToRGB((e.target as HTMLInputElement).value),
                  })
                )
              }}
              className=" block h-10 w-24   rounded-md border-2 border-slate-400  bg-darkJungle-600 text-center  text-white  "
            ></input>

            <input
              type="text"
              value={stop.stop.opacity / 100}
              step={0.01}
              onChange={e => {
                let value = Number(e.target.value) * 100
                if (value > 100) {
                  value = 100
                } else if (value < 0) {
                  value = 0
                }
                dispatch(
                  setStopOpacity({
                    index: i,
                    opacity: value,
                  })
                )
              }}
              className=" block h-10 w-10  rounded-md border-2 border-slate-400  bg-darkJungle-600 text-center  text-white  "
            />

            <input
              type="text"
              id="stopInput"
              value={stop.stop.percent}
              onChange={e => {
                let value = Number(e.target.value)
                if (value > 100) {
                  value = 100
                } else if (value < 0) {
                  value = 0
                }
                dispatch(
                  setStopPercentage({
                    index: i,
                    percent: value,
                  })
                )
              }}
              className=" block h-10 w-10  rounded-md border-2 border-slate-400  bg-darkJungle-600 text-center  text-white  "
            ></input>

            <div
              className=" my-1 h-8 w-8 cursor-pointer select-none rounded-full text-center text-4xl font-bold leading-6 text-slate-400 duration-200 sm:hover:bg-blue-300 sm:hover:text-white"
              onClick={() => dispatch(deleteStop(stop.id))}
            >
              &#215;
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StopsDisplay
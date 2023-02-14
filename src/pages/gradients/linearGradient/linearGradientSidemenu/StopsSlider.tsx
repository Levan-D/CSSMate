/** @format */

import React from "react"
import ReactSlider from "react-slider"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { setStopPercentage } from "../linearGradientSlice"
import RgbToHex from "../../../../utils/RGBToHex"
import ColorInverter from "../../../../utils/ColorInverter"

const StopsSlider = () => {
  const dispatch = useAppDispatch()
  const { stops } = useAppSelector(store => store.linearGradient)
  const stopArray = stops.map(stop => stop.stop.percent)

  return (
    <div className="menuBlock m-2 p-2 pt-10 pb-6">
      <ReactSlider
        className="customSlider"
        trackClassName="customSlider-track"
        thumbClassName="customSlider-thumb"
        min={0}
        max={100}
        snapDragDisabled
        minDistance={5}
        // pearling
        defaultValue={stopArray}
        renderThumb={(props, state) => (
          <div style={{ background: "black" }} {...props}>
            <div
              style={{
                backgroundColor: RgbToHex(stops[state.index].stop.color),
                color: ColorInverter(RgbToHex(stops[state.index].stop.color), "bw"),
                borderColor: ColorInverter(RgbToHex(stops[state.index].stop.color), "bw"),
              }}
              className="w-10 translate-y-[-30px] translate-x-[-10px] rounded-lg border-2 bg-slate-300 text-center"
            >
              {" "}
              {state.valueNow}
            </div>
          </div>
        )}
        onChange={(value, i) => {
          dispatch(
            setStopPercentage({
              index: i,
              percent: value[i],
            })
          )
        }}
        value={stopArray}
      />
    </div>
  )
}

export default StopsSlider
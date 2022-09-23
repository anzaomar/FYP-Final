import React from 'react'
import { useState} from "react";
export default function ImageIcon() {
  let [width, setWidth] = useState("100px")
  let [height, setHeight] = useState("150px")

  console.log(`${width},${height}`);
  return (
    <svg width={width} height={height} viewBox="0 0 42 42" className="markerIcon" aria-labelledby="beers-title beers-desc" role="img">
        <defs>
            <pattern id="grump_avatar" width="40" height="40" patternUnits="userSpaceOnUse">
                <image xlinkHref="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-128.png" width="40" height="40" x="0" y="0"></image>
            </pattern>
        </defs>
        <circle className="market-border" cx="21" cy="21" r="16" fill="#ffffff" role="presentation"></circle>
        <circle className="marker-image" cx="21" cy="21" r="16" fill={`url("#grump_avatar")`} stroke="#26a69a" strokeWidth="3"></circle>
        <circle className="marker-dot-1" cx="21" cy="43" r="3" fill="#26a69a" ></circle>
        <circle className="marker-dot-1" cx="21" cy="50" r="2" fill="#26a69a" ></circle>
    </svg>
  )
}

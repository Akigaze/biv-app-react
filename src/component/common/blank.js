import React from "react";

export const BlankColumn = ({width, enable=true}) => {
  if (enable) {
    return <div className="inline-block" style={{width}}/>
  }
  return null
};

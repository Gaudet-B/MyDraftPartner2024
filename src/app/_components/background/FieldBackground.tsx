"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_DIMENSIONS, Dimensions } from "./dimensions";
import { BgSvgBuilder, getFieldCoordinates } from "./SvgBuilder";
import * as d3 from "d3";
import { zoom } from "d3";

export default function FieldBackground() {
  const [dimensions, setDimensions] = useState(
    DEFAULT_DIMENSIONS as Dimensions,
  );

  // const [bgColor, setBgColor] = useState("#4F8918");
  // const [bgColor, setBgColor] = useState("none");

  const zoomToField = useCallback(
    (svg: d3.Selection<Element, unknown, null, undefined>) => {
      // console.log("zooming to field");
      const { width, height } = dimensions;
      // console.log("width", width);
      // console.log("height", height);

      // function transform([x, y, r]: [number, number, number]) {
      //   return `
      //   translate(${width / 2}, ${height / 2})
      //   scale(${height / r})
      //   translate(${-x}, ${-y})
      // `;
      // }

      // const zoom = d3
      //   .zoom()
      //   .scaleExtent([1, 8])
      //   .on("zoom", (event) => {
      //     svg.attr("transform", event.transform);
      //   });

      const zoomHandler = zoom()
        // .scaleExtent([1, 8])
        // .duration(500)
        .on("zoom", (event) => {
          svg.attr("transform", event.transform);
        });

      // console.log("zoom", zoom);
      console.log("zoom", zoomHandler);

      // svg.call(zoom);
      // svg.call(zoomHandler);

      svg
        .transition()
        // .duration(1000)
        .call(
          zoomHandler.transform,
          d3.zoomIdentity.scale(3).translate(0, 0),
          // d3.zoomIdentity.scale(1).translate(0, 0),
        );

      // function transform([x, y, r]: [number, number, number]) {
      //   return `
      //   translate(${x}, ${y})
      //   scale(${r})
      // `;
      // }

      // let currentTransform = [width / 2, 0, width] as [number, number, number];
      // const d = data[Math.floor(Math.random() * data.length)];
      // const d = [width / 2, height] as const;
      // const i = d3.interpolateZoom(currentTransform, [...d, 50]);
      // const i = d3.interpolateZoom([0, 0, 1], [200, 500, 4]);
      // const i = d3.interpolateZoom([0, 0, 1], [200, 500, 4]);
      // console.log(i.duration);

      // const transition = d3
      //   .transition()
      //   .delay(250)
      //   .duration(i.duration)
      //   // .attrTween("transform", () => () => `translate(200, 500) scale(4)`);
      //   .attrTween("transform", () => (t) => transform(i(t)));

      // return transition;
      // console.log("transition", transition);
      // console.log("svg", svg);

      /** @TODO why is this applying the result to the <html> instead of the <svg> ??? maybe use an ID instead of a ref??? */
      // const SVG = d3.selectAll("svg").select("svg"); //select("svg");
      // const SVG = d3.select("#MDP-field-image");
      // console.log("SVG", SVG);

      // svg.transition(transition);
      // SVG.transition(transition);
      // SVG.transition(
      //   d3
      //     .transition()
      //     // .
      //     .delay(250)
      //     .duration(i.duration)
      //     .attrTween("transform", () => (t) => transform(i(t))),
      // );
    },
    [dimensions],
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<Element>(null);

  function handleClick() {
    const svg = svgRef.current
      ? d3.select<Element, unknown>(svgRef.current)
      : null;
    console.log("svg", svg);
    if (svg) zoomToField(svg);
    // const zoom = zoomToField();
    // svg.transition(zoom);
  }

  useEffect(() => {
    const width =
      containerRef?.current?.getBoundingClientRect().width ?? dimensions.width;
    const height =
      containerRef?.current?.getBoundingClientRect().height ??
      dimensions.height;
    const coordinates = getFieldCoordinates(width, height);
    setDimensions({
      width: width,
      height: height,
      fieldCords: coordinates.fieldCords,
      fieldWidth: coordinates.fieldWidth,
      fieldHeight: coordinates.fieldHeight,
      sectionCords: coordinates.sectionCords,
      sectionHeight: coordinates.sectionHeight,
      hashSpacing: coordinates.hashSpacing,
    });

    const svg = svgRef.current ? d3.select(svgRef.current) : null;
    // console.log("svg", svg);
    if (svg) {
      setTimeout(() => zoomToField(svg), 1000);
      // setTimeout(() => setBgColor("#4F8918"), 2000);
    }
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full overflow-hidden">
      <button className={"m-4 p-2"} onClick={handleClick}>
        Click here to zoom!
      </button>
      {/** @TODO add dimensions... */}
      <BgSvgBuilder
        // bgColor={bgColor}
        svgRef={svgRef}
        // dimensions={dimensions}
      />
    </div>
  );
}

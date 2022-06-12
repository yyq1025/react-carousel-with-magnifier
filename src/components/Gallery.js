import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";

export default function Gallery(props) {
  const { imgArr, magification } = props;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const breakpoint = 992;

  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  // const imgArr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const [src, setSrc] = useState(imgArr[0]);

  useEffect(() => {
    const handleResizeWindow = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return (
    <div
      onMouseMove={(e) => {
        // update cursor position
        const top = e.currentTarget.offsetTop;
        const left = e.currentTarget.offsetLeft;
        const x = e.pageX - left;
        const y = e.pageY - top;
        setXY([x, y]);
      }}
      style={{
        position: "relative",
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "100px"
      }}
    >
      <Carousel
        emulateTouch={true}
        showArrows={windowWidth >= breakpoint}
        showThumbs={windowWidth >= breakpoint}
        showIndicators={windowWidth < breakpoint}
        showStatus={false}
        onChange={(e, newVal) => {
          setSrc(newVal.props.children.props.src);
        }}
      >
        {imgArr.map((item, index) => (
          <div
            key={index}
            onMouseEnter={(e) => {
              // update image size and turn-on magnifier
              const width = e.currentTarget.offsetWidth;
              const height = e.currentTarget.offsetHeight;
              setSize([width, height]);
              setShowMagnifier(true);
            }}
            onMouseLeave={() => {
              // close magnifier
              setShowMagnifier(false);
            }}
          >
            <img alt="" src={item} />
          </div>
        ))}
      </Carousel>
      <div
        style={{
          display: showMagnifier && windowWidth >= breakpoint ? "" : "none",
          position: "absolute",

          // prevent maginier blocks the mousemove event of img
          pointerEvents: "none",
          // set size of magnifier
          height: "100px",
          width: "100px",
          // move element center to cursor pos
          top: `${y - 100 / 2}px`,
          left: `${x - 100 / 2}px`,
          opacity: "1", // reduce opacity so you can verify position
          border: "2px solid white",
          borderRadius: "50%",
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",

          //calculate zoomed image size
          backgroundSize: `${imgWidth * magification}px ${
            imgHeight * magification
          }px`,

          //calculete position of zoomed image.
          backgroundPositionX: `${-x * magification + 100 / 2}px`,
          backgroundPositionY: `${-y * magification + 100 / 2}px`
        }}
      />
    </div>
  );
}

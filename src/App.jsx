import React, { useState ,useRef} from "react";
import Cockpit from "./components/Cockpit";
import TextOverlay from "./components/TextOverlay";
import Button from "./components/Button";
import BackgroundVideo from "./components/BackgroundVideo";
import BackgroundGalaxy from "./components/BackgroundGalaxy";
import { Howl } from "howler";

function App() {
  const [showUI, setShowUI] = useState(false);
  const [zoomed, setZoomed] = useState(true);
  const [showText, setShowText] = useState(true); 
  const [zoomOut, setZoomOut] = useState(false); 
  const [showButton,setShowButton] =useState(true);
  const [showCockpit, setShowCockpit] = useState(true);
  const [showVideo,setShowVideo]= useState(true);
  const [showGalaxy,setShowGalaxy]= useState(false);
  const [wobble, setWobble] = useState(false);
  const videoRef = useRef(null);

  const rocketSound = new Howl({
    src: ["/sounds/rocket.mp3"], // put your rocket sound file in public/sounds/
    volume: 1,
  });

   const handleClick = () => {
    if (videoRef.current) {
      videoRef.current.play(); // ▶️ start video on launch
      videoRef.current.onplay = () => {
        setWobble(true);
        rocketSound.play();
      }; 
      videoRef.current.onended = () => {
        setZoomOut(true); // trigger zoom out when video ends
        setShowGalaxy(true);
        setWobble(false);
        rocketSound.stop(); 
      };
    }
    setShowText(false);
    setShowButton(false);
  };


  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative"}}>
              {/* Background video */}

              {showVideo&&(
                <BackgroundVideo ref={videoRef} zoomed={zoomed} />
              )}
               {showGalaxy && (
                <BackgroundGalaxy/>
               )}
             
             {showCockpit && (
                  <Cockpit
                  wobble={wobble}
                  zoomOut={zoomOut} // pass zoomOut to camera
                  onAnimationComplete={() => {
                    setZoomed(false); // remove initial zoom
                    setShowUI(true);
                  }}
                  onZoomOutComplete={() => {
                    setShowCockpit(false)
                    setShowVideo(false)
                  
                  }} 
                />
             )}
              
              {showUI && showText && (
                <div style={{ position: "absolute", top: 50, left: 50 }}>
                  <TextOverlay />
                </div>
              )} 

              {showUI && showButton && (
                  <div
                        style={{
                          position: "absolute",
                          bottom: "7.2rem",
                          left: "28%",
                          transform: "translateX(-50%)",
                          zIndex: 10,
                        }}
                      >
                      <Button text="LAUNCH" onClick={handleClick} />
                  </div>
              )}
    </div>
  );
}

export default App;

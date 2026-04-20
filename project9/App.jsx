import React, { useState} from "react";

function App() {
    // Correct usage of useState hook
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        // Standard event listener for window resizing
        window.addEventListener("resize", handleResize);
        
        // Cleanup function to remove listener when component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
            fontFamily: "Arial, sans-serif",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white"
        }}>
            
            <h1>
                Window Size Tracker
            </h1>
            
            <div style={{
                padding: "40px",
                borderRadius: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.1)", // Glassmorphism
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              
            }}>
              <p>width : <strong>{windowSize.width}</strong></p>
              <p>height : <strong>{windowSize.height}</strong>  </p>
            </div>
            
            <p style={{ marginTop: "20px"}}>
               
               Try Resize the window to see changes in real-time
            </p>
        </div>
    );
}

export default App;
// Create a new transit map
const map = new TransitMapApp("transit-map");

// Resize the canvas to cover the entire page
const MakeFullScreenMap = () => {
    map.scaleCanvas(
        window.innerWidth,
        window.innerHeight
    );
}

window.addEventListener("resize", MakeFullScreenMap);
MakeFullScreenMap();

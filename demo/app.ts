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

const leftStation = new TransitMapStation(-250, 0, "left");
const rightStation = new TransitMapStation(250, 0, "right");
const middleStation = new TransitMapStation(0, 300, "middle");


map.addStation(leftStation)
map.addStation(rightStation)
map.addStation(middleStation)

map.addLine(new TransitLine("The horizontal", "purple", [leftStation, middleStation, rightStation]));

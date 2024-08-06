class TransitMapStation {
    public x: number;
    public y: number;
    private id: string;
    public name: string;

    constructor(id: string, x: number, y: number, name: string) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.name = name;
    }

    get getId() {
        return this.id;
    }
}

class TransitMapApp {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    public backgroundColour: string = "#cef0d8";
    public stationColour: string = "white";

    private stations: TransitMapStation[];

    constructor(id: string) {
        let canvas = document.getElementById(id) as HTMLCanvasElement;
        if (!canvas) {
            throw new Error(`No canvas found with id ${id}`);
        }

        let context = canvas.getContext("2d");
        if (!context) {
            throw new Error(`No 2D context found for canvas with id ${id}`);
        }

        this.canvas = canvas;
        this.context = context;

        this.drawMap();
        this.createUserEvents();
    }

    private createUserEvents() {
        let canvas = this.canvas;

        canvas.addEventListener("mousedown", this.mouseDownHandler);
        canvas.addEventListener("mousemove", this.mouseMoveHandler);
        canvas.addEventListener("mouseup", this.mouseUpHandler);

        canvas.addEventListener("touchstart", this.mouseDownHandler);
        canvas.addEventListener("touchmove", this.mouseMoveHandler);
        canvas.addEventListener("touchend", this.mouseUpHandler);
    }


    public drawMap() {
        let context = this.context;
        let canvas = this.canvas;
        let stations = this.stations;

        context.fillStyle = this.backgroundColour;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // If there aren't any stations to draw in the first place, might as well not try to draw them anyways
        if (!stations) return;

        context.fillStyle = this.stationColour;
        for(const station of stations) {
            context.beginPath();
            context.arc(station.x, station.y, 1, 0, 2 * Math.PI, true);
            context.fill();
        }
    }
    
    public mouseDownHandler() {
        return;
    }

    public mouseMoveHandler() {
        return;
    }

    public mouseUpHandler() {
        return;
    }

    public scaleCanvas(width: number, height: number) {
        let canvas = this.canvas;

        canvas.width = width;
        canvas.height = height;

        this.drawMap();
    }
}

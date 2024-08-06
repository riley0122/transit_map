class TransitMapStation {
    public x: number;
    public y: number;
    private id: string;
    public name: string;

    constructor(x: number, y: number, name: string) {
        this.x = x;
        this.y = y;
        this.id = crypto.randomUUID();
        this.name = name;
    }

    get getId() {
        return this.id;
    }
}

class TransitLine {
    private stations: TransitMapStation[];
    public name: string;
    private id: string;
    public colour: string;

    constructor(name: string, colour?: string, stations?: TransitMapStation[]) {
        if(stations) this.stations = stations;
        this.name = name;
        if(colour) this.colour = colour;
    }

    public addStation(station: TransitMapStation) {
        this.stations.push(station);
    }

    get getStations() {
        return this.stations;
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
    public stationBorderColour: string = "black";

    public stationBorderWidth: number = 5;
    public stationRadius: number = 20;

    private stations: TransitMapStation[] = [];
    private lines: TransitLine[] = [];

    private MapCenter: {x: number, y: number};

    private isDragging: boolean = false;
    private dragStart: {x: number, y: number};
    public zoom: number = 0;

    private isInitialDraw: boolean = true;

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

        this.MapCenter = {x:0, y:0};

        this.drawMap();
        this.createUserEvents();
    }

    private createUserEvents() {
        let canvas = this.canvas;

        canvas.addEventListener("mousedown", this.mouseDownHandler.bind(this));
        canvas.addEventListener("mousemove", this.mouseMoveHandler.bind(this));
        canvas.addEventListener("mouseup", this.mouseUpHandler.bind(this));
        canvas.addEventListener("scroll", this.scrollHandler.bind(this))

        // Touch is a little broken
        canvas.addEventListener("touchstart", this.mouseDownHandler.bind(this));
        canvas.addEventListener("touchmove", this.mouseMoveHandler.bind(this));
        canvas.addEventListener("touchend", this.mouseUpHandler.bind(this));
    }

    public drawMap() {
        let context = this.context;
        let canvas = this.canvas;
        let stations = this.stations;
        let MapCenter = this.MapCenter;
        let lines = this.lines;

        context.fillStyle = this.backgroundColour;
        context.fillRect(0, 0, canvas.width, canvas.height);

        const horizontalDisplacement = MapCenter.x + canvas.width / 2;
        const verticalDisplacement = MapCenter.y + canvas.height / 2;

        // Draw the lines first so they're under the stations
        if (!lines || lines.length === 0) return;

        for (const line of lines) {
            if (!line.getStations[0]) continue;

            context.moveTo(line.getStations[0].x + horizontalDisplacement, line.getStations[0].y + verticalDisplacement);

            context.beginPath();
            context.lineWidth = this.stationRadius;

            for (const station of line.getStations) {
                if (!stations.some(s => s === station)) {
                    if (this.isInitialDraw) console.warn(`Station ${station.name} on line ${line.name} is not added on map!`)
                    continue;
                };

                context.lineTo(station.x + horizontalDisplacement, station.y + verticalDisplacement);
            }

            console.log(line);

            context.strokeStyle = line.colour;
            context.stroke();
        }

        // If there aren't any stations to draw in the first place, might as well not try to draw them anyways
        if (!stations || stations.length === 0) return;

        for(const station of stations) {
            const drawX = station.x + horizontalDisplacement;
            const drawY = station.y + verticalDisplacement;

            context.beginPath();
            context.fillStyle = this.stationBorderColour;
            context.arc(drawX, drawY, this.stationRadius + this.stationBorderWidth * 2, 0, 2 * Math.PI, true);
            context.fill();

            context.beginPath();
            context.fillStyle = this.stationColour;
            context.arc(drawX, drawY, this.stationRadius, 0, 2 * Math.PI, true);
            context.fill();
        }

        this.isInitialDraw = false;
    }

    public mouseDownHandler(event: MouseEvent) {
        this.isDragging = true;
        this.dragStart = {
            x: event.clientX,
            y: event.clientY,
        };
    }

    public mouseMoveHandler(event: MouseEvent) {
        if (!this.isDragging) return;

        let MapCenter = this.MapCenter;

        const dragEnd: {x: number, y: number} = {
            x: event.clientX,
            y: event.clientY,
        }

        let deltaX = dragEnd.x - this.dragStart.x;
        let deltaY = dragEnd.y - this.dragStart.y;

        MapCenter.x += deltaX;
        MapCenter.y += deltaY;

        this.dragStart = {
            x: event.clientX,
            y: event.clientY,
        };

        this.MapCenter = MapCenter;
        this.drawMap();
    }

    public mouseUpHandler() {
        this.isDragging = false;
    }

    public scrollHandler() {
        return;
    }

    public scaleCanvas(width: number, height: number) {
        let canvas = this.canvas;

        canvas.width = width;
        canvas.height = height;

        this.drawMap();
    }

    public addStation(station: TransitMapStation) {
        this.stations.push(station);
        this.drawMap();
    }

    public addLine(line: TransitLine) {
        this.lines.push(line);
        this.drawMap();
    }
}

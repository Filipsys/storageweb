// Main app

const app = document.getElementById("app");

let shapesData = {};
let isDragging = false;
let mouseX = 0;
let mouseY = 0;
let velocityX = 0;
let velocityY = 0;

// Functions

function createShape(shapeId, x, y, width, height, color) {
    const shape = document.createElement("div");
    shape.style.position = "absolute";
    shape.style.left = x + "px";
    shape.style.top = y + "px";
    shape.style.width = width + "px";
    shape.style.height = height + "px";
    shape.style.backgroundColor = color;
    shape.id = shapeId;

    app.appendChild(shape);
}

function saveShape(shapeId, x, y, width, height, color) {
    shapesData[shapeId] = { x, y, width, height, color };
}


saveShape("shape1", 100, 100, 100, 100, "#ff0000");
saveShape("shape2", 200, 200, 100, 100, "#00ff00");
saveShape("shape3", 300, 300, 100, 100, "#0000ff");

// for (const shapeId in shapesData) {
//     createShape(shapeId, shapesData[shapeId].x, shapesData[shapeId].y, shapesData[shapeId].width, shapesData[shapeId].height, shapesData[shapeId].color);
// }


// Events

app.addEventListener("mousedown", (event) => {
    isDragging = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
});

app.addEventListener("mouseup", (event) => {
    isDragging = false;
});

app.addEventListener("mouseleave", (event) => {
    isDragging = false;
});

app.addEventListener("mousemove", (event) => {
    if (isDragging) {
        const deltaX = event.clientX - mouseX;
        const deltaY = event.clientY - mouseY;

        mouseX = event.clientX;
        mouseY = event.clientY;

        velocityX = deltaX * 0.9;
        velocityY = deltaY * 0.9;
    }
});


const svgGrid = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgGrid.setAttribute("width", "100%");
svgGrid.setAttribute("height", "100%");
svgGrid.style.position = "absolute";
svgGrid.style.top = "0";
svgGrid.style.left = "0";
svgGrid.style.zIndex = "-1";

function createGrid() {
    const gridSize = 50;
    const gridWidth = window.innerWidth;
    const gridHeight = window.innerHeight;

    for (let x = 0; x <= gridWidth; x += gridSize) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x);
        line.setAttribute("y1", 0);
        line.setAttribute("x2", x);
        line.setAttribute("y2", gridHeight);
        line.setAttribute("stroke", "#ccc");
        svgGrid.appendChild(line);
    }

    for (let y = 0; y <= gridHeight; y += gridSize) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", 0);
        line.setAttribute("y1", y);
        line.setAttribute("x2", gridWidth);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "#ccc");
        svgGrid.appendChild(line);
    }

    app.appendChild(svgGrid);
}

createGrid();


// Animation & render loop

function animate() {
    const render = () => {
        app.innerHTML = "";
        app.appendChild(svgGrid);

        for (const shapeId in shapesData) {
            const { x, y, width, height, color } = shapesData[shapeId];

            if (x + width > window.innerWidth) {
                x = window.innerWidth - width;
            }

            if (y + height > window.innerHeight) {
                y = window.innerHeight - height;
            }

            createShape(shapeId, x, y, width, height, color);
        }
    };

    requestAnimationFrame(animate);

    if (isDragging) {
        for (const shapeId in shapesData) {
            shapesData[shapeId].x += velocityX;
            shapesData[shapeId].y += velocityY;
        }
    } else {
        velocityX *= 0.85;
        velocityY *= 0.85;

        for (const shapeId in shapesData) {
            shapesData[shapeId].x += velocityX;
            shapesData[shapeId].y += velocityY;
        }
    }

    svgGrid.style.transform = `translate(${-shapesData.shape1.x}px, ${-shapesData.shape1.y}px)`;
    render();
}

animate();
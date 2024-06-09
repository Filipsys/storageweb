const app = document.getElementById("app");

let shapesData = {};
let shapeIsDragging = false;
let selectedShapeScale = 1;
let isDragging = false;
let isHolding = false;
let mouseX = 0;
let mouseY = 0;

let velocityX = 0;
let velocityY = 0;



// Functions

function showActiveShapeSelected(shapeId) {
    shapesData[shapeId].isSelected = true;
    shapesData[shapeId].isNotSelected = false;
}

function hideActiveShapeSelected(shapeId) {
    shapesData[shapeId].isSelected = false;
    shapesData[shapeId].isNotSelected = true;
}

function createShape(shapeId, x, y, width, height, dataType, data, color) {
    const shape = document.createElement("div");
    shape.classList.add("note-box");
    shape.style.position = "absolute";
    shape.style.left = x + "px";
    shape.style.top = y + "px";
    // shape.style.width = width + "px";
    // shape.style.height = height + "px";
    // shape.style.backgroundColor = color;
    shape.style.border = `3px solid ${color}`;
    shape.id = shapeId;

    app.appendChild(shape);


    // Mouse events for the shape

    shape.addEventListener("mousedown", (event) => {
        shapeIsDragging = true;
        selectedShapeScale = 1;
        mouseX = event.clientX;
        mouseY = event.clientY;

        showActiveShapeSelected(shapeId);
    });

    shape.addEventListener("mouseup", (event) => {
        shapeIsDragging = false;
        selectedShapeScale = 1;

        hideActiveShapeSelected(shapeId);
    });

    shape.addEventListener("mouseleave", (event) => {
        shapeIsDragging = false;
        selectedShapeScale = 1;

        hideActiveShapeSelected(shapeId);
    });

    shape.addEventListener("mousemove", (event) => {
        if (shapeIsDragging) {
            const shapeX = shapesData[shapeId].x;
            const shapeY = shapesData[shapeId].y;

            const newShapeX = shapeX + event.clientX - mouseX;
            const newShapeY = shapeY + event.clientY - mouseY;

            shapesData[shapeId].x = newShapeX;
            shapesData[shapeId].y = newShapeY;

            mouseX = event.clientX;
            mouseY = event.clientY;
        }
    });
}

function saveShape(x, y, width, height, dataType = "text", dataLink = null, data = null, color) {
    // shapesData[shapeId] = { x, y, width, height, color };
    
    axios.post("http://localhost:3000/api/save", {
        x, y,
        width, height,
        dataType, dataLink, data,
        color
    }).then((response) => {
        console.log(response);
    });
}



// for (const shapeId in shapesData) {
//     createShape(shapeId, shapesData[shapeId].x, shapesData[shapeId].y, shapesData[shapeId].width, shapesData[shapeId].height, shapesData[shapeId].color);
// }


// Events

app.addEventListener("mousedown", (event) => {
    isDragging = false;
    isHolding = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
});

app.addEventListener("mouseup", (event) => {
    isDragging = false;
    isHolding = false;
});

app.addEventListener("mouseleave", (event) => {
    isDragging = false;
    isHolding = false;
});

app.addEventListener("mousemove", (event) => {
    if (isHolding) {
        const deltaX = event.clientX - mouseX;
        const deltaY = event.clientY - mouseY;

        mouseX = event.clientX;
        mouseY = event.clientY;

        velocityX = deltaX * 0.6;
        velocityY = deltaY * 0.6;
    }
});

app.addEventListener("wheel", (event) => {
    // TODO: Add zooming

    event.preventDefault();
    event.stopPropagation();
});


// Animation & render loop

function animate() {
    const render = () => {
        app.innerHTML = "";

        for (const shapeId in shapesData) {
            const { x, y, width, height, color } = shapesData[shapeId];

            createShape(shapeId, x, y, width, height, color);

            if (shapesData[shapeId].isSelected) {
                const selectedShape = document.getElementById(shapeId);

                const interval = setInterval(() => {
                    if (selectedShapeScale < 1.1) {
                        selectedShapeScale += 0.01;
                    } else {
                        clearInterval(interval);
                    }
                }, 100);

                selectedShape.style.scale = selectedShapeScale;
            }
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

    render();
}


// Config section

const configSection = document.getElementById("config-section");
configSection.style.left = "-20vw"; // Making sure it's not visible

const hideConfigButton = document.getElementById("hide-config");
hideConfigButton.style.left = "0px";


hideConfigButton.addEventListener("click", () => {
    const hideConfig = document.getElementById("hide-config");
    const hideConfigIcon = document.getElementById("hide-config-icon");

    if (configSection.style.left == "0px") {
        configSection.style.left = "-20vw";

        hideConfig.style.left = "0px";
        hideConfigIcon.style.rotate = "0deg";
    } else {
        configSection.style.left = "0px";

        hideConfig.style.left = "20vw";
        hideConfigIcon.style.rotate = "180deg";
    }
});


// Initialization

document.addEventListener("DOMContentLoaded", () => {
    // saveShape("shape1", 100, 100, 100, 100, "#ff0000");
    // saveShape("shape2", 400, 200, 100, 100, "#00ff00");
    // saveShape("shape3", 200, 700, 100, 100, "#0000ff");

    axios.get("http://localhost:3000/api/getData").then((response) => {
        console.log(response.data);
    });

    animate();

    const configSection = document.getElementById("config-section");
    configSection.style.transition = "left 0.1s ease-in-out";
});
// import { main } from "bun";

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
    shape.style.width = width + "px";
    shape.style.height = height + "px";
    // shape.style.backgroundColor = color;
    shape.style.border = `3px solid ${color}`;
    shape.id = shapeId;

    if (dataType == "text") {
        shape.innerHTML = data;
    }

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

function createShape(x, y, width, height, dataType = "text", dataLink = null, data = null, color) {
    // shapesData[shapeId] = { x, y, width, height, color };

    console.log(x, y, width, height, dataType, dataLink, data, color);

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
            // const { x, y, width, height, color } = shapesData[shapeId];

            // createShape(x = 100, y = 100, width = 100, height = 100, dataType = "text", dataLink = null, data = "Hello World", color = "#ff0000");

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
    // createShape("shape1", 100, 100, 100, 100, "#ff0000");
    // createShape("shape2", 400, 200, 100, 100, "#00ff00");
    // createShape("shape3", 200, 700, 100, 100, "#0000ff");

    const createButton = document.getElementsByClassName("navbar-item")[0];

    createButton.addEventListener("click", () => {
        const shapeBg = document.getElementsByClassName("popup-bg")[0];
        shapeBg.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        shapeBg.style.pointerEvents = "auto";

        const shapePopup = document.createElement("div");
        shapePopup.classList.add("popup-shape");

        setTimeout(() => {
            shapePopup.style.opacity = "1";
        }, 1);

        const popupCloseButton = document.createElement("div");
        popupCloseButton.classList.add("material-symbols-rounded", "popup__close-button");
        popupCloseButton.innerText = "close";
        shapePopup.appendChild(popupCloseButton);

        function closePopup() {
            shapeBg.style.backgroundColor = "transparent";
            shapeBg.style.pointerEvents = "none";

            shapePopup.style.opacity = "0";

            setTimeout(() => {
                shapePopup.remove();

                shapeBg.style.backgroundColor = "transparent";
                shapeBg.style.pointerEvents = "none";
            }, 300);
        }

        popupCloseButton.addEventListener("click", closePopup);

        const popupContainer = document.createElement("div");
        popupContainer.classList.add("popup-container");
        shapePopup.appendChild(popupContainer);

        const mainContainer = document.createElement("div");
        mainContainer.classList.add("popup-main-container");
        popupContainer.appendChild(mainContainer);

        const mainAreaTitle = document.createElement("h3");
        mainAreaTitle.classList.add("popup-title");
        mainAreaTitle.innerText = "Choose your desired element type";
        mainContainer.appendChild(mainAreaTitle);

        const mainArea = document.createElement("div");
        mainArea.classList.add("popup-main-area");
        mainContainer.appendChild(mainArea);

        const linkElement = document.createElement("div");
        linkElement.classList.add("popup-main-area-link", "element-type-button-pick");
        const linkElementIcon = document.createElement("i");
        linkElementIcon.classList.add("material-symbols-rounded", "popup-main-area-link-icon");
        linkElementIcon.innerText = "link";
        // linkElement.appendChild(document.createTextNode("Link"));
        const linkElementLabel = document.createElement("p");
        linkElementLabel.classList.add("popup-main-area-link-label");
        linkElementLabel.innerText = "Link";
        linkElement.appendChild(linkElementIcon);
        linkElement.appendChild(linkElementLabel);

        const imageElement = document.createElement("div");
        imageElement.classList.add("popup-main-area-image", "element-type-button-pick");
        const imageElementIcon = document.createElement("i");
        imageElementIcon.classList.add("material-symbols-rounded", "popup-main-area-image-icon");
        imageElementIcon.innerText = "image";
        // imageElement.appendChild(document.createTextNode("Image"));
        const imageElementLabel = document.createElement("p");
        imageElementLabel.classList.add("popup-main-area-image-label");
        imageElementLabel.innerText = "Image";
        imageElement.appendChild(imageElementIcon);
        imageElement.appendChild(imageElementLabel);

        const textElement = document.createElement("div");
        textElement.classList.add("popup-main-area-text", "element-type-button-pick");
        const textElementIcon = document.createElement("i");
        textElementIcon.classList.add("material-symbols-rounded", "popup-main-area-text-icon");
        textElementIcon.innerText = "text_fields";
        // textElement.appendChild(document.createTextNode("Text"));
        const textElementLabel = document.createElement("p");
        textElementLabel.classList.add("popup-main-area-text-label");
        textElementLabel.innerText = "Text";
        textElement.appendChild(textElementIcon);
        textElement.appendChild(textElementLabel);

        mainArea.appendChild(linkElement);
        mainArea.appendChild(imageElement);
        mainArea.appendChild(textElement);

        const btnsList = [linkElement, imageElement, textElement];
        let btnIndex = 0;

        for (const btn of btnsList) {
            const shineDiv = document.createElement("div");
            shineDiv.classList.add("shine-div");
            shineDiv.id = `shine-div-${btnIndex}`;

            btn.appendChild(shineDiv);
            btnIndex++;

            btn.addEventListener("mouseover", () => {
                const shineDiv = document.getElementById(`shine-div-${btnsList.indexOf(btn)}`);

                setTimeout(() => {
                    shineDiv.style.left = "15px";
                }, 30);
            });

            btn.addEventListener("mouseout", () => {
                const shineDiv = document.getElementById(`shine-div-${btnsList.indexOf(btn)}`);
                shineDiv.style.left = "-100px";
            });

            btn.addEventListener("click", () => {
                closePopup();

                switch (btnsList.indexOf(btn)) {
                    case 0:
                        createShape(x = 100, y = 100, width = 100, height = 100, dataType = "link", dataLink = "https://www.google.com", data = null, color = "#ff0000");
                        break;
                    case 1:
                        createShape(x = 100, y = 100, width = 100, height = 100, dataType = "image", dataLink = "https://i.imgur.com/y1h0hKc.png", data = null, color = "#ff0000");
                        break;
                    case 2:
                        createShape(x = 100, y = 100, width = 100, height = 100, dataType = "text", dataLink = null, data = "Hello World", color = "#ff0000");
                        break;
                }
            });
        }

        shapeBg.appendChild(shapePopup);
    });


    axios.get("http://localhost:3000/api/load").then((response) => {
        const responseData = response.data;

        console.log(responseData);

        // [
        //     {
        //         "id": 2,
        //         "x": 100,
        //         "y": 100,
        //         "width": 100,
        //         "height": 100,
        //         "dataType": "text",
        //         "dataLink": null,
        //         "data": "Hello World",
        //         "color": "#ff0000"
        //     }
        // ]

        for (let i = 0; i < responseData.length; i++) {
            const shape = responseData[i];

            switch (shape.dataType) {
                case "link":
                    createShape(x = shape.x, y = shape.y, width = shape.width, height = shape.height, dataType = "link", dataLink = shape.dataLink, data = null, color = shape.color);
                    break;
                case "image": {
                    createShape(x = shape.x, y = shape.y, width = shape.width, height = shape.height, dataType = "image", dataLink = shape.dataLink, data = null, color = shape.color);
                    break;
                }
                case "text": {
                    createShape(x = shape.x, y = shape.y, width = shape.width, height = shape.height, dataType = "text", dataLink = null, data = shape.data, color = shape.color);
                    break;
                }
            }
        }
    });

    animate();

    const configSection = document.getElementById("config-section");
    configSection.style.transition = "left 0.1s ease-in-out";
});
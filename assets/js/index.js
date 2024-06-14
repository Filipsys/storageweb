let oldSavedData = [];
let savedData = {};
let shapeIsDragging = false;
let shapeIsResizing = false;  // New variable to manage resizing state
let shapeIsEditingText = false;  // New variable to manage editing text state
let shapeTextElement = null;
let updateIntervalMs = 100;
let currentInterval = 0;
let selectedShapeScale = 1;
let selectedShapeId = null;
let isDragging = false;
let isHolding = false;
let mouseX = 0;
let mouseY = 0;
let initialMouseX = 0;  // New variable to track initial mouse position for resizing
let initialMouseY = 0;
let initialShapeWidth = 0;  // New variable to track initial shape size
let initialShapeHeight = 0;

let velocityX = 0;
let velocityY = 0;

const minShapeWidth = 100;
const minShapeHeight = 100;


// Functions

function showActiveShapeSelected(shapeId) {
    savedData[shapeId].isSelected = true;
    savedData[shapeId].isNotSelected = false;
}

function hideActiveShapeSelected(shapeId) {
    savedData[shapeId].isSelected = false;
    savedData[shapeId].isNotSelected = true;
}

function createShape(shapeId, x, y, width, height, dataType, dataLink, data, color) {
    const shape = document.createElement("div");
    shape.classList.add("note-box");
    shape.style.left = x + "px";
    shape.style.top = y + "px";
    shape.style.width = width + "px";
    shape.style.height = height + "px";
    shape.style.border = `3px solid ${color}`;
    shape.id = shapeId;

    if (dataType === "text") {
        shape.innerHTML = data;
    } else if (dataType === "image") {
        shape.style.backgroundImage = `url(${dataLink})`;
    } else if (dataType === "link") {
        shape.innerHTML = `<a href="${dataLink}" target="_blank">${dataLink}</a>`;
        shape.style.cursor = "pointer";
        shape.style.width = "auto";
    }

    // const resizeIcon = document.createElement("i");
    // resizeIcon.classList.add("material-symbols-rounded", "resize-icon");
    // resizeIcon.id = `resize-icon-${shapeId}`;
    // resizeIcon.innerText = "drag_indicator";
    // shape.appendChild(resizeIcon);

    // const editIcon = document.createElement("i");
    // editIcon.classList.add("material-symbols-rounded", "edit-icon");
    // editIcon.id = `edit-icon-${shapeId}`;
    // editIcon.innerText = "edit_square";
    // shape.appendChild(editIcon);

    const resizeIcon = document.createElement("i");
    resizeIcon.classList.add("material-symbols-rounded", "resize-icon");
    resizeIcon.id = `resize-icon-${shapeId}`;
    resizeIcon.innerText = "drag_indicator";
    shape.appendChild(resizeIcon);


    const editMenu = document.createElement("div");
    editMenu.classList.add("edit-menu");
    editMenu.id = `edit-menu-${shapeId}`;
    shape.appendChild(editMenu);

    const editIcon = document.createElement("i");
    editIcon.classList.add("material-symbols-rounded", "edit-icon");
    editIcon.id = `edit-icon-${shapeId}`;
    editIcon.innerText = "edit_square";
    editMenu.appendChild(editIcon);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("material-symbols-rounded", "delete-icon");
    deleteIcon.id = `delete-icon-${shapeId}`;
    deleteIcon.innerText = "delete";
    editMenu.appendChild(deleteIcon);


    document.getElementById("app").appendChild(shape);


    // shape.addEventListener("click", () => {
    //     const deleteIcon = document.getElementById(`delete-icon-${shapeId}`);
    // });

    deleteIcon.addEventListener("mouseup", () => {
        selectedShapeId = shapeId;
        shape.remove();

        deleteShape(selectedShapeId.split("-")[1]);
    });

    shape.addEventListener("mousedown", (event) => {
        const resizeIcon = document.getElementById(`resize-icon-${shapeId}`);

        if (event.target === resizeIcon) {
            shapeIsResizing = true;
            initialMouseX = event.clientX;
            initialMouseY = event.clientY;
            initialShapeWidth = shape.offsetWidth;
            initialShapeHeight = shape.offsetHeight;
        } else if (event.target === editIcon) {
            shapeIsResizing = false;
            shapeIsDragging = false;
            selectedShapeId = shapeId;

            // make text editable

            const textElement = document.getElementById(`shape-${shapeId}`);
            textElement.contentEditable = true;
        } else {
            shapeIsDragging = true;
            mouseX = event.clientX;
            mouseY = event.clientY;
        }

        selectedShapeId = shapeId;
        showActiveShapeSelected(shapeId);
    });

    shape.addEventListener("mouseup", () => {
        shapeIsDragging = false;
        shapeIsResizing = false;
        selectedShapeScale = 1;

        updatePosition(savedData[selectedShapeId].x, savedData[selectedShapeId].y, selectedShapeId.split("-")[1]);
        updateDimensions(savedData[selectedShapeId].width, savedData[selectedShapeId].height, selectedShapeId.split("-")[1]);

        hideActiveShapeSelected(shapeId);
    });

    shape.addEventListener("mouseleave", () => {
        shapeIsDragging = false;
        shapeIsResizing = false;
        selectedShapeScale = 1;

        hideActiveShapeSelected(shapeId);
    });

    shape.addEventListener("mousemove", (event) => {
        if (shapeIsDragging) {
            const shapeX = savedData[shapeId].x;
            const shapeY = savedData[shapeId].y;

            const newShapeX = shapeX + event.clientX - mouseX;
            const newShapeY = shapeY + event.clientY - mouseY;

            savedData[shapeId].x = newShapeX;
            savedData[shapeId].y = newShapeY;

            mouseX = event.clientX;
            mouseY = event.clientY;
        }

        if (shapeIsResizing) {
            const deltaX = event.clientX - initialMouseX;
            const deltaY = event.clientY - initialMouseY;
            let newWidth = initialShapeWidth + deltaX;
            let newHeight = initialShapeHeight + deltaY;

            if (newWidth < minShapeWidth) {
                newWidth = minShapeWidth;
            }

            if (newHeight < minShapeHeight) {
                newHeight = minShapeHeight;
            }

            shape.style.width = newWidth + "px";
            shape.style.height = newHeight + "px";

            savedData[shapeId].width = newWidth;
            savedData[shapeId].height = newHeight;

            // const newWidth = initialShapeWidth + deltaX;
            // const newHeight = initialShapeHeight + deltaY;

            // shape.style.width = newWidth + "px";
            // shape.style.height = newHeight + "px";

            // savedData[shapeId].width = newWidth;
            // savedData[shapeId].height = newHeight;
        }
    });
}

function saveShape(x, y, width, height, dataType = "text", dataLink = null, data = null, color) {
    console.log(x, y, width, height, dataType, dataLink, data, color);

    axios.post("http://localhost:3000/api/save", {
        x, y, width, height, dataType, dataLink, data, color
    }).then((response) => {
        console.log(response);
    });
}

function updatePosition(x, y, selectedShapeId) {
    axios.post("http://localhost:3000/api/updatePosition", {
        x, y, selectedShapeId
    }).then((response) => {
        console.log(response);
    });
}

function updateDimensions(width, height, selectedShapeId) {
    axios.post("http://localhost:3000/api/updateDimensions", {
        width, height, selectedShapeId
    }).then((response) => {
        console.log(response);
    });
}

function deleteShape(selectedShapeId) {
    axios.post("http://localhost:3000/api/delete", {
        selectedShapeId
    }).then((response) => {
        console.log(response);
    });
}

// Events

app.addEventListener("mousedown", (event) => {
    isDragging = false;
    isHolding = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
});

app.addEventListener("mouseup", () => {
    isDragging = false;
    isHolding = false;
});

app.addEventListener("mouseleave", () => {
    isDragging = false;
    isHolding = false;
});

app.addEventListener("mousemove", (event) => {
    if (isHolding && !shapeIsResizing) {
        const deltaX = event.clientX - mouseX;
        const deltaY = event.clientY - mouseY;

        mouseX = event.clientX;
        mouseY = event.clientY;

        velocityX = deltaX * 0.6;
        velocityY = deltaY * 0.6;

        for (const shapeId in savedData) {
            savedData[shapeId].x += velocityX;
            savedData[shapeId].y += velocityY;
        }
    }
});

app.addEventListener("wheel", (event) => {
    // TODO: Add zooming

    event.preventDefault();
    event.stopPropagation();
});

// Animation & render loop

function showAllShapes(shapeData) {
    for (const shape in shapeData) {
        let currentShape = shapeData[shape];

        switch (currentShape.dataType) {
            case "link":
                createShape(
                    shapeId = `shape-${currentShape.id}`,
                    x = currentShape.x, y = currentShape.y,
                    width = currentShape.width, height = currentShape.height,
                    dataType = "link", dataLink = currentShape.dataLink, data = null,
                    color = currentShape.color
                );
                break;
            case "image":
                createShape(
                    shapeId = `shape-${currentShape.id}`,
                    x = currentShape.x, y = currentShape.y,
                    width = currentShape.width, height = currentShape.height,
                    dataType = "image", dataLink = currentShape.dataLink, data = null,
                    color = currentShape.color
                );
                break;
            case "text":
                createShape(
                    shapeId = `shape-${currentShape.id}`,
                    x = currentShape.x, y = currentShape.y,
                    width = currentShape.width, height = currentShape.height,
                    dataType = "text", dataLink = null, data = currentShape.data,
                    color = currentShape.color
                );
                break;
        }
    }
}

function animate() {
    const render = () => {
        app.innerHTML = "";

        // if (currentInterval < updateIntervalMs) {
        //     currentInterval += 1;
        // } else {
        //     currentInterval = 0;

        //     if (!isDragging || !isHolding || !shapeIsDragging || !shapeIsResizing) {
        //         axios.get("http://localhost:3000/api/load").then((response) => {
        //             oldSavedData = response.data;

        //             oldSavedData.forEach((shape) => {
        //                 shape["isSelected"] = false;
        //                 shape["isNotSelected"] = true;
        //             });

        //             oldSavedData.forEach((shape) => {
        //                 savedData[`shape-${shape.id}`] = shape;
        //             });
        //         });

        //         console.log("New data loaded");
        //     }
        // }

        showAllShapes(savedData);
    };

    requestAnimationFrame(animate);

    if (isDragging) {
        for (const shapeId in savedData) {
            savedData[shapeId].x += velocityX;
            savedData[shapeId].y += velocityY;
        }
    } else {
        velocityX *= 0.85;
        velocityY *= 0.85;

        for (const shapeId in savedData) {
            savedData[shapeId].x += velocityX;
            savedData[shapeId].y += velocityY;
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

    if (configSection.style.left === "0px") {
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
    axios.get("http://localhost:3000/api/load").then((response) => {
        oldSavedData = response.data.map(shape => ({
            ...shape,
            isSelected: false,
            isNotSelected: true
        }));

        oldSavedData.forEach((shape) => {
            savedData[`shape-${shape.id}`] = shape;
        });

        animate(savedData);
    });

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
                        saveShape(x = 100, y = 100, width = 100, height = 100, dataType = "link", dataLink = "https://www.google.com", data = null, color = "var(--champagne-pink)");
                        console.log("link");
                        break;
                    case 1:
                        saveShape(x = 100, y = 100, width = 100, height = 100, dataType = "image", dataLink = "https://i.imgur.com/y1h0hKc.png", data = null, color = "var(--champagne-pink)");
                        console.log("image");
                        break;
                    case 2:
                        saveShape(x = 100, y = 100, width = 100, height = 100, dataType = "text", dataLink = null, data = "Hello World", color = "var(--champagne-pink)");
                        console.log("text");
                        break;
                }
            });
        }

        shapeBg.appendChild(shapePopup);
    });

    const configSection = document.getElementById("config-section");
    configSection.style.transition = "left 0.1s ease-in-out";
});
// src/index.js

import { Application, Graphics, Container } from "pixi.js";
import "./styles.css";

const app = new Application();
let isPanning = false;
let lastPosX = 0;
let lastPosY = 0;

(async () => {
  await app.init({
    resizeTo: window,
    backgroundColor: 0x1099bb,
  });

  // do pixi things here

  document.getElementById("app").appendChild(app.canvas);

  let isDragging = false;
  let startX = 0;
  let startY = 0;

  const container = new Container();
  app.stage.addChild(container);

  const rect1 = new Graphics()
  // .anchor.set(0.5)
  .rect((window.innerWidth / 2) - 150, (window.innerHeight / 2) - 100, 300, 200)
  .fill("white");

  container.addChild(rect1);

  app.canvas.addEventListener("pointerdown", (event) => {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
  });

  app.canvas.addEventListener("pointerup", () => {
    isDragging = false;
  });

  app.canvas.addEventListener("mouseleave", () => {
    isDragging = false;
  });

  app.canvas.addEventListener("pointermove", (event) => {
    if (isDragging) {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      container.x += dx;
      container.y += dy;
      startX = event.clientX;
      startY = event.clientY;
    }
  });
})()
import Bun from "bun";
import { Database } from "bun:sqlite";


// Functions //

function initDatabase() {
    const db = new Database("assets/storage/data.sqlite", { create: true });

    const query = db.query("CREATE TABLE IF NOT EXISTS dataShapes (id INTEGER PRIMARY KEY AUTOINCREMENT, x INTEGER NOT NULL, y INTEGER NOT NULL, width INTEGER, height INTEGER, dataType TEXT, dataLink TEXT, data TEXT, color TEXT DEFAULT '#000000')");
    query.run();

    db.close();

    console.log("Database ready");
}

function getData() {
    const db = new Database("assets/storage/data.sqlite");

    const query = db.prepare("SELECT * FROM dataShapes");
    const data = query.all();
    db.close();

    return data;
}

function saveData(x: number, y: number, width: number, height: number, dataType: string, dataLink: string, data: string, color: string) {
    const db = new Database("assets/storage/data.sqlite");

    const query = db.prepare("INSERT INTO dataShapes (x, y, width, height, dataType, dataLink, data, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    query.run(x, y, width, height, dataType, dataLink, data, color);
    db.close();
    
    return { success: true };
}


// Start the main server //

const server = Bun.serve({
    async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url);
        let path: string = url.pathname === "/" ? "/templates/index.html" : url.pathname;

        if (request.method === "GET" && url.pathname === "/api/load") {
            return new Response(JSON.stringify(getData()), { status: 200 });
        }

        if (request.method === "POST" && url.pathname === "/api/save") {
            const db = new Database("assets/storage/data.sqlite");
            const requestData = await request.json();

            const { x, y, width, height, dataType, dataLink, data, color } = requestData as unknown as { x: number, y: number, width: number, height: number, dataType: string, dataLink: string, data: string, color: string };
            saveData(x, y, width, height, dataType, dataLink, data, color);

            db.close();

            return new Response(JSON.stringify({ success: true }), { status: 200 });
        }

        if (request.method === "POST" && url.pathname === "/api/updatePosition") {
            const db = new Database("assets/storage/data.sqlite");
            const requestData = await request.json();

            const { x, y, selectedShapeId } = requestData as unknown as { x: number, y: number, selectedShapeId: string };
            
            const query = db.prepare("UPDATE dataShapes SET x = ?, y = ? WHERE id = ?");
            query.run(x, y, selectedShapeId);

            db.close();

            return new Response(JSON.stringify({ success: true }), { status: 200 });
        }

        if (request.method === "POST" && url.pathname === "/api/updateDimensions") {
            const db = new Database("assets/storage/data.sqlite");
            const requestData = await request.json();

            const { width, height, selectedShapeId } = requestData as unknown as { width: number, height: number, selectedShapeId: string };
            
            const query = db.prepare("UPDATE dataShapes SET width = ?, height = ? WHERE id = ?");
            query.run(width, height, selectedShapeId);

            db.close();

            return new Response(JSON.stringify({ success: true }), { status: 200 });
        }

        if (request.method === "POST" && url.pathname === "/api/delete") {
            const db = new Database("assets/storage/data.sqlite");
            const requestData = await request.json();

            const { selectedShapeId } = requestData as unknown as { selectedShapeId: string };
            
            const query = db.prepare("DELETE FROM dataShapes WHERE id = ?");
            query.run(selectedShapeId);

            db.close();

            return new Response(JSON.stringify({ success: true }), { status: 200 });
        }

        try {
            //? Get the file path from the URL

            const file: Bun.BunFile = Bun.file("." + path);
            const ext: string = path.split('.').pop() || "";

            // Set the content type based on the file extension

            const contentTypes: { [key: string]: string } = {
                "html": "text/html",
                "css": "text/css",
                "js": "application/javascript",
            };

            //? Return the file as a response with the appropriate content type

            return new Response(file, {
                headers: { "Content-Type": contentTypes[ext] || "text/plain" }
            });

        } catch {
            return new Response("File not found", { status: 404 });
        }
    },
    port: 3000,
});


// Main setup //

initDatabase();
console.log(`Server started at port ${server.port}`);
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
    fetch(request: Request): Response {
        const url = new URL(request.url);
        let path: string = url.pathname === "/" ? "/templates/index.html" : url.pathname;

        if (url.pathname === "/api/getData") {
            return new Response(JSON.stringify(getData()), { status: 200 });

        } else if (url.pathname === "/api/save") {
            const db = new Database("assets/storage/data.sqlite");

            const { x, y, width, height, dataType, dataLink, data, color } = request.body as unknown as { x: number, y: number, width: number, height: number, dataType: string, dataLink: string, data: string, color: string };

            saveData(x, y, width, height, dataType, dataLink, data, color);

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

// initDatabase();
console.log(`Server started at port ${server.port}`);
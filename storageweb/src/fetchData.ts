export async function fetchData() {
    const response = await fetch("http://127.0.0.1:3000/api/data", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET"
        }
    });

    return response.json();
}
export async function GET(request) {
    try {
        return Response.json({ message: "Hello World" });
    } catch (error) {
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
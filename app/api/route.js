export async function GET(request) {
    try {
        return Response.json({ message: "Api successed" });
    } catch (error) {
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
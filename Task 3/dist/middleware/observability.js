export function observability(req, res, next) {
    const start = Date.now();
    const timestamp = new Date().toISOString();
    const HttpMethod = req.method;
    const url = req.url;
    res.on("finish", () => {
        const executionTime = start - Date.now();
        console.log(`timestamp = ${timestamp}
        HttpMethod = ${HttpMethod}
        url = ${url}
        executionTime = ${executionTime}ms
    `);
    });
    next();
}
//# sourceMappingURL=observability.js.map
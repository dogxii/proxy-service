Deno.serve((request: Request) => {
    const url = new URL(request.url);
    const [sp, reqHeaders] = [url.searchParams, request.headers];

    const quickLink = sp.get("to");
    if (quickLink) {
        try {
            const targetUrl = new URL(quickLink);

            const proxyUrl = new URL(url.origin);
            proxyUrl.searchParams.set("proxy-host", targetUrl.hostname);
            proxyUrl.searchParams.set("proxy-protocol", targetUrl.protocol);

            if (targetUrl.port) {
                proxyUrl.searchParams.set("proxy-port", targetUrl.port);
            }
            proxyUrl.pathname = targetUrl.pathname;

            targetUrl.searchParams.forEach((value, key) => {
                proxyUrl.searchParams.set(key, value);
            });

            proxyUrl.searchParams.delete("to");

            return new Response(null, {
                status: 302,
                headers: {
                    "Location": proxyUrl.toString()
                }
            });
        } catch (error) {
            return new Response(`link error: ${error.message}`, { status: 400 });
        }
    }

    const [hostname, port, protocol] = [
        sp.get("proxy-host") || reqHeaders.get("proxy-host"),
        sp.get("proxy-port") || reqHeaders.get("proxy-port"),
        sp.get("proxy-protocol") || reqHeaders.get("proxy-protocol"),
    ];

    if (!hostname) {
        return new Response("Hostname is required for proxying", { status: 400 });
    }

    url.hostname = hostname || "dogxi.me";
    url.port = port || "443";
    url.protocol = protocol || "https:";

    sp.delete("proxy-host");
    sp.delete("proxy-port");
    sp.delete("proxy-protocol");

    const headers = new Headers(reqHeaders);

    headers.delete("proxy-host");
    headers.delete("proxy-port");
    headers.delete("proxy-protocol");

    headers.set("Access-Control-Allow-Origin", "*");
    headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS",
    );

    return fetch(url.href, {
        headers,
        method: request.method,
        body: request.body,
    });
});

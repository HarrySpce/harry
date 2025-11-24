export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        switch (url.pathname) {

            case "/txt1":
                return new Response("静けさ<br>勇気<br>知恵", {
                    headers: { "Content-Type": "text/html; charset=utf-8" } }
                );

            case "/txt2":
                return new Response("サンプラー", {
                    headers: { "Content-Type": "text/html; charset=utf-8" } }
                );

            case "/music":
                const api = `https://ws.audioscrobbler.com/2.0/?api_key=${env.lastfm_key}&method=user.getrecenttracks&user=Harry-06&format=json&limit=2`;
                const res = await fetch(api);
                const data = await res.json();
                const recent = data.recenttracks.track[0];
                const song = recent.name;
                const artist = recent.artist["#text"];
                return new Response(`<p>${song}</p><p><span style="color: #5c5c5c;">by</span> ${artist}</p>`, { 
                    headers: { "Content-Type": "text/html; charset=utf-8" } }
                );

            case "/url":
                const urls = ["supert.one" , "harry.report" , "limiter.report" , "sharkhalo.cc"];
                const randomURL = urls[Math.floor(Math.random() * urls.length)];
                return new Response(randomURL, { 
                    headers: { "Content-Type": "text/plain; charset=utf-8" } }
                );
                
            default: return Response.redirect(`${url.origin}/404`, 303);
        }
    },
};
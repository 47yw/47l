const HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Liam Portfolio</title>
    <style>
      :root { color-scheme: dark; font-family: Inter, system-ui, sans-serif; }
      body { margin: 0; background: #05070b; color: #f5f7fb; min-height: 100vh; display: grid; place-items: center; }
      main { max-width: 760px; padding: 2rem; text-align: center; }
      a { color: #8ab4ff; }
      code { background: rgba(255,255,255,0.08); padding: 0.15rem 0.35rem; border-radius: 0.3rem; }
    </style>
  </head>
  <body>
    <main>
      <h1>Liam Portfolio</h1>
      <p>This deployment is now running as a Cloudflare Worker.</p>
      <p>Use <code>/api/projects</code> or <code>/api/stats</code> for the JSON endpoints.</p>
      <p><a href="/proyect">Open the proyect page</a> · <a href="/stats">Open the stats page</a></p>
    </main>
  </body>
</html>`;

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/api/projects') {
      return Response.json({ total: 0, projects: [] });
    }

    if (url.pathname === '/api/stats') {
      return Response.json({
        metrics: {
          total: 0,
          featured: 0,
          yearStart: 0,
          yearEnd: 0,
          totalLangs: 0,
          totalCats: 0,
          topLanguage: ''
        },
        languages: [],
        categories: [],
        projects: []
      });
    }

    if (url.pathname === '/proyect' || url.pathname === '/stats') {
      return new Response(HTML, {
        headers: { 'content-type': 'text/html; charset=utf-8' }
      });
    }

    return new Response(HTML, {
      headers: { 'content-type': 'text/html; charset=utf-8' }
    });
  }
};

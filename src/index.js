export default {
  async fetch(request, env, ctx) {
    const RENDER_URL = env.RENDER_URL || 'https://meow-web-hrgz.onrender.com';
    
    const url = new URL(request.url);
    const proxyUrl = RENDER_URL + url.pathname + url.search;
    
    try {
      const response = await fetch(proxyUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body
      });
      
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');
      
      return newResponse;
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Proxy error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
}

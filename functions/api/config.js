export async function onRequestGet(context) {
  try {
    // 确保读取出的确实是 JSON，若为空则默认返回空数组 []
    const data = await context.env.DOMAINS_KV.get('domains', 'json') || [];
    return Response.json(data, {
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });
  } catch (err) {
    return Response.json([], { status: 500 });
  }
}

export async function onRequestPost(context) {
  try {
    const auth = context.request.headers.get('Authorization');
    const pwd = context.env.ADMIN_PASSWORD;
    
    if (!pwd || auth !== `Bearer ${pwd}`) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await context.request.json();
    
    // 确保写入的是标准的 JSON 字符串
    await context.env.DOMAINS_KV.put('domains', JSON.stringify(body));
    return Response.json({ success: true });
  } catch (err) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
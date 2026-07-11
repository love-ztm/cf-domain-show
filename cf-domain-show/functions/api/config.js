export async function onRequestGet(context) {
  const data = await context.env.DOMAINS_KV.get('domains','json') || [];
  return Response.json(data);
}

export async function onRequestPost(context) {
  const auth = context.request.headers.get('Authorization');
  const pwd = context.env.ADMIN_PASSWORD;
  if(auth !== `Bearer ${pwd}`){
    return new Response('Unauthorized',{status:401});
  }
  const body = await context.request.json();
  await context.env.DOMAINS_KV.put('domains', JSON.stringify(body));
  return Response.json({success:true});
}

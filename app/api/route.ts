// export const dynamic = 'force-dynamic' // defaults to auto

export async function POST(request: Request) {
  const form = await request.formData()
  const file = form.get('file') as File

  const content = await file.text()
  try {
    const json = JSON.parse(content)
    return Response.json({
      content: json.data.map((item: any) => item.post_url).join('\n')
    })
  } catch (e) {
    return Response.json({ content })
  }
  // const content = (await file.text()).replace(/[\r\n]/g, ' ')
}

export async function GET(request: Request) {
  return Response.json({ data: 'OK' })
  // const { searchParams } = new URL(request.url)
  // const id = searchParams.get('id')
  // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY!
  //   }
  // })
  // const product = await res.json()
  // return Response.json({ product })
}

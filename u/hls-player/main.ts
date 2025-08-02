export const makeLink = (videoId: string | number) => {
  videoId = videoId.toString();

  const CDN_BASE_URL = "https://service.webvideocore.net"
  const BUCKET_ID = "CL1olYogIrDWvwqiIKK7eBmnWbRkKKsu3nqabm9GlX02JOj3CDNXzodJMDEN2dk3";
  const LINK = `${CDN_BASE_URL}/${BUCKET_ID}/${videoId}.m3u8`

  return LINK;
}

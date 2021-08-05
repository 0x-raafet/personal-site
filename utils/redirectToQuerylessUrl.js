export default function redirectToQuerylessUrl(req) {
  const currentUrlWithoutParams = req.url?.substr(0, req.url.indexOf('?'))
  return {
    redirect: {
      destination: currentUrlWithoutParams,
      permanent: true,
    },
  }
}

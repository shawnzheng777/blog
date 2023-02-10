export function getParamFromUrl(param: string) {
  const { search } = window.location;
  const params = new URLSearchParams(search);
  return params.get(param) || "";
}

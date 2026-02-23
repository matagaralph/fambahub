export default defineEventHandler((event) => {
  if (import.meta.dev) return;

  const proto = getRequestHeader(event, "x-forwarded-proto");
  const url = getRequestURL(event);

  if (proto === "http" || url.hostname.startsWith("www.")) {
    url.protocol = "https:";
    url.hostname = url.hostname.replace(/^www\./, "");

    return sendRedirect(event, url.toString(), 301);
  }

  setResponseHeader(
    event,
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
  );
});

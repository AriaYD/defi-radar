import fs from "node:fs";

const report = fs.readFileSync("report.md", "utf8").trim();

const now = new Date();
const iso = now.toISOString();
const pubDate = now.toUTCString();

const title = process.env.RSS_TITLE || "DeFi Daily News";
const description =
  process.env.RSS_DESCRIPTION || "Automated daily DeFi market report";
const siteLink = process.env.RSS_LINK || "https://github.com/AriaYD/defi-radar";
const selfLink =
  process.env.RSS_SELF_LINK || "https://raw.githubusercontent.com/AriaYD/defi-radar/main/docs/rss.xml";

const itemTitle = `DeFi Daily Report - ${iso.slice(0, 10)}`;
const itemLink = siteLink;
const itemGuid = `${siteLink}#${iso.slice(0, 10)}`;

function escapeXml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(siteLink)}</link>
    <description>${escapeXml(description)}</description>
    <language>en-us</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <atom:link href="${escapeXml(selfLink)}" rel="self" type="application/rss+xml" />
    <item>
      <title>${escapeXml(itemTitle)}</title>
      <link>${escapeXml(itemLink)}</link>
      <guid>${escapeXml(itemGuid)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[<pre>${report}</pre>]]></description>
    </item>
  </channel>
</rss>
`;

fs.writeFileSync("rss.xml", xml);
console.log("rss.xml generated");

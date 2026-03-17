import fs from "node:fs";

const RSS_FILE = "docs/rss.xml";
const MAX_ITEMS = 30;

const report = fs.readFileSync("report.md", "utf8");

const now = new Date();
const pubDate = now.toUTCString();
const iso = now.toISOString().slice(0, 10);

const title = process.env.RSS_TITLE || "DeFi Daily News";
const description =
  process.env.RSS_DESCRIPTION || "Automated DeFi market report";
const siteLink =
  process.env.RSS_LINK || "https://github.com/AriaYD/defi-radar";
const selfLink =
  process.env.RSS_SELF_LINK ||
  "https://raw.githubusercontent.com/AriaYD/defi-radar/main/docs/rss.xml";

function esc(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

let items = [];

if (fs.existsSync(RSS_FILE)) {
  const xml = fs.readFileSync(RSS_FILE, "utf8");
  const matches = xml.match(/<item>[\s\S]*?<\/item>/g);
  if (matches) items = matches;
}

const newItem = `
<item>
<title>DeFi Daily Report ${iso}</title>
<link>${esc(siteLink)}</link>
<guid>${esc(siteLink)}#${iso}</guid>
<pubDate>${pubDate}</pubDate>
<description><![CDATA[
<pre>${report}</pre>
]]></description>
</item>
`;

items.unshift(newItem);
items = items.slice(0, MAX_ITEMS);

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>

<title>${esc(title)}</title>
<link>${esc(siteLink)}</link>
<description>${esc(description)}</description>
<lastBuildDate>${pubDate}</lastBuildDate>

${items.join("\n")}

</channel>
</rss>
`;

fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync(RSS_FILE, rss);

console.log("RSS updated");

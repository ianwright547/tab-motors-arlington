<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>TAB Motors Arlington — Sitemap</title>
        <style>
          :root { --ink:#0a0a0a; --ink2:#171717; --line:#e4e4e4; --mut:#6e6e6e; --brand:#d01f26; --bg:#f7f7f7; }
          * { box-sizing:border-box; }
          body { margin:0; background:var(--bg); color:#171717;
            font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
            line-height:1.5; }
          header { background:var(--ink); color:#fff; padding:28px 24px; border-bottom:4px solid var(--brand); }
          header .wrap, main { max-width:1000px; margin:0 auto; }
          h1 { margin:0; font-size:20px; letter-spacing:-0.01em; text-transform:uppercase; font-weight:800; }
          h1 b { color:var(--brand); }
          header p { margin:6px 0 0; color:#bdbdbd; font-size:13px; }
          main { padding:24px; }
          .count { font-size:13px; color:var(--mut); margin:0 0 14px; }
          table { width:100%; border-collapse:collapse; background:#fff; border:1px solid var(--line); border-radius:10px; overflow:hidden; }
          th { text-align:left; font-size:11px; text-transform:uppercase; letter-spacing:0.08em; color:var(--mut);
            background:#fafafa; padding:11px 14px; border-bottom:1px solid var(--line); }
          td { padding:11px 14px; border-bottom:1px solid var(--line); font-size:14px; vertical-align:middle; }
          tr:last-child td { border-bottom:0; }
          tr:hover td { background:#fcfcfc; }
          td a { color:var(--brand); text-decoration:none; word-break:break-all; }
          td a:hover { text-decoration:underline; }
          .num { color:var(--mut); font-variant-numeric:tabular-nums; white-space:nowrap; }
          .bar { display:inline-block; height:6px; border-radius:3px; background:var(--brand); vertical-align:middle; margin-right:8px; }
          @media (max-width:640px){ .hide-sm{ display:none; } td,th{ padding:10px; } }
        </style>
      </head>
      <body>
        <header>
          <div class="wrap">
            <h1>TAB <b>MOTORS</b> Arlington — Sitemap</h1>
            <p>All pages on tabmotorsarlington.com. This XML feed is for search engines; the table below is the readable version.</p>
          </div>
        </header>
        <main>
          <p class="count"><xsl:value-of select="count(s:urlset/s:url)"/> URLs</p>
          <table>
            <tr>
              <th>URL</th>
              <th class="hide-sm">Priority</th>
              <th class="hide-sm">Change frequency</th>
              <th class="hide-sm">Last modified</th>
            </tr>
            <xsl:for-each select="s:urlset/s:url">
              <tr>
                <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                <td class="num hide-sm">
                  <span class="bar"><xsl:attribute name="style">width:<xsl:value-of select="s:priority * 44"/>px</xsl:attribute></span>
                  <xsl:value-of select="s:priority"/>
                </td>
                <td class="num hide-sm"><xsl:value-of select="s:changefreq"/></td>
                <td class="num hide-sm"><xsl:value-of select="substring(s:lastmod,1,10)"/></td>
              </tr>
            </xsl:for-each>
          </table>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

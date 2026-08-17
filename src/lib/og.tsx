import { ImageResponse } from "next/og";
import { site } from "./site";

/**
 * Shared renderer for the social share images (Open Graph).
 *
 * This is what appears when the link is texted, posted in a neighbourhood
 * group, or shared on Facebook — which for a local repair shop is most of how
 * word of mouth actually travels. Without one, the link renders as a grey box.
 *
 * Satori (the engine behind ImageResponse) supports a subset of CSS — flexbox
 * only, no grid, and every element with multiple children needs an explicit
 * display: flex. It also ignores fontWeight unless a font file for that weight
 * has been supplied, which is why we fetch one below.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Fetches Barlow Condensed 700 — the site's display face — so the share image
 * matches the site instead of falling back to a generic sans.
 *
 * Two things to know:
 *   - Satori can't read woff2, so we spoof an old User-Agent to make Google
 *     Fonts hand back a TrueType file instead.
 *   - Any failure returns null and the image renders in the default font. A
 *     network hiccup should downgrade the typography, never break the build.
 *
 * Cached per process, so a build generating 15 images fetches once.
 */
let fontPromise: Promise<ArrayBuffer | null> | undefined;

function loadDisplayFont(): Promise<ArrayBuffer | null> {
  fontPromise ??= (async () => {
    try {
      const cssResponse = await fetch(
        "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700",
        { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1)" } },
      );
      if (!cssResponse.ok) return null;

      const css = await cssResponse.text();
      const fontUrl = css.match(/src:\s*url\((https:\/\/[^)]+)\)/)?.[1];
      if (!fontUrl) return null;

      const fontResponse = await fetch(fontUrl);
      if (!fontResponse.ok) return null;

      return await fontResponse.arrayBuffer();
    } catch {
      return null;
    }
  })();

  return fontPromise;
}

const INK = "#0f0f0f";
const INK_SOFT = "#949494";
const INK_TEXT = "#dcdcdc";
const BRAND = "#e5303a";

export async function renderOgImage({
  eyebrow,
  title,
}: {
  /** Small label above the title, e.g. "Service". Omit on the home page. */
  eyebrow?: string;
  title: string;
}) {
  const displayFont = await loadDisplayFont();

  // Condensed type is much narrower, so it can carry a larger size and the
  // uppercase treatment the site uses. The fallback font can't.
  const headlineSize = displayFont
    ? title.length > 46
      ? 88
      : 104
    : title.length > 46
      ? 62
      : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: INK,
          padding: "68px 72px 0 72px",
          position: "relative",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 12,
              height: 74,
              backgroundColor: BRAND,
              borderRadius: 6,
              display: "flex",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 22 }}>
            <div
              style={{
                display: "flex",
                fontFamily: displayFont ? "Display" : undefined,
                fontSize: displayFont ? 58 : 48,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              TAB MOTORS
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 19,
                fontWeight: 700,
                color: INK_SOFT,
                letterSpacing: "0.22em",
                marginTop: 8,
              }}
            >
              ARLINGTON, VA
            </div>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            paddingBottom: 24,
          }}
        >
          {eyebrow && (
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 700,
                color: BRAND,
                letterSpacing: "0.16em",
                marginBottom: 20,
              }}
            >
              {eyebrow.toUpperCase()}
            </div>
          )}
          <div
            style={{
              display: "flex",
              fontFamily: displayFont ? "Display" : undefined,
              fontSize: headlineSize,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
              maxWidth: 1010,
            }}
          >
            {displayFont ? title.toUpperCase() : title}
          </div>
        </div>

        {/* Trust row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingBottom: 52,
            fontSize: 26,
            color: INK_TEXT,
          }}
        >
          <div style={{ display: "flex", fontWeight: 700 }}>AAA Approved</div>
          <div style={{ display: "flex", color: BRAND, margin: "0 16px" }}>·</div>
          <div style={{ display: "flex" }}>Official VA inspection station</div>
          <div style={{ display: "flex", color: BRAND, margin: "0 16px" }}>·</div>
          <div style={{ display: "flex", fontWeight: 700 }}>{site.phone.display}</div>
        </div>

        {/* Brand band along the bottom edge */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 14,
            backgroundColor: BRAND,
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: displayFont
        ? [{ name: "Display", data: displayFont, weight: 700 as const, style: "normal" as const }]
        : undefined,
    },
  );
}

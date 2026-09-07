import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Social share card. Deliberately typographic and limited to facts already on
 * the site — name, role, domain. No claims, statistics, or imagery beyond that.
 */
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "2px",
              backgroundColor: "#000000",
            }}
          />
          <div
            style={{
              fontSize: "24px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#000000",
              fontWeight: 600,
            }}
          >
            {site.role}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "104px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#000000",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "38px",
              lineHeight: 1.3,
              color: "#52525b",
              maxWidth: "900px",
            }}
          >
            Independent digital marketing — websites, advertising, and lead
            generation.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #e6e6e7",
            paddingTop: "32px",
            fontSize: "26px",
            color: "#000000",
          }}
        >
          <div style={{ display: "flex" }}>
            {site.url.replace("https://", "")}
          </div>
          <div style={{ display: "flex", color: "#52525b" }}>{site.email}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

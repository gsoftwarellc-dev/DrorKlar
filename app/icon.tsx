import { ImageResponse } from "next/og";

/**
 * Browser-tab mark: a "DK" monogram in the site's black/white palette.
 * Solid black ground so it stays legible against light and dark tab bars.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          color: "#ffffff",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          fontFamily: "sans-serif",
          borderRadius: 6,
        }}
      >
        DK
      </div>
    ),
    { ...size },
  );
}

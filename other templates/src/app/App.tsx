import { useState } from "react";
import StoriesTheCultureOfDiversity from "../imports/StoriesTheCultureOfDiversity/index";
import StoriesTheCultureInABladeOfGrass from "../imports/StoriesTheCultureInABladeOfGrass/index";
import StoriesMalnadTimes from "../imports/StoriesMalnadTimes/index";

export default function App() {
  const [page, setPage] = useState<"template1" | "template2" | "template3">("template3");

  return (
    <div style={{ background: "#fff" }}>
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        display: "flex",
        gap: 12,
        padding: "8px 16px",
        background: "rgba(255,255,255,0.9)",
        borderBottom: "1px solid #eee",
        fontSize: 12,
        fontFamily: "sans-serif",
      }}>
        <button
          onClick={() => setPage("template1")}
          style={{ fontWeight: page === "template1" ? 700 : 400, cursor: "pointer", background: "none", border: "none", textTransform: "uppercase", letterSpacing: 1 }}
        >
          Template 1
        </button>
        <button
          onClick={() => setPage("template2")}
          style={{ fontWeight: page === "template2" ? 700 : 400, cursor: "pointer", background: "none", border: "none", textTransform: "uppercase", letterSpacing: 1 }}
        >
          Template 2
        </button>
        <button
          onClick={() => setPage("template3")}
          style={{ fontWeight: page === "template3" ? 700 : 400, cursor: "pointer", background: "none", border: "none", textTransform: "uppercase", letterSpacing: 1 }}
        >
          Template 3
        </button>
      </div>
      <div style={{ paddingTop: 33, overflowX: "auto" }}>
        <div style={{ position: "relative", width: 1504, height: 9200 }}>
          {page === "template1" && <StoriesTheCultureOfDiversity />}
          {page === "template2" && <StoriesTheCultureInABladeOfGrass />}
          {page === "template3" && <StoriesMalnadTimes />}
        </div>
      </div>
    </div>
  );
}

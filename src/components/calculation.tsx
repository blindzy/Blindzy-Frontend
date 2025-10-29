import React, { useMemo, useState } from "react";

type RowData = { drop: number; prices: number[] };

const ShutterPriceTable: React.FC = () => {
  const [startWidth, setStartWidth] = useState(600);
  const [startHeight, setStartHeight] = useState(1200);
  const [maxWidth, setMaxWidth] = useState(3000);
  const [maxHeight, setMaxHeight] = useState(3000);
  const [step, setStep] = useState(200);
  const [base, setBase] = useState(450);

  // helper: generate range with step but also ensure final 'max' is included
  const generateRangeInclusive = (start: number, max: number, step: number) => {
    const arr: number[] = [];
    if (step <= 0) {
      arr.push(max);
      return arr;
    }
    for (let v = start; v <= max; v += step) {
      arr.push(v);
      // safety: prevent infinite loop due to floating precision
      if (arr.length > 10000) break;
    }
    const last = arr[arr.length - 1];
    if (last !== max) arr.push(max); // ensure max always present
    return arr;
  };

  const widths = useMemo(() => generateRangeInclusive(startWidth, maxWidth, step), [startWidth, maxWidth, step]);
  const drops = useMemo(() => generateRangeInclusive(startHeight, maxHeight, step), [startHeight, maxHeight, step]);

  const rows = useMemo<RowData[]>(() => {
    const result: RowData[] = [];

    drops.forEach((drop, rIdx) => {
      const r = rIdx + 1; // 1-based row index
      const rowStart = base + (r - 1) * 100; // price at first column of this row

      const prices: number[] = widths.map((_, cIdx) => {
        const c = cIdx + 1; // 1-based column index
        if (c <= r) {
          return rowStart;
        } else {
          return rowStart + (c - r) * 100;
        }
      });

      result.push({ drop, prices });
    });

    return result;
  }, [widths, drops, base]);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h3>Plantation Shutters pricelist</h3>

      {/* Inputs */}
      <div style={{ marginBottom: 20, display: "grid", gap: 8, maxWidth: 520 }}>
        <label>
          Start Width (mm):
          <input type="number" value={startWidth}  className="w-[300px] border border-[--black] p-1" onChange={(e) => setStartWidth(+e.target.value)} />
        </label>
        <label>
          Start Height (mm):
          <input type="number" value={startHeight}  className="w-[300px] border border-[--black] p-1" onChange={(e) => setStartHeight(+e.target.value)} />
        </label>
        <label>
          Max Width (mm):
          <input type="number" value={maxWidth}  className="w-[300px] border border-[--black] p-1" onChange={(e) => setMaxWidth(+e.target.value)} />
        </label>
        <label>
          Max Height (mm):
          <input type="number" value={maxHeight}  className="w-[300px] border border-[--black] p-1" onChange={(e) => setMaxHeight(+e.target.value)} />
        </label>
        <label>
          Step (mm):
          <input type="number" value={step}  className="w-[300px] border border-[--black] p-1" onChange={(e) => setStep(+e.target.value)} />
        </label>
        <label>
          Base Price (₨):
          <input type="number" value={base}  className="w-[300px] border border-[--black] p-1" onChange={(e) => setBase(+e.target.value)} />
        </label>
      </div>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ background: "#f4b000" }}>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>DROP ↓ / WIDTH →</th>
            {widths.map((w) => (
              <th key={w} style={{ padding: 8, border: "1px solid #ddd" }}>{w}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.drop}>
              <td style={{ background: "#f4b000", padding: 8, border: "1px solid #ddd", fontWeight: 700 }}>
                {row.drop}
              </td>
              {row.prices.map((p, i) => (
                <td key={i} style={{ padding: 8, border: "1px solid #eee", textAlign: "center" }}>
                  {p}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShutterPriceTable;

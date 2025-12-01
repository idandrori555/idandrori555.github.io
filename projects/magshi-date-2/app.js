// app.ts
var SHEET_ID = "1UjhMvzF2To_7NFB3FRVh5zU4mGPa7Uu4W84Oz5x0P2g";
var FETCH_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
function buildDateMap(blocks) {
  const map = {};
  for (const block of blocks) {
    for (const lesson of block) {
      if (lesson.date) {
        map[lesson.date] = lesson;
      }
    }
  }
  return map;
}
function parseSchedule(raw) {
  const rows = raw
    .trim()
    .split(
      `
`,
    )
    .map((line) =>
      line
        .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
        .map((col) => col.replace(/^"|"$/g, "").trim()),
    );
  const blocks = [];
  for (let i = 0; i < rows.length; i += 3) {
    const titles = rows[i] || [];
    const dates = rows[i + 1] || [];
    const formats = rows[i + 2] || [];
    const block = [];
    for (let col = 0; col < titles.length; col++) {
      block.push({
        title: titles[col] || "",
        date: dates[col] || "",
        format: formats[col] || "",
      });
    }
    blocks.push(block);
  }
  return blocks;
}

var data = await (await fetch(FETCH_URL)).text();
var blocks = parseSchedule(data);
var dateMap = buildDateMap(blocks);
export { buildDateMap };

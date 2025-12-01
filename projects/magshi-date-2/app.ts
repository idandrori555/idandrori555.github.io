const SHEET_ID = "1UjhMvzF2To_7NFB3FRVh5zU4mGPa7Uu4W84Oz5x0P2g";
const FETCH_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

type Lesson = {
  title: string;
  date: string;
  format: string;
};

export function buildDateMap(blocks: Lesson[][]) {
  const map: Record<string, Lesson> = {};

  for (const block of blocks) {
    for (const lesson of block) {
      if (lesson.date) {
        map[lesson.date] = lesson;
      }
    }
  }

  return map;
}

function parseSchedule(raw: string) {
  // turn CSV-like string into rows of columns
  const rows = raw
    .trim()
    .split("\n")
    .map((line) =>
      line
        // split by commas that are not inside quotes
        .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
        .map((col) => col.replace(/^"|"$/g, "").trim()),
    );

  const blocks: Array<Array<Lesson>> = [];

  // process each 3-line group
  for (let i = 0; i < rows.length; i += 3) {
    const titles = rows[i] || [];
    const dates = rows[i + 1] || [];
    const formats = rows[i + 2] || [];

    const block: Array<Lesson> = [];

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

const data = await (await fetch(FETCH_URL)).text();
const blocks = parseSchedule(data);
const dateMap = buildDateMap(blocks);

const lookUpDate = (date: string) => {
  const lesson = dateMap[date];

  if (lesson) {
    return `${lesson.date} - ${lesson.title} (${lesson.format})`;
  }

  return "";
};

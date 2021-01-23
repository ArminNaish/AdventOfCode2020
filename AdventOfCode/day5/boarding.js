export function findSeat(value = "") {
  if (!value.length == 10) {
    throw Error("Value must be exactly 10 characters long.");
  }
  const row = findRow(value.slice(0, 7));
  const col = findColumn(value.slice(7, 10));
  return { row, col, id: row * 8 + col };
}

function findRow(value) {
  let rows = [...Array(128).keys()];
  let pos = 0;
  while (rows.length > 1) {
    const char = value.charAt(pos);
    if (char === "F") {
      // take lower half
      rows = rows.slice(0, rows.length / 2);
    } else if (char === "B") {
      // taker upper half
      rows = rows.slice(rows.length / 2);
    } else {
      throw Error("Row characters must be either F or B.");
    }
    pos += 1;
  }
  return rows[0];
}

function findColumn(value) {
  let cols = [...Array(8).keys()];
  let pos = 0;
  while (cols.length > 1) {
    const char = value.charAt(pos);
    if (char === "L") {
      // take lower half
      cols = cols.slice(0, cols.length / 2);
    } else if (char === "R") {
      // taker upper half
      cols = cols.slice(cols.length / 2);
    } else {
      throw Error("Column characters must be either F or B.");
    }
    pos += 1;
  }
  return cols[0];
}

const text = await Deno.readTextFile("./input.txt");
var lines = text.split(/\r\n|\n\r|\n|\r/);
var seats = lines.map((line) => {
  const seat = findSeat(line);
  return seat;
});

// todo: use forEach

seats.sort((a, b) => {
  const value = a.row - b.row;
  if (value !== 0) {
    return value;
  }
  return a.col - b.col;
});

// seats.forEach((s) => {
//   console.log(`row: ${s.row}, col: ${s.col}, id: ${s.id}`);
// });

const totalRows = 128;
const totalCols = 8;

for (let i = 0; i < totalRows; i++) {
  const rows = seats.filter((s) => s.row === i);
  if (!rows.length) continue;
  if (rows.length === 8) continue;
  console.log(`row: ${i}`);
  console.log(rows.map((r) => r.col));
  console.log(rows.map((r) => r.id));

  //console.log(`row: ${s?.row || "missing record"}`);
}

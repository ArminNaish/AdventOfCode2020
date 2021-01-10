export function findSeat(value = "") {
  if (!value.length == 10) {
    throw new Error("Value must be exactly 10 characters long.");
  }
  const row = findRow(value.slice(0, 7));
  const col = findColumn(value.slice(7, 10));
  return [row, col, row * 8 + col];
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
      throw new Error("Row characters must be either F or B.");
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
        throw new Error("Column characters must be either F or B.");
      }
      pos += 1;
    }
    return cols[0];
}

const text = await Deno.readTextFile("./input.txt");
var lines = text.split(/\r\n|\n\r|\n|\r/);
var seatIds = lines.map(l => {
    const [row,col, id] = findSeat(l);
    return id;
});
const maxId = Math.max(...seatIds);
console.log(`What is the highest seat ID on a boarding pass? ${maxId}`);

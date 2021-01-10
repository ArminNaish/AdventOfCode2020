import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";
import { findSeat } from './boarding.js';

Deno.test("first seat", () => {
  const [row, col, id] = findSeat("BFFFBBFRRR");
  assertEquals(row, 70);
  assertEquals(col, 7);
  assertEquals(id, 567);
});

Deno.test("second seat", () => {
  const [row, col, id] = findSeat("FFFBBBFRRR");
  assertEquals(row, 14);
  assertEquals(col, 7);
  assertEquals(id, 119);
});

Deno.test("third seat", () => {
  const [row, col, id] = findSeat("BBFFBBFRLL");
  assertEquals(row, 102);
  assertEquals(col, 4);
  assertEquals(id, 820);
});

using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;
using static AdventOfCode.Day3;

namespace AdventOfCode.Tests
{
    public class Day3Tests
    {
        [Theory]
        [InlineData(2, 1, 1)]
        [InlineData(7, 3, 1)]
        [InlineData(3, 5, 1)]
        [InlineData(4, 7, 1)]
        [InlineData(2, 1, 2)]
        public void TestFindRoute(int expected, int right, int down)
        {
            var input = string.Join(
                Environment.NewLine,
                "..##.......",
                "#...#...#..",
                ".#....#..#.",
                "..#.#...#.#",
                ".#...##..#.",
                "..#.##.....",
                ".#.#.#....#",
                ".#........#",
                "#.##...#...",
                "#...##....#",
                ".#..#...#.#"
            );

            var actual = FindRoute(input, right, down).Count(c => c == 'X');

            Assert.Equal(expected, actual);
        }
    }
}
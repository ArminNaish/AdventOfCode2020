using System;
using System.Collections.Generic;
using System.Linq;

namespace AdventOfCode
{
    public class Day3
    {
        public static IEnumerable<char> FindRoute(string input, int right = 3, int down = 1)
        {
            var lines = input.Split(Environment.NewLine);

            var map = new char[lines.Length][];
            for (var i = 0; i < lines.Length; i++)
                for (var j = 0; j < lines[0].Length; j++)
                    map[i] = lines[i].ToArray();

            var row = down;
            var col = right;
            for (var i = 0; i < map.Length; i++)
            {
                for (var j = 0; j < map[0].Length; j++)
                {
                    if (i == row && j == col)
                    {
                        yield return map[i][j] == '#' ? 'X' : 'O';

                        row += down;
                        if (col + right > lines[0].Length - 1)
                            col = col - lines[0].Length + right;
                        else
                            col += right;
                    }
                }
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;
using static AdventOfCode.Day1;

namespace AdventOfCode.Tests
{
    public class Day1Tests
    {
        [Fact]
        public void TestPermutationsOfLength2()
        {
            var expenses = new long[]{1721, 979, 366, 299, 675, 1456};
            
            var actual = Permutations
                .Of(expenses, 2)
                .FindProductsBySum(2020)
                .FirstOrDefault();

            Assert.Equal(514579, actual);
        }
        
        [Fact]
        public void TestPermutationsOfLength3()
        {
            var expenses = new long[]{1721, 979, 366, 299, 675, 1456};

            var actual = Permutations
                .Of(expenses, 3)
                .FindProductsBySum(2020)
                .FirstOrDefault();

            Assert.Equal(241861950, actual);
        }
    }

}
using Xunit;
using static AdventOfCode.Day2;

namespace AdventOfCode.Tests
{
    public class Day2Tests
    {
        [Theory]
        [InlineData("1-3 a: abcde")]
        [InlineData("1-3 b: cdefg")]
        [InlineData("2-9 c: ccccccccc")]
        public void TestPolicy(string password)
        {
            var actual = VerifyPassword(password);

            Assert.True(actual);
        }

        [Theory]
        [InlineData(true, "1-3 a: abcde")]// is valid: position 1 contains a and position 3 does not.
        [InlineData(false, "1-3 b: cdefg")] // is invalid: neither position 1 nor position 3 contains b.
        [InlineData(false, "2-9 c: ccccccccc")] // is invalid: both position 2 and position 9 contain c.
        public void TestPolicy2(bool expected, string password)
        {
            var actual = VerifyPassword2(password);
            Assert.Equal(expected, actual);
        }
    }
}
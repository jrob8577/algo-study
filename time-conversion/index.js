const isPM = input => input.charAt(8) === 'P'

const timeConversion = input => {
  const hour = parseInt(input.substring(0, 2));
  const remainder = input.substring(2, 8);

  if (hour === 12 && isPM(input)) {
    return '12' + remainder;
  } else if (hour === 12 && !isPM(input)) {
    return '00' + remainder;
  } else if (isPM(input)) {
    return (hour + 12) + remainder;
  } else {
    return (hour < 10 ? '0' + hour : hour) + remainder;
  }
}

const test = () => {
  const cases = [
    { input: "12:00:00AM", output: "00:00:00" },
    { input: "12:01:12AM", output: "00:01:12" },
    { input: "01:05:35AM", output: "01:05:35" },
    { input: "12:00:00PM", output: "12:00:00" },
    { input: "01:05:35PM", output: "13:05:35" },
  ]

  cases.forEach(({ input, output }) => {
    console.log(`${input} => ${output} ? ${output === timeConversion(input)}`)
  })

  for (let index = 0; index < cases.length; index++) {
    const { input, output } = cases[index];

    console.log(
      input + " => " + output + " ? " +
      output === timeConversion(input)
    );
  }
}

test();
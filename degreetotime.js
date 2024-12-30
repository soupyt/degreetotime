/*
 *  Node.js script to convert clock with 360 graduations to conventional time
 *
 */

// Validate the input
function validateInput(hourValue, minuteValue) {
  if (hourValue < 0 || hourValue >= 360 || minuteValue < 0 || minuteValue >= 360) {
    throw new Error("Hour and minute values must be within 0-359.");
  }
}

// Function to convert degrees into time
function convToTime(hourDeg, minuteDeg) {
  validateInput(hourDeg, minuteDeg);

  // Convert minute degree into minutes
  const minutes = Math.round((minuteDeg / 360) * 60);

  // Convert hour degree into hours and account for fractional part
  const wholeHour = (hourDeg / 360) * 12;
  const hours = Math.floor(wholeHour); // Take the integer part for the hour
  const fractionalMinutesFromHour = Math.round((wholeHour - hours) * 60);

  // Combine minutes from hour hand and minute hand
  const totalMinutes = minutes + fractionalMinutesFromHour;

  // Adjust hours and minutes if total minutes exceed 60
  const finalHours = (hours + Math.floor(totalMinutes / 60)) % 12 || 12; // 12-hour format
  const finalMinutes = totalMinutes % 60;

  return {
    hours: finalHours,
    minutes: finalMinutes,
  };
}

// Main logic
function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error("Usage: node degreetotime.js <hourDegree> <minuteDegree>");
    process.exit(1);
  }

  const hourDeg = parseFloat(args[0]);
  const minuteDeg = parseFloat(args[1]);

  try {
    const { hours, minutes } = convToTime(hourDeg, minuteDeg);
    console.log(`${hours}:${minutes.toString().padStart(2, "0")}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

main();

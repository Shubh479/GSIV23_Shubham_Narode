import moment from "moment";

export function convertMinutesToHHMM(minutes) {
  const duration = moment.duration(minutes, "minutes");
  const hours = Math.floor(duration.asHours());
  const mins = duration.minutes();

  return `${hours.toString().padStart(2, "0")}h:${mins
    .toString()
    .padStart(2, "0")}m`;
}

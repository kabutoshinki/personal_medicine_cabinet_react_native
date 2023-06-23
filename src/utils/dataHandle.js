import { View, Text } from "react-native";

export const handleUnit = (itemMedicine) => {
  if (itemMedicine?.medicineForm == "PILL") {
    return "pills";
  } else if (itemMedicine?.medicineForm == "POWDER") {
    return "mg";
  } else if (itemMedicine?.medicineForm == "INHALER") {
    return "puffs";
  } else if (itemMedicine?.medicineForm == "DROPS") {
    return "drops";
  } else {
    return "ml";
  }
};

export const handleTime = (item) => {
  const times = [];

  if (item?.firstTime) {
    times.push({ id: "1", time: item?.firstTime.substring(0, 5) });
  }

  if (item?.secondTime) {
    times.push({ id: "2", time: item?.secondTime.substring(0, 5) });
  }

  if (item?.thirdTime) {
    times.push({ id: "3", time: item?.thirdTime.substring(0, 5) });
  }

  if (item?.fourthTime) {
    times.push({ id: "4", time: item?.fourthTime.substring(0, 5) });
  }

  return times;
};

export const changeDateFormat = (dateString) => {
  const dateParts = dateString.split("/");
  const day = dateParts[0];
  const month = dateParts[1];
  const year = dateParts[2];

  const date = new Date(year, month - 1, day);
  const formattedYear = date.getFullYear();
  const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
  const formattedDay = String(date.getDate()).padStart(2, "0");

  // Format the date as "yyyy-MM-dd"
  const formattedDate = `${formattedYear}-${formattedMonth}-${formattedDay}`;
  // console.log(formattedDate);
  return formattedDate;
};

export const convertTimeArrayToString = (timeArray) => {
  const timeProperties = ["firstTime", "secondTime", "thirdTime", "fourthTime"];
  const convertedTimes = {};

  timeProperties.forEach((property, index) => {
    if (index < timeArray.length) {
      const timeObject = timeArray[index];
      const time = timeObject.time || ""; // Handle undefined time values
      if (time !== "") {
        convertedTimes[property] = time;
      }
    }
  });

  return convertedTimes;
};

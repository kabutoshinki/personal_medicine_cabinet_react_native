export default fakeData = [
  {
    key: "1",
    name: "abc",
    imageURI: "https://media1.giphy.com/media/TKT5dg6LzRx9HwKnH8/giphy.gif",
    id: "1A",
    quantity: "1",
    dose: "1",
    note: "Before Meals",
    time: "2.56",
  },
  {
    key: "2",
    name: "azd",
    imageURI:
      "https://media1.giphy.com/media/JJI0QMvSuLaT3f5cEJ/200w.gif?cid=6c09b952czwybw16w2jogpdnikejz7qkvnhyg8dq7a69rj0x&ep=v1_gifs_search&rid=200w.gif&ct=g",
    id: "6A",
    quantity: "1",
    dose: "1",
    note: "Every Other Day",
    time: "2.56",
  },
  {
    key: "3",
    name: "azd",
    imageURI: "https://i.gifer.com/7U06.gif",
    id: "6A",
    quantity: "1",
    dose: "1",
    note: "Every Other Day",
    time: "2.56",
  },
  {
    key: "4",
    name: "azd",
    imageURI: "https://media.tenor.com/kMm8cnP5GN0AAAAM/capsules-pills.gif",
    id: "6A",
    quantity: "1",
    dose: "1",
    note: "Every Other Day",
    time: "2.56",
  },
];

export const medicineTimeDataFake = [
  {
    key: "1",
    id: "1",
    name: "abcd",
    imageURI: "https://media1.giphy.com/media/TKT5dg6LzRx9HwKnH8/giphy.gif",
    priority: "LOW",
    pill: [
      {
        key: "1",
        name: "abc",
        imageURI: "https://media1.giphy.com/media/TKT5dg6LzRx9HwKnH8/giphy.gif",
        id: "1A",
        quantity: "1",
        dose: "1",
        note: "Before Meals",
        time: "2.56",
      },
      {
        key: "20",
        name: "azd",
        imageURI:
          "https://media1.giphy.com/media/JJI0QMvSuLaT3f5cEJ/200w.gif?cid=6c09b952czwybw16w2jogpdnikejz7qkvnhyg8dq7a69rj0x&ep=v1_gifs_search&rid=200w.gif&ct=g",
        id: "7A",
        quantity: "1",
        dose: "1",
        note: "Every Other Day",
        time: "2.56",
      },
      {
        key: "30",
        name: "azd",
        imageURI: "https://i.gifer.com/7U06.gif",
        id: "6A",
        quantity: "1",
        dose: "1",
        note: "Every Other Day",
        time: "2.56",
      },
      {
        key: "40",
        name: "azd",
        imageURI: "https://media.tenor.com/kMm8cnP5GN0AAAAM/capsules-pills.gif",
        id: "8A",
        quantity: "1",
        dose: "1",
        note: "Every Other Day",
        time: "2.56",
      },
    ],
  },
  {
    key: "2",
    id: "10",
    name: "abcd",
    imageURI: "",
    priority: "LOW",
    pill: [
      {
        name: "abc",
        imageURI: "./assets/icons/add_medicine.png",
        id: "5A",
        quantity: "1",
        dose: "1",
        note: "Before Meals",
        time: "2.56",
      },

      {
        name: "abc",
        imageURI: "./assets/icons/add_medicine.png",
        id: "6A",
        quantity: "1",
        dose: "1",
        note: "Before Meals",
        time: "2.56",
      },
    ],
  },
  {
    key: "3",
    id: "9",
    name: "abcd",
    imageURI: "",
    priority: "LOW",
    pill: [
      {
        name: "abc",
        imageURI: "./assets/icons/add_medicine.png",
        id: "5A",
        quantity: "1",
        dose: "1",
        note: "Before Meals",
        time: "2.56",
      },

      {
        name: "abc",
        imageURI: "./assets/icons/add_medicine.png",
        id: "6A",
        quantity: "1",
        dose: "1",
        note: "Before Meals",
        time: "2.56",
      },
    ],
  },
  {
    key: "4",
    id: "8",
    name: "abcd",
    imageURI: "",
    priority: "LOW",
    pill: [
      {
        name: "abc",
        imageURI: "./assets/icons/add_medicine.png",
        id: "5A",
        quantity: "1",
        dose: "1",
        note: "Before Meals",
        time: "2.56",
      },

      {
        name: "abc",
        imageURI: "./assets/icons/add_medicine.png",
        id: "6A",
        quantity: "1",
        dose: "1",
        note: "Before Meals",
        time: "2.56",
      },
    ],
  },
  {
    key: "5",
    id: "7",
    name: "abcd",
    imageURI: "",
    priority: "LOW",
    pill: [
      {
        name: "abc",
        imageURI: "./assets/icons/add_medicine.png",
        id: "5A",
        quantity: "1",
        dose: "1",
        note: "Before Meals",
        time: "2.56",
      },

      {
        name: "abc",
        imageURI: "./assets/icons/add_medicine.png",
        id: "6A",
        quantity: "1",
        dose: "1",
        note: "Before Meals",
        time: "2.56",
      },
    ],
  },
];

export const options = [
  { label: "Before Eating", value: "Before Eating" },
  { label: "While Eating", value: "While Eating" },
  { label: "After Eating", value: "After Eating" },
  { label: "Doesn't Matter", value: "Doesn't Matter" },
];
export const durations = [
  { label: "Every Day", value: "Every Day" },
  { label: "One Time", value: "One Time" },
  { label: "One Week", value: "One Week" },
  { label: "Two Weeks", value: "Two Weeks" },
  { label: "One Month", value: "One Month" },
  { label: "Two Months", value: "Two Months" },
];
export const local_data = [
  {
    value: "PILL",
    label: "PILL",
    image: {
      uri: "https://cdn-icons-png.flaticon.com/512/975/975823.png",
    },
  },
  {
    value: "INJECTION",
    label: "INJECTION",
    image: {
      uri: "https://cdn-icons-png.flaticon.com/512/2947/2947768.png",
    },
  },
  {
    value: "LIQUID",
    label: "LIQUID",
    image: {
      uri: "https://cdn-icons-png.flaticon.com/512/392/392969.png",
    },
  },
  {
    value: "INHALER",
    label: "INHALER",
    image: {
      uri: "https://cdn-icons-png.flaticon.com/512/2932/2932763.png",
    },
  },
  {
    value: "DROPS5",
    label: "DROPS",
    image: {
      uri: "https://cdn-icons-png.flaticon.com/512/683/683399.png",
    },
  },
  {
    value: "POWDER",
    label: "POWDER",
    image: {
      uri: "https://cdn-icons-png.flaticon.com/512/2270/2270049.png",
    },
  },
];

export const prescriptionData = [
  {
    alarm: true,
    deviceToken: "",
    id: "ec3463f9-169d-4235-9ee1-23964a7f7138",
    imageURI: null,
    key: "aad95d44-9fae-482d-a8a4-6f291d901c33",
    name: "Fever",
    period: "1 DAY",
    pill: [
      {
        dose: "1",
        id: "01af5989-6180-44b5-9baf-934aa714bbce",
        imageURI: null,
        key: "3fdec321-f8e8-4ea2-a105-25e8bc2e7c44",
        name: "abc",
        note: "",
        time: [
          { id: 2, time: "05:39" },
          { id: 1, time: "17:39" },
        ],
        type: "PILL",
      },
    ],
    startDate: "08/06/2023",
    startNow: true,
  },
  {
    alarm: true,
    deviceToken: "",
    id: "ec3463f9-169d-4235-9ee1-23964a7f7139",
    imageURI: null,
    key: "aad95d44-9fae-482d-a8a4-6f291d901c34",
    name: "Cancer",
    period: "1 DAY",
    pill: [
      {
        dose: "1",
        id: "01af5989-6180-44b5-9baf-934aa714bbc8",
        imageURI: null,
        key: "3fdec321-f8e8-4ea2-a105-25e8bc2e7c45",
        name: "abcd",
        note: "",
        time: [
          { id: 2, time: "19:13" },
          { id: 1, time: "19:14" },
        ],
        type: "PILL",
      },
    ],
    startDate: "08/06/2023",
    startNow: true,
  },
];
// [
//   { id: 1, name: "a", pill: [{id:1,name:"a",time:[{id:1,time:"12:00"},{id:2,time:"13:00"}]}, {id:2,name:"b",time:[{id:1,time:"13:00"},{id:2,time:"14:00"}]}] },
//   { id: 2, name: "b", pill: [{id:1,name:"c",time:[{id:1,time:"15:00"},{id:2,time:"16:00"}]}, {id:2,name:"d",time:[{id:1,time:"17:00"},{id:2,time:"18:00"}]}] },
// ];

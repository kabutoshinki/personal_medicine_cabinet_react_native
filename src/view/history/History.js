import { View, Text, FlatList, SectionList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import * as historyService from "../../service/historyService";
import HeaderCustom from "../../components/HeaderCustom";
import color from "../../utils/color";

const testingData = [
  {
    historyId: 1,
    regimenName: "Fever",
    takenDate: "2023-06-23",
    timeTaken: "15:36:01",
    takenStatus: "TAKEN",
    totalMedicine: 1,
    numberOfTaken: 1,
  },
  {
    historyId: 2,
    regimenName: "Abc",
    takenDate: "2023-06-23",
    timeTaken: "15:36:01",
    takenStatus: "TAKEN",
    totalMedicine: 1,
    numberOfTaken: 1,
  },
  {
    historyId: 3,
    regimenName: "Abd",
    takenDate: "2023-06-24",
    timeTaken: "11:36:01",
    takenStatus: "TAKEN",
    totalMedicine: 1,
    numberOfTaken: 1,
  },
];
const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const HistoryApi = async () => {
    const { data } = await historyService?.getHistory();
    transformHistoryData(data);
  };
  useEffect(() => {
    HistoryApi();
  }, []);

  const transformHistoryData = (historyApiResponse) => {
    const transformedData = [];

    historyApiResponse.forEach((item) => {
      const { takenDate, regimenName, timeTaken } = item;
      const existingSection = transformedData.find((section) => section.title === takenDate);

      if (existingSection) {
        existingSection.data.push({
          id: item?.historyId,
          name: regimenName,
          timeTaken: timeTaken,
          takenStatus: item?.takenStatus,
          totalMedicine: item?.totalMedicine,
          numberOfTaken: item?.numberOfTaken,
        });
      } else {
        transformedData.push({
          title: takenDate,
          data: [
            {
              id: item.historyId,
              name: regimenName,
              timeTaken: timeTaken,
              takenStatus: item?.takenStatus,
              totalMedicine: item?.totalMedicine,
              numberOfTaken: item?.numberOfTaken,
            },
          ],
        });
      }
    });

    setHistoryData(transformedData);
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity>
        <View className="w-[96%] bg-white p-3 my-2 mx-auto rounded-md border-gray-400 border-2 flex-row justify-between items-center">
          <Text className="font-bold">{item?.timeTaken}</Text>

          <Text className="font-bold text-lg" style={{ color: color.main_color }}>
            {item?.name}
          </Text>
          <Text className="font-bold" style={{ color: item?.takenStatus === "TAKEN" ? color.success : color.danger }}>
            {item?.takenStatus}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderHeader = ({ section }) => {
    return (
      <View className="bg-white items-center justify-center p-3 w-[50%] mx-auto my-2 rounded-md">
        <Text className="font-bold">{section.title}</Text>
      </View>
    );
  };
  return (
    <View className="flex-1">
      <HeaderCustom
        name={
          <View className="justify-center items-center">
            <Text className="text-center font-bold text-white text-xl">History</Text>
          </View>
        }
      />
      <SectionList
        sections={historyData}
        renderItem={renderItem}
        renderSectionHeader={renderHeader}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default History;

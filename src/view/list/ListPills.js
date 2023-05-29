import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import fakedata from "../../../fakedata";
import EditPillModal from "../../components/EditPillModal";
import Header from "../../components/Header";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { useRoute } from "@react-navigation/native";
import ItemComponent from "../../components/ItemComponent";
import FinishModal from "../../components/FinishModal";
const ListPills = ({ navigation }) => {
  const [pills, setPills] = useState(fakedata);
  const flatListRef = useRef(null);
  const [editingPill, setEditingPill] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [statePill, setStatePill] = useState("");
  const [finishVisible, setFinishVisible] = useState(false);
  const route = useRoute();
  const { pills: routePills } = route.params;
  useState(() => {
    if (routePills) {
      setPills(routePills);
    }
  }, []);

  const renderItem = ({ item }) => <ItemComponent item={item} onDelete={deletePill} onOption={optionPill} />;

  const deletePill = (id) => {
    setPills((prevPills) => {
      const updatedPills = prevPills.filter((pill) => pill.id !== id);
      return updatedPills;
    });
  };

  const optionPill = (item, state) => {
    setEditingPill(item);
    setModalVisible(true);
    setStatePill(state);
  };

  const handleSave = (updatedItem) => {
    setPills((prevPills) => prevPills.map((pill) => (pill.id === updatedItem.id ? updatedItem : pill)));
    setEditingPill(null);
    setModalVisible(false);
  };

  return (
    <View className="flex-1">
      <Header
        name={"ListPill"}
        // onPress_1={() => navigation.goBack()}
        // icon_1={<ArrowLeftIcon size="30" color="white" aria-hidden />}
        icon_2={<MagnifyingGlassIcon size="30" color="white" />}
      />
      <View className=" justify-center items-center flex-1 ">
        <Text className="text-xl font-bold text-center">List Pills</Text>
        {pills.length === 0 ? (
          <View className="bg-gray-300 w-[96%] flex-1 justify-center items-center ">
            <Text className="text-center font-bold">Empty Pill</Text>
          </View>
        ) : (
          <View className="bg-gray-300 flex-1 mt-5">
            <FlatList
              data={pills}
              ref={flatListRef}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              className="max-h-[490px]"
              contentContainerStyle={{ flexGrow: 1 }}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            ></FlatList>
          </View>
        )}
      </View>
      <View className="flex-[0.2] justify-center mx-auto w-[96%]">
        <TouchableOpacity>
          <Text className="py-3  mt-2 text-center bg-blue-400 " onPress={() => navigation.goBack()}>
            Add More
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="bg-green-300  py-3 mt-2 text-center" onPress={() => setFinishVisible(true)}>
            Finish
          </Text>
        </TouchableOpacity>
      </View>
      <View className="justify-center items-center">
        <EditPillModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          item={editingPill}
          state={statePill}
          onSave={handleSave}
        />
        <FinishModal
          visible={finishVisible}
          onCancel={() => setFinishVisible(false)}
          item={editingPill}
          pill={pills}
          onSave={handleSave}
        />
      </View>
    </View>
  );
};

export default ListPills;

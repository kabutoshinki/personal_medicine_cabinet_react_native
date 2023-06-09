import { View, Text, TouchableOpacity, Image, useWindowDimensions, Animated, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Card, Switch } from "react-native-paper";
import MedicineModal from "../../components/MedicineModal";
import { useNavigation } from "@react-navigation/native";
import { medicineTimeData, prescriptionData } from "../../../fakedata";
import { SwipeListView } from "react-native-swipe-list-view";
import HiddenItem from "../../components/HiddenItem";
import AlertCustom from "../../components/AlertCustom";
import { ExclamationTriangleIcon } from "react-native-heroicons/solid";
import color from "../../utils/color";
import ItemPrescription from "../../components/ItemPrescription";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const ListMedicines = ({ medicineData }) => {
  const [editMedicine, setEditMedicine] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [stateMedicine, setStateMedicine] = useState("");
  const [medicines, setMedicines] = useState(prescriptionData);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigation = useNavigation();
  const { width: screenWidth } = useWindowDimensions();
  const [key, setKey] = useState(null);
  const [getRowMap, setGetRowMap] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const toggleAlert = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const toggleAlertRef = useRef(null);
  toggleAlertRef.current = toggleAlert;
  useEffect(() => {
    if (medicineData) {
      setMedicines((prev) => [...prev, medicineData]); // Update 'medicine' state when 'medicines' prop changes
    }
  }, [medicineData]);

  useEffect(() => {
    scheduleNotifications();
  }, [medicines]);

  const onPressHandler = () => {
    navigation.navigate("PillReminder");
  };

  const optionMedicine = (item, state) => {
    setEditMedicine(item);
    setModalVisible(true);
  };

  const setRowMap = (rowMap) => {
    setGetRowMap(rowMap);
  };

  const deletePrescription = (id) => {
    setMedicines((prevPrescript) => {
      const updatedPills = prevPrescript.filter((prevPrescript) => prevPrescript.id !== id);
      return updatedPills;
    });
  };

  const handleSave = (updatedItem) => {
    setMedicines((prevMedicines) => {
      const updatedMedicines = prevMedicines.map((medicine) =>
        medicine.id === updatedItem.id ? updatedItem : medicine
      );
      return updatedMedicines;
    });
    setEditMedicine(updatedItem);
    setModalVisible(false);
  };
  const handleClose = (rowMap, rowKey) => {
    setVisible(false);
    rowMap[rowKey].closeRow();
  };

  const deleteRow = (rowKey) => {
    if (medicines) {
      const deletedMedicine = medicines.find((item) => item.key === rowKey);
      if (deletedMedicine) {
        const updatedMedicines = medicines.filter((item) => item.key !== rowKey);
        setMedicines(updatedMedicines);
      }
    }
  };
  handleDelete = (rowKey) => {
    deleteRow(rowKey);
    setVisible(false);
  };
  const changeStateIsOpenModal = (boolean) => {
    setIsOpenModal(boolean);
  };

  const renderItem = (data, rowMap) => {
    const { item } = data;

    const rowHeightAnimatedValue = new Animated.Value(90);
    return (
      <ItemPrescription
        item={item}
        rowMap={rowMap}
        removeRow={deleteRow}
        setRowMap={setRowMap}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onOption={optionMedicine}
        updateState={changeStateIsOpenModal}
      />
    );
  };
  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(110);
    const { item } = data;
    return (
      <HiddenItem
        item={item}
        rowMap={rowMap}
        onOption={optionMedicine}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        deleteRow={deleteRow}
      />
    );
  };
  const onRightActionStatusChange = () => {};

  const swipeGestureEnded = (rowKey, data) => {
    const rowHeightAnimatedValue = new Animated.Value(100);
    if (data.translateX < -220) {
      setTimeout(() => {
        setKey(rowKey);
        setVisible(true);
      }, 200);
      toggleAlertRef.current();
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {});
    }
  };
  //// Notification

  async function registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Failed to get push token for notifications!");
      return;
    }

    try {
      const deviceToken = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Device Token:", deviceToken);
      // You can save the device token in your state or send it to your server for further use
    } catch (error) {
      console.log("Error getting device token:", error);
    }
  }

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    registerForPushNotificationsAsync();
    scheduleNotifications();
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function scheduleNotifications() {
    const currentTime = new Date();

    prescriptionData.forEach((prescription) => {
      prescription.pill.forEach((pill) => {
        pill.time.forEach(({ id, time }) => {
          const [hour, minute] = time.split(":").map(Number);
          const notificationTime = new Date();
          notificationTime.setHours(hour);
          notificationTime.setMinutes(minute);
          notificationTime.setSeconds(0);
          notificationTime.setMilliseconds(0);

          if (notificationTime <= currentTime) {
            // If the notification time is in the past, add one day to the notification time
            notificationTime.setDate(notificationTime.getDate() + 1);
          }

          const delay = notificationTime.getTime() - currentTime.getTime();
          console.log("Setting alarm for:", notificationTime);

          setTimeout(() => {
            const uniqueId = id + "-" + Date.now(); // Append timestamp for uniqueness
            schedulePushNotification(uniqueId, time);
          }, delay);
        });
      });
    });
  }

  async function schedulePushNotification(id, time) {
    await Notifications.cancelScheduledNotificationAsync(id.toString());

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notification",
        body: `It's time for ${time}!`,
        data: { id },
      },
      trigger: null,
      sound: "default",
    });
  }

  return (
    <View>
      {medicines?.length > 0 ? (
        <View className="mt-1 justify-center items-center h-[600px]">
          <Text className="text-xl font-bold text-center mb-3">List Prescriptions</Text>
          <View className="w-full">
            <SwipeListView
              data={medicines}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              disableRightSwipe
              rightOpenValue={-150}
              stopRightSwipe={-300}
              rightActivationValue={-220}
              rightActionValue={-screenWidth}
              disableLeftSwipe={isOpenModal}
              onRightActionStatusChange={onRightActionStatusChange}
              swipeGestureEnded={swipeGestureEnded}
              swipeToOpenPercent={10}
              swipeToClosePercent={10}
              useNativeDriver={false}
            />
          </View>
          <TouchableOpacity className="bg-green-400 p-3" onPress={() => {}}>
            <Text>Notify</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex my-4 justify-center items-center mt-24">
          <View className="">
            <Image source={require("../../../assets/images/medicine.gif")} className="w-56 h-56 rounded-lg" />
          </View>
          <View className="mt-5 mx-12">
            <Text className="font-bold text-center text-xl mb-3">Welcome to PMC</Text>
            <Text className="text-center text-base mb-3">
              Add new medication, to help us manage your medicine cabinet.
            </Text>
          </View>
          <View className="items-center justify-center">
            <TouchableOpacity className="bg-[#4D9FEC] rounded-xl px-12 py-5" onPress={onPressHandler}>
              <Text className="text-2xl text-center items-center justify-center text-white">Add new medicine</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {visible ? (
        <AlertCustom
          onOpen={visible}
          onClose={() => handleClose(getRowMap, key)}
          icon={<ExclamationTriangleIcon size={30} color={"white"} />}
          color={color.danger}
          text={`This Medicine will be delete ?`}
          action={() => handleDelete(key)}
        />
      ) : null}

      {modalVisible && (
        <MedicineModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          item={editMedicine}
          state={stateMedicine}
          onSave={handleSave}
          onDelete={deletePrescription}
        />
      )}
    </View>
  );
};

export default ListMedicines;

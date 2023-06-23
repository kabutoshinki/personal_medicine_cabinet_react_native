import { View, Text, Modal, TouchableOpacity, Linking, AppState } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Card, RadioButton } from "react-native-paper";
import { Image } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import color from "../utils/color";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import * as paymentService from "../service/paymentService";
const PaymentModal = ({ onOpen, onCancel }) => {
  const [paymentPlan, setPaymentPlan] = useState([]);
  const PaymentPlan = async () => {
    try {
      const { data } = await paymentService?.getPaymentPlan();
      setPaymentPlan(data);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    PaymentPlan();

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "active") {
        // User has returned to the app
        // Add your desired logic here
        console.log("return");
        onCancel();
        Toast.show({
          type: "error",
          text1: `Payment Failed`,
        });
      }
    };

    const appStateSubscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      appStateSubscription.remove();
    };
  }, []);

  const handleExternalLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  };

  const handlePayment = async (id) => {
    console.log(id);
    const formData = {
      paymentId: id,
      bankCode: "NCB",
      language: "vn",
    };
    try {
      const { data } = await paymentService?.transactionPayment(formData);
      handleExternalLink(data?.data);
      console.log(data?.data);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  console.log(paymentPlan);
  return (
    <Modal visible={onOpen} transparent animationType="slide">
      <View className="flex-1  justify-center items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View className="bg-white w-[90%] h-[50%] rounded-lg">
          <View
            className="w-full h-[15%]  rounded-t-lg flex-row   items-center"
            style={{ backgroundColor: color.main_color }}
          >
            <View className="flex-[0.4] ml-4">
              <TouchableOpacity className="p-3" onPress={onCancel}>
                <ArrowLeftIcon size={25} color={"white"} />
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <Text className="font-bold text-white text-lg">Upgrade to Premium</Text>
            </View>
          </View>
          <View className="items-center justify-center my-auto">
            {paymentPlan?.length !== 0 &&
              paymentPlan?.map((item) => (
                <Card className="w-[95%] mt-5" key={item?.id}>
                  <Card.Content>
                    <View className="justify-center items-center">
                      <Text className="font-bold text-lg">{item?.name}</Text>
                    </View>
                    <View className="items-center justify-between my-4 flex-row">
                      <View className="flex-1">
                        <Text className="font-bold text-lg">Exclusive right:</Text>
                        <View className="ml-2">
                          <Text className="font-semibold text-md">
                            Number of Medicine:{" "}
                            <Text className="font-bold text-green-500">{item?.numberOfMedicine}</Text>
                          </Text>
                          <Text className="font-semibold text-md">
                            Number of Prescription:{" "}
                            <Text className="font-bold text-green-500">{item?.numberOfRegiment}</Text>
                          </Text>
                        </View>
                      </View>
                      <View></View>
                    </View>
                  </Card.Content>
                  <Card.Actions>
                    <TouchableOpacity
                      className="p-3 rounded-tr-2xl rounded-bl-2xl shadow-sm"
                      style={{ backgroundColor: color?.success }}
                      onPress={() => handlePayment(item?.id)}
                    >
                      <Text className="font-bold text-white">
                        {item?.money} VND / {item?.period}{" "}
                      </Text>
                    </TouchableOpacity>
                  </Card.Actions>
                </Card>
              ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;

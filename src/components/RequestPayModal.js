import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button, Card } from "react-native-paper";
import { Image } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import color from "../utils/color";
import PaymentModal from "./PaymentModal";

const RequestPayModal = ({ onOpen, onCancel }) => {
  const [visiblePayment, setVisiblePayment] = useState(false);
  const openPayemnt = () => {
    setVisiblePayment(true);
  };
  return (
    <Modal visible={onOpen} transparent animationType="slide">
      <View className="flex-1  justify-center items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        {visiblePayment && <PaymentModal onOpen={visiblePayment} onCancel={() => setVisiblePayment(false)} />}
        <Card className="w-[80%]">
          <Card.Title
            className="rounded-t-lg justify-center items-center text-white"
            style={{ backgroundColor: color.main_color }}
            title="Update Account"
            titleStyle={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          />
          <Card.Content>
            <View className="items-center justify-between my-4">
              <Text className="font-bold text-center text-xl my-2">
                Your data are out of space. Update account to get more data
              </Text>
            </View>
            <View className="flex-row items-center justify-around">
              <TouchableOpacity className="p-3 bg-gray-400 w-24 rounded-md" onPress={onCancel}>
                <Text className="text-center text-white text-md font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-3 w-24 rounded-md"
                style={{ backgroundColor: color.success }}
                onPress={openPayemnt}
              >
                <Text className="text-center text-white text-md font-bold">Update</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </View>
    </Modal>
  );
};

export default RequestPayModal;

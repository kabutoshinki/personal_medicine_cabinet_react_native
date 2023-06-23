import { View, Text, Animated, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import React from "react";
import color from "../utils/color";
import { ExclamationTriangleIcon, PencilSquareIcon, TrashIcon } from "react-native-heroicons/solid";
import AlertCustom from "./AlertCustom";
const HiddenItem = (props) => {
  const {
    item,
    swipeAnimatedValue,
    leftActionActivated,
    rightActionActivated,
    rowActionAnimatedValue,
    rowHeightAnimatedValue,
    rowMap,
    onOption,
    deleteRow,
  } = props;

  if (rightActionActivated) {
    Animated.spring(rowActionAnimatedValue, {
      toValue: 500,
      useNativeDriver: false,
    }).start();
  } else {
    Animated.spring(rowActionAnimatedValue, {
      toValue: 75,
      useNativeDriver: false,
    }).start();
  }
  const [visible, setVisible] = React.useState(false);
  const toggleAlert = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const handleEdit = (rowMap, rowKey) => {
    onOption(item, "Edit");
    rowMap[rowKey].closeRow();
  };
  const handleClose = (rowMap, rowKey) => {
    setVisible(false);
    rowMap[rowKey].closeRow();
  };

  return (
    <Animated.View className="w-[96%] rounded-lg m-1" style={[{ height: rowHeightAnimatedValue }]}>
      <TouchableWithoutFeedback className="" onPress={() => handleEdit(rowMap, item?.key)}>
        <View
          style={{ width: 80, right: 80, backgroundColor: color.lightBlue }}
          className="absolute bottom-0 top-0 justify-center"
        >
          <View style={{ alignItems: "center" }}>
            <PencilSquareIcon size={25} color={"white"} />
            <Text className="font-bold text-white mt-2">Edit</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {!leftActionActivated && (
        <Animated.View
          style={[
            { width: 80, right: 0, backgroundColor: color.danger },
            {
              flex: 1,
              width: rowActionAnimatedValue,
            },
          ]}
          className="absolute bottom-0 top-0 justify-center rounded-r-lg"
        >
          <TouchableWithoutFeedback className="" onPress={toggleAlert}>
            <View
              style={{ width: 80, right: 0, backgroundColor: color.danger }}
              className="absolute bottom-0 top-0 justify-center rounded-r-lg"
            >
              <Animated.View
                style={[
                  {
                    width: 80,
                    alignItems: "center",
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: "clamp",
                        }),
                      },
                    ],
                  },
                ]}
                className="absolute bottom-0 top-0 justify-center rounded-r-lg"
              >
                <View style={{ alignItems: "center" }}>
                  <TrashIcon size={25} color={"white"} />
                  <Text className="font-bold text-white mt-2">Delete</Text>
                </View>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      )}
      {visible && (
        <AlertCustom
          onOpen={visible}
          onClose={() => handleClose(rowMap, item?.key)}
          icon={<ExclamationTriangleIcon size={30} color={"white"} />}
          color={color.danger}
          text={`Are you sure you want to delete "${item?.regimenName}" ?`}
          action={() => deleteRow(item?.key)}
        />
      )}
    </Animated.View>
  );
};

export default HiddenItem;

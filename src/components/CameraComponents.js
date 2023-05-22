const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      console.log("Photo taken:", uri);
      // You can do further processing with the photo URI, such as displaying it or uploading it.
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={cameraType} ref={cameraRef}>
        <View style={{ flex: 1, backgroundColor: "transparent", flexDirection: "row" }}>
          <TouchableOpacity
            style={{ flex: 0.1, alignSelf: "flex-end", alignItems: "center" }}
            onPress={() => {
              setCameraType(
                cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <TouchableOpacity
        style={{
          flex: 0.1,
          alignSelf: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
        onPress={takePhoto}
      >
        <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}> Take Photo </Text>
      </TouchableOpacity>
    </View>
  );
};

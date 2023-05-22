import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 48,
  },
  button: {
    backgroundColor: "#7b9bea",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
  },
  registerButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#7b9bea",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  registerButtonText: {
    fontSize: 24,
    color: "#7b9bea",
  },
});

export default styles;

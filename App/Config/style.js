import { Platform } from "react-native";
import Colors from "./Colors";

export default {
  text: {
    fontSize: 18,
    color: Colors.dark,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Aveneir",
    width: "100%",
  },
};

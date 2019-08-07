import React from "react";
import {
  Modal,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import App from "../App.js"

const DisplayModal = props => (
  <Modal 
    visible={props.display}
    animationType="slide"
    onRequestClose={() => { props.display; } }
  >
    <View style={styles.container}>
      <Image source={props.image} style={styles.image} />

      <TouchableOpacity  style={styles.backImageTouchable}>
        <Image
          style={styles.backImage}
          source={require("../android/app/src/main/res/mipmap-hdpi/back.png")}
        />
      </TouchableOpacity>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  image: {
    marginTop: 20,
    marginLeft: 90,
    height: 200,
    width: 200
  },
  text: {
    fontSize: 20,
    marginLeft: 150
  },
  backImageTouchable: {
    position: "absolute",
    bottom: 0
  },
  backImage: {
    width: 80,
    height: 80
  }
});

export default DisplayModal;
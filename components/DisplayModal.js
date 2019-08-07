import React from "react";
import {
  Modal,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from "react-native";

import App from "../App";

const DisplayModal = props => (
  <Modal
    onPress={props.onPress}
    visible={props.display}
    //displayoff={props.displayoff}
    animationType="fade"
    onRequestClose={() => console.log("closed")}
  >
    <ImageBackground
      source={require("../android/app/src/main/res/mipmap-hdpi/backgroundsettings.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <Image source={props.image} style={styles.image} />
        <TouchableOpacity
          onPress={props.displayoff}
          style={styles.backImageTouchable}
        >
          <Image
            style={styles.backImage}
            source={require("../android/app/src/main/res/mipmap-hdpi/back_new.png")}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Volume Options</Text>
        <TouchableOpacity
          onPress={props.soundsOff}
          style={styles.muteOffImageTouchable}
        >
          <Image
            style={styles.muteOffImage}
            source={require("../android/app/src/main/res/mipmap-hdpi/sounds_off.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.soundsOn}
          style={styles.muteOnImageTouchable}
        >
          <Image
            style={styles.soundOnImage}
            source={require("../android/app/src/main/res/mipmap-hdpi/sounds_on_icon.png")}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
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
    fontSize: 37,
    position: "absolute",
    marginTop: 20,
    left: 75,
    textShadowColor: "blue",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 35
  },
  muteOffImageTouchable: {
    position: "absolute",
    top: 80,
    left: 110
  },
  muteOffImage: {
    width: 60,
    height: 60
  },
  muteOnImageTouchable: {
    position: "absolute",
    top: 80,
    left: 260
  },
  soundOnImage: {
    width: 60,
    height: 60
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
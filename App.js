import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Image,
  Button,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
  Slider
} from "react-native";

import VolumeControl, {
  VolumeControlEvents
} from "react-native-volume-control";

import Sound from "react-native-sound";
import Modal from "react-native-modal";
import VolumeSlider from "react-native-volume-slider";

import DisplayModal from "./components/DisplayModal";

import Grape from "./android/app/src/main/res/mipmap-hdpi/grape_image.png";
import Cherry from "./android/app/src/main/res/mipmap-hdpi/cherry_image.png";
import Diamond from "./android/app/src/main/res/mipmap-hdpi/sevenreal.png";
import Strawberry from "./android/app/src/main/res/mipmap-hdpi/strawberry_lit.png";

export default class App extends React.Component {
  sound = new Sound(
    require("./android/app/src/main/res/raw/casino_sound_one.mp3")
  );

  constructor(props) {
    super(props);
    this.ImageArray = [
      Grape,
      Cherry,
      Strawberry,
      Diamond,
      Grape,
      Cherry,
      Strawberry,
      Diamond,
      Grape,
      Cherry,
      Strawberry,
      Diamond
    ];

    this.state = {
      currentWheel1: this.ImageArray[Math.floor(Math.random() * 4) % 4],
      currentWheel2: this.ImageArray[Math.floor(Math.random() * 4) % 4],
      currentWheel3: this.ImageArray[Math.floor(Math.random() * 4) % 4],
      StartSpinning: false,
      currentValue: 1000,
      playedValue: 15,
      isModalVisible: true,
      display: false,
      volume: 0
    };
  }

  toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  triggerModal = () => {
    this.setState({ display: true });
  };

  triggerModalBack = () => {
    this.setState({ display: false });
  };

  async componentDidMount() {
    rolledTime = 0;

    this.setState({
      volume: await VolumeControl.getVolume()
    });

    this.volEvent = VolumeControlEvents.addListener(
      "VolumeChanged",
      this.volumeEvent
    );
  }

  volumeEvent = event => {
    this.setState({ volume: event.volume });
    //this.sound.play();
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  sliderChange(value) {
    VolumeControl.change(value);
  }

  componentWillUnmount() {
    // remove event listener
    this.volEvent.remove();
    clearTimeout(this.timeout);
  }

  playSound = () => {
    this.sound.play();
  };

  soundsBack = () => {
    this.sound.setVolume(this.state.volume);
    this.setModalVisible(!this.state.modalVisible);
    alert("SoundsOn");
  };

  soundsOff = () => {
    this.sound.setVolume(0);
    this.setModalVisible(!this.state.modalVisible);
    alert("SoundsOff");
  };

  stopSound = () => {
    this.sound.pause();
  };
  

  StartSpinning = () => {
    rolledTime++;
    this.opacity = 0;
    if (rolledTime < 14) {
      this.timeout = setTimeout(() => {
        this.setState({
          currentWheel1: this.ImageArray[Math.floor(Math.random() * 12) % 12],
          currentWheel2: this.ImageArray[Math.floor(Math.random() * 12) % 12],
          currentWheel3: this.ImageArray[Math.floor(Math.random() * 12) % 12]
        });
        this.StartSpinning();
        this.playSound();
      }, 150);
    } else {
      rolledTime = 0;
      this.componentWillUnmount();
      this.checkIfWin();
      this.opacity = 1;
    }
  };

  checkIfWin() {
    if (
      this.state.currentWheel1 == this.state.currentWheel2 &&
      this.state.currentWheel1 == this.state.currentWheel3 &&
      this.state.currentWheel2 == this.state.currentWheel3
    ) {
      let winValue = this.state.currentValue + 100;

      alert("You won 100€");

      this.setState({
        currentValue: winValue
      });
    }
    if (
      this.state.currentWheel1 == this.state.currentWheel2 &&
      this.state.currentWheel1 != this.state.currentWheel3
    ) {
      let winValue = this.state.currentValue + 50;

      alert("You won 50€");

      this.setState({
        currentValue: winValue
      });
    }
    if (
      this.state.currentWheel1 == this.state.currentWheel3 &&
      this.state.currentWheel1 != this.state.currentWheel2
    ) {
      let winValue = this.state.currentValue + 70;

      alert("You won 70€");

      this.setState({
        currentValue: winValue
      });
    }
    if (
      this.state.currentWheel1 != this.state.currentWheel2 &&
      this.state.currentWheel2 == this.state.currentWheel3
    ) {
      let winValue = this.state.currentValue + 70;

      alert("You won 50€");

      this.setState({
        currentValue: winValue
      });
    } else {
      let newValue = this.state.currentValue - 5;
      this.setState({
        currentValue: newValue
      });
    }
  }

  render() {
    return (
      <View>
        <ImageBackground
          source={require("./android/app/src/main/res/mipmap-hdpi/backgroundsettings.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={styles.container}>
            <View style={styles.borders}>
              <Image
                style={styles.WheelsImages}
                source={this.state.currentWheel1}
              />
              <Image
                style={styles.WheelsImages}
                source={this.state.currentWheel2}
              />
              <Image
                style={styles.WheelsImages}
                source={this.state.currentWheel3}
              />
            </View>
          </View>
          <View style={styles.spinningbuttoncontainer}>
            <TouchableOpacity onPress={this.StartSpinning}>
              <Image
                source={require("./android/app/src/main/res/mipmap-hdpi/spinning.png")}
                style={styles.spinningbutton}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainerWinning}>
            <TouchableOpacity onPress={this.testsound}>
              <Image
                source={require("./android/app/src/main/res/mipmap-hdpi/coins_image.png")}
                style={styles.winningsbutton}
              />
            </TouchableOpacity>
            <Text style={styles.text}>{this.state.currentValue}</Text>
          </View>
          <View style={styles.bottomsettings}>
            <TouchableOpacity
              onPress={() => this.triggerModal()}
              title="Open Modal"
              color="orange"
            >
              <Image
                source={require("./android/app/src/main/res/mipmap-hdpi/sett.png")}
                style={styles.settingsbutton}
              />
            </TouchableOpacity>
            <DisplayModal
              display={this.state.display}
              displayoff={this.triggerModalBack}
              soundsOff={this.soundsOff}
              soundsOn={this.soundsBack}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  wincontainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  test: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "lightblue"
  },
  slider: {
    height: 30,
    marginLeft: 7
  },
  WheelsImages: {
    width: 120,
    height: 120,
    resizeMode: "center",
    alignSelf: "center"
  },
  borders: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 120 / 6,
    borderColor: "lightblue",
    borderWidth: 3
  },
  spinningbuttoncontainer: {
    width: 75,
    height: 75,
    resizeMode: "center",
    alignSelf: "center"
  },
  spinningbutton: {
    width: 75,
    height: 75,
    alignSelf: "center"
  },
  bottomContainerWinning: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    left: 5,
    resizeMode: "center"
  },
  winningsbutton: {
    width: 65,
    height: 65
  },
  bottomsettings: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    right: 5,
    resizeMode: "center"
  },
  settingsbutton: {
    width: 68,
    height: 68
  },
  text: {
    fontSize: 28,
    position: "absolute",
    marginTop: 20,
    left: 65,
    textShadowColor: "#F9FC00",
    textShadowOffset: { width: 1.5, height: 1 },
    textShadowRadius: 8
  }
});
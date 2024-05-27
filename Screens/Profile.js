import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUser } from "../UserFunctions.js";
import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { FontAwesome5 } from "@expo/vector-icons";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      username: "",
      userId: "",
      imageUri: "",
      uploadStatus: false,
    };
  }

  componentDidMount() {
    this.getEmail();
  }

  getEmail = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("Email");
      if (storedEmail) {
        this.setState({ email: storedEmail });
        console.log("this is email from AsyncStorage from loginScreen ", storedEmail);
        const userData = await fetchUser(storedEmail);
        if (userData) {
          this.setState({ username: userData.userName, userId: userData.id }, () => {
            this.fetchMediaFireStorage();
          });
        }
      }
    } catch (error) {
      console.error("Error getting user email:", error.message);
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      this.onFireStorage(result.assets[0].uri);
    }
  };

  onFireStorage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(getStorage(), `UserImage/${this.state.userId}`, new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
        Alert.alert("Error", "There was an error uploading the image.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          this.setState({ imageUri: downloadURL, uploadStatus: true });
        });
      }
    );
  };

  fetchMediaFireStorage = async () => {
    try {
      const storageRef = ref(getStorage(), `UserImage/${this.state.userId}`);
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Image download URL:", downloadURL);

      this.setState({ imageUri: downloadURL });
    } catch (error) {
      if (error.code === "storage/object-not-found") {
        console.log("Image does not exist");
      } else {
        console.error("Error retrieving image download URL:", error);
      }
    }
  };

  render() {
    const { email, username, userId, imageUri } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ flex: 0.3 }}>
          <Image
            style={styles.tinyLogo}
            source={imageUri ? { uri: imageUri } : require("../assets/profile.png")}
          />
          <TouchableOpacity onPress={this.pickImage}>
            <FontAwesome5 name="folder-plus" size={26} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.3 }}>
          <Text>Email: {email}</Text>
        </View>
        <View style={{ flex: 0.3 }}>
          <Text>UserName: {username}</Text>
        </View>
        <View style={{ flex: 0.3 }}>
          <Text>User ID: {userId}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  input: {
    width: 250,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: 250,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export {Profile};

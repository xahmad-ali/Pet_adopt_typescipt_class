import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase_File.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };
  }

  saveEmail = (value) => {
    this.setState({ email: value });
  };

  savePassword = (value) => {
    this.setState({ password: value });
  };

  handleLogin = async () => {
    const { email, password } = this.state;
    const trimmedEmail = email.trim().toLowerCase();
    this.setState({ email: trimmedEmail });
    try {
      await AsyncStorage.setItem("Email", trimmedEmail);
      console.log("Stored email from AsyncStorage:", trimmedEmail);
    } catch (e) {
      console.error("Failed to retrieve email from storage", e);
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User logged in:", user);
      this.go_home();
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        console.log("User does not exist. Please sign up.");
      } else if (error.code === "auth/wrong-password") {
        console.log("Incorrect email or password.");
      } else {
        console.error(error);
      }
    }
  };

  go_home = () => {
    this.props.navigation.navigate("DrawerNavigation");
  };

  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={this.saveEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={this.savePassword}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "plum" }]}
          onPress={this.handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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

export default Login;

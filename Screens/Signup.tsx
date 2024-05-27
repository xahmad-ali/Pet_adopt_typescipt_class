import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase_File.js";
import { addDoc, collection } from "firebase/firestore";

interface Props {
  navigation: any; // Adjust the type according to your navigation setup
}

const Signup: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const saveUsername = async (value: string) => {
    setUsername(value);
  };
  const savePassword = (value: string) => {
    setPassword(value);
  };
  const saveEmail = async (value: string) => {
    setEmail(value);
  };

  const handleSignup = async () => {
    // Convert email to lowercase and trim any whitespace
    const trimmedEmail = email.trim().toLowerCase();
    setEmail(trimmedEmail);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("User signed up:", user);

      //--> Add user data to Firestore
      const usersCollectionRef = collection(db, "users"); // Get reference to 'users' collection
      const docRef = await addDoc(usersCollectionRef, {
        // Pass collection reference to addDoc
        Email: email,
        UserName: username,
      });
      console.log("Document written with ID:", docRef.id);
      go_login();
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  const go_login = () => {
    console.log("g home");
    navigation.navigate("Login", { email });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>REGISTER</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={saveEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={saveUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={savePassword}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "plum" }]}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderRadius: 50,
    height: 50,
    width: 300,
    backgroundColor: "lavender",
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  textstyle: {
    fontSize: 40,
    marginBottom: 10,
    fontWeight: "bold",
    color: "lavender",
    backgroundColor: "plum",
    width: 300,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default Signup;

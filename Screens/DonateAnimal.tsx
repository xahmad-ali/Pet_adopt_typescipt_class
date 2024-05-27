import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { auth, db } from "../Firebase_File";
import { addDoc, collection } from "firebase/firestore";
import { fetchUser } from "../UserFunctions";

type RootStackParamList = {
  UploadAnimalIamge: { animalId: string };
  // Add other routes here if needed
};

const DonateAnimal: React.FC = () => {
  const [animalName, setAnimalName] = useState<string | null>(null);
  const [breed, setBreed] = useState<string | null>(null);
  const [animalType, setAnimalType] = useState<string | null>(null);
  const [animalAge, setAnimalAge] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const saveInfo = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("Email");
      if (storedEmail) {
        const userData = await fetchUser(storedEmail);
        if (userData) {
          const fetchedUserId = userData.id;
          setUserId(fetchedUserId);

          const usersCollectionRef = collection(db, "animalinfo");
          const docRef = await addDoc(usersCollectionRef, {
            OwnerId: fetchedUserId,
            AnimalName: animalName,
            AnimalType: animalType,
            AnimalBreed: breed,
            AnimalAge: animalAge,
            createdAt: new Date().getTime(),
          });
          console.log("Document written with ID:", docRef.id);
          console.log("info uploaded ");
          goUploadImage(docRef.id);
        }
      }
    } catch (error) {
      console.error("Error saving animal info:", (error as Error).message);
    }
  };

  const goUploadImage = (animalId: string) => {
    navigation.navigate("UploadAnimalIamge", { animalId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Animal Type (cat / dog)"
          value={animalType}
          onChangeText={setAnimalType}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Animal Name"
          value={animalName}
          onChangeText={setAnimalName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Animal Breed (i.e. cat-persian)"
          value={breed}
          onChangeText={setBreed}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Animal Age"
          value={animalAge}
          onChangeText={setAnimalAge}
        />
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: "plum" }]} onPress={saveInfo}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export { DonateAnimal };

import React, { useState } from "react";
import {
  Box,
  Text,
  FormControl,
  Heading,
} from "@gluestack-ui/themed";
import { Input, Button } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // Mendapatkan data pendaftaran yang sudah ada dari AsyncStorage
      const registeredUsersString = await AsyncStorage.getItem("registeredUsers");
      const registeredUsers = registeredUsersString ? JSON.parse(registeredUsersString) : [];

      // Memeriksa apakah pengguna dengan email dan password yang dimasukkan ada di daftar pendaftaran
      const isValidUser = registeredUsers.some((user) => user.email === email && user.password === password);

      if (isValidUser) {
        // Jika login berhasil, navigasi ke layar MainApp
        navigation.navigate("MainApp");
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login.");
    }
  };

  return (
    <Box flex={1} backgroundColor="$white" justifyContent="center">
      <Box
        shadowColor="white"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={"$25"}
        shadowRadius={"$3.5"}
        elevation={"$5"}
        backgroundColor="$white"
        borderRadius={"$md"}
        marginTop={"$10"}
        marginHorizontal={"$6"}
        p={"$5"}
      >
        <Heading size="3xl" color="#038861">
          Welcome Back!
        </Heading>
        <Text size="sm" color="$black" my={"$1"}>
          We are happy to see you again. Let's go get you back in
        </Text>
        <FormControl>
          <Input
            label={"Email Address"}
            width={"$full"}
            height={"$10"}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <Input
            label="Password"
            width={"$full"}
            height={"$10"}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </FormControl>
        {error && (
          <Text color="red" textAlign="center">
            {error}
          </Text>
        )}
        <Box flexDirection="column" my={"$5"}>
          <Button
            title="Login"
            type="text"
            width={"$full"}
            padding={"$3"}
            onPress={handleLogin}
          />
        </Box>
      </Box>
      <Text size="sm" color="$black" my={"$1"} textAlign={"center"}>
        Log in to My account
      </Text>
      <Text
        size="sm"
        color="$black"
        my={"$1"}
        textAlign={"center"}
        onPress={() => navigation.navigate("Register")} // Navigate to Register screen
      >
        Don't have an account? Sign Up
      </Text>
    </Box>
  );
};

export default Login;

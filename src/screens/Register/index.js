import React, { useState } from "react";
import {
  Box,
  Text,
  FormControl,
  Heading,
} from "@gluestack-ui/themed";
import { Input, Button } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ navigation }) => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nomorPonsel, setNomorPonsel] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const existingUsersString = await AsyncStorage.getItem("registeredUsers");
      const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];

      const isEmailRegistered = existingUsers.some((user) => user.email === email);
      const isNomorPonselRegistered = existingUsers.some((user) => user.nomorPonsel === nomorPonsel);

      if (isEmailRegistered || isNomorPonselRegistered) {
        setError("Email or Nomor Ponsel is already registered.");
        return;
      }

      const newUser = { nama, email, nomorPonsel, password };
      existingUsers.push(newUser);

      await AsyncStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
      await AsyncStorage.setItem("userData", JSON.stringify(newUser));

      navigation.navigate("Login");
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An error occurred during registration.");
    }
  };

  return (
    <Box flex={1} backgroundColor="white" justifyContent="center">
      <Box
        shadowColor="$white"
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
          Create an Account
        </Heading>
        <Text size="sm" color="$black" my={"$1"}>
          Sign up to continue!
        </Text>
        <FormControl>
          <Input
            label="Nama"
            value={nama}
            onChangeText={(text) => setNama(text)}
            height={"$10"}
          />
          <Input
            label="Email Address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            height={"$10"}
          />
          <Input
            label="Nomor Ponsel"
            keyboardType="phone-pad"
            value={nomorPonsel}
            onChangeText={(text) => setNomorPonsel(text)}
            height={"$10"}
          />
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            height={"$10"}
          />
        </FormControl>
        {error && (
          <Text color="red" textAlign="center">
            {error}
          </Text>
        )}
        <Box flexDirection="column" my={"$5"}>
          <Button
            color="#038861"
            title="Register"
            type="text"
            icon="submit"
            padding={"$3"}
            fontSize={"$md"}
            onPress={handleRegister}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Register;

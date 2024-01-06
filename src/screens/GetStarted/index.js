import React from "react";
import { Image, Dimensions } from "react-native";
import { useTheme, Box, Text, Button, ScrollView } from "@gluestack-ui/themed";

const GetStarted = ({ navigation }) => {
	const theme = useTheme();
	const windowWidth = Dimensions.get("window").width;

	return (
		<ScrollView>
			<Box flex={1} alignItems="center">
				{/* Top Section with Image */}
				<Image
					source={require("../../assets/images/getstart2.png")}
					style={{
						width: "100%",
						height: 400, // Adjust the height as needed
					}}
				/>

				{/* Middle Section with Text */}
				<Box mt={40}>
					<Text
						color="#038861"
						fontSize={50}
						lineHeight={64}
						fontFamily="Poppins-Black">
						It's{"\n"}
						Cooking{"\n"}
						Time!
					</Text>
					<Text fontSize={12} fontFamily="Poppins-Regular">
						Presenting delicious low-calorie recipes.
					</Text>
					<Text fontSize={12} mb={40} fontFamily="Poppins-Regular">
						"Enjoy Healthy Food, Stay Ideal"
					</Text>
				</Box>

				{/* Bottom Section with Buttons */}
				<Box alignItems="center" mt={10}>
					<Button
						borderWidth={1}
						borderColor="black"
						borderRadius={16}
						marginBottom={16}
						width={200}
						backgroundColor="transparent"
						onPress={() => navigation.navigate("Register")}>
						<Text
							color="black"
							fontSize={16}
							textAlign="center"
							fontFamily="Poppins-Medium">
							Create Account
						</Text>
					</Button>

					<Button
						borderRadius={16}
						marginBottom={16}
						width={200}
						backgroundColor="#038861"
						onPress={() => navigation.navigate("Login")}>
						<Text
							color="white"
							fontSize={16}
							textAlign="center"
							fontFamily="Poppins-Medium">
							Log In
						</Text>
					</Button>
				</Box>
			</Box>
		</ScrollView>
	);
};

export default GetStarted;

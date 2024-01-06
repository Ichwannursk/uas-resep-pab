import React, { useState, useEffect } from "react";
import {
	Button,
	Box,
	FlatList,
	VStack,
	HStack,
	Heading,
	Image,
	Input,
	InputField,
	InputIcon,
	InputSlot,
	ScrollView,
	View,
	Text,
} from "@gluestack-ui/themed";
import { CategoryTab, ListNote } from "../../components";
import {
	AntDesign,
	Ionicons,
	Entypo,
	MaterialCommunityIcons,
	FontAwesome,
} from "@expo/vector-icons";
import MasonryList from "@react-native-seoul/masonry-list";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";

const DetailResep = ({ route }) => {
	const { itemId } = route.params; // to receive parameter pass from page before

	const [isLoading, setLoading] = useState(true); // To make sure loading is done or not and to make sure in return show loading when needed
	const [detailMenu, setDetailMenu] = useState([]); // to save detail menu data from api

	// useEffect(() => {
	// 	fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + itemId)
	// 		.then((response) => response.json())
	// 		.then((json) => setDetailMenu(json.meals))
	// 		.catch((error) => console.error(error))
	// 		.finally(() => setLoading(false));
	// }, []);

	useEffect(() => {
		fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + itemId)
			.then((response) => response.json())
			.then((json) => {
				const meal = json.meals[0];
				// Mengambil strIngredients dan strMeasures dari 1 sampai 20
				const ingredients = [];
				for (let i = 1; i <= 20; i++) {
					const ingredient = meal[`strIngredient${i}`];
					const measure = meal[`strMeasure${i}`];
					if (ingredient && ingredient.trim() !== "") {
						ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
					}
				}
				// Set state dengan array ingredients yang telah dibuat
				setDetailMenu({
					...meal,
					ingredients, // Menambahkan array ingredients ke detailMenu
				});
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	console.log(detailMenu.strMealThumb);

	return (
		<SafeAreaView>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<ScrollView bgColor="white" minHeight={"100%"}>
					<Box px={20} flex={1} bgColor="white">
						<Image
							alt="cover"
							w={"100%"}
							height={250}
							rounded={10}
							mt={5}
							source={{
								uri: detailMenu.strMealThumb,
							}}
						/>
						<Heading
							textAlign="center"
							mt={10}
							fontSize={30}
							fontWeight="bold"
							color="#038861">
							{detailMenu.strMeal}
						</Heading>
						<HStack alignItems="center" justifyContent="center" space="sm">
							<HStack
								bgColor="#FFD542"
								p={5}
								width={90}
								alignItems="center"
								rounded={15}
								justifyContent="center">
								<FontAwesome name="flag" size={18} color="black" />
								<Text marginStart={5} fontSize={12}>
									{detailMenu.strArea}
								</Text>
							</HStack>
							<HStack
								bgColor="#FFD542"
								p={5}
								width={100}
								alignItems="center"
								rounded={15}
								justifyContent="center">
								<FontAwesome name="tags" size={18} color="black" />
								<Text fontSize={12} marginStart={5}>
									{detailMenu.strCategory}
								</Text>
							</HStack>
						</HStack>
					</Box>
					<Box alignItems="left" padding={15} marginBottom={15} height={"auto"}>
						{/* Menampilkan daftar bahan */}
						<Text fontSize={18} fontWeight="bold" marginBottom={10}>
							Ingredients:
						</Text>
						<FlatList
							nestedScrollEnabled={true}
							scrollEnabled={false}
							data={detailMenu.ingredients}
							renderItem={({ item }) => <Text>{item}</Text>}
							keyExtractor={(item, index) => index.toString()}
						/>
						{/* Menampilkan langkah pembuatan */}
						<Text mt={10} fontSize={18} fontWeight="bold" marginBottom={10}>
							Directions:
						</Text>
						<Text fontSize={14} marginBottom={10}>
							{detailMenu.strInstructions}
						</Text>
					</Box>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

export default DetailResep;

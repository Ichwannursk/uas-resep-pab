import React, { useState, useEffect } from "react";
import {
	Box,
	FlatList,
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
	Pressable,
} from "@gluestack-ui/themed";
import { CategoryTab, ListNote } from "../../components";
import {
	AntDesign,
	Ionicons,
	Entypo,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import MasonryList from "@react-native-seoul/masonry-list";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";

const Home = ({ navigation }) => {
	// Styles
	const styles = {
		app: {
			flex: 2, // the number of columns you want to devide the screen into
			marginHorizontal: "auto",
			width: 400,
		},
		item: {
			flex: 1,
			maxWidth: "40%", // 100% devided by the number of rows you want
			alignItems: "center",

			// my visual styles; not important for the grid
			padding: 10,
			backgroundColor: "rgba(249, 180, 45, 0.25)",
			borderWidth: 1.5,
			borderColor: "#fff",
		},
	};

	// for item show in category list (styling per square menu)
	const Item = ({ item }) => {
		return (
			<View style={{ ...styles.item, borderRadius: 15 }}>
				<Pressable
					onPress={() => {
						navigation.navigate("ResepPerCategory", {
							categoryName: item.strCategory,
						});
					}}>
					<HStack>
						<Image
							height={"100%"}
							width={"30%"}
							alt={"thumbnail_category"}
							mr={7}
							source={{ uri: item.strCategoryThumb }}
						/>
						<Text>{item.strCategory}</Text>
					</HStack>
				</Pressable>
			</View>
		);
	};

	const renderFlatList = () => {
		if (searchQuery == "") {
			return (
				<>
					<Box marginTop={40}>
						<Image
							alt="cover"
							w={"100%"}
							height={200}
							rounded={20}
							source={{
								uri: "https://e0.pxfuel.com/wallpapers/52/830/desktop-wallpaper-food-background-food-food-recipes-food-menu-greek-food.jpg",
							}}
						/>
					</Box>
					<Box mt={25}>
						<Text fontWeight="bold" fontSize={18} color="black" mb={20}>
							Categories
						</Text>
						<View style={styles.app}>
							<FlatList
								nestedScrollEnabled={true}
								scrollEnabled={false}
								data={category}
								numColumns={2}
								renderItem={Item}
								keyExtractor={(item) => item.idCategory}
							/>
						</View>
					</Box>
					<Box mt={25} marginBottom={100}>
						<Text fontWeight="bold" fontSize={18} color="black" mb={20}>
							Recommendation
						</Text>
						<View>
							<MasonryList
								nestedScrollEnabled={true}
								scrollEnabled={false}
								numColumns={1}
								data={reccomendation}
								renderItem={({ item }) => (
									<ListNote
										key={item.idMeal}
										judul={item.strMeal}
										image={item.strMealThumb}
										isi={"isi"}
										tags={item.strTags}
										tanggal="tanggal"
										status={item.strCreativeCommonsConfirmed}
										category={item.strCategory}
										area={item.strArea}
										noteId={item.idMeal}
									/>
								)}
								keyExtractor={(item) => item.noteId}
							/>
						</View>
					</Box>
				</>
			);
		} else if (filteredMenu == null) {
			return (
				<Box mt={25} marginBottom={100}>
					<Text fontWeight="bold" fontSize={18} color="black" mb={20}>
						Sorry .. your menu could not be found
					</Text>
				</Box>
			);
		} else {
			return (
				<Box mt={25} marginBottom={100}>
					<Text fontWeight="bold" fontSize={18} color="black" mb={20}>
						Search Menu
					</Text>
					<View>
						<MasonryList
							nestedScrollEnabled={true}
							scrollEnabled={false}
							numColumns={1}
							data={filteredMenu}
							renderItem={({ item }) => (
								<ListNote
									key={item.idMeal}
									judul={item.strMeal}
									image={item.strMealThumb}
									isi={"isi"}
									tags={item.strTags}
									tanggal="tanggal"
									status={item.strCreativeCommonsConfirmed}
									category={item.strCategory}
									area={item.strArea}
									noteId={item.idMeal}
								/>
							)}
							keyExtractor={(item) => item.noteId}
						/>
					</View>
				</Box>
			);
		}
	};

	const [isLoading, setLoading] = useState(true); // To make sure loading is done or not and to make sure in return show loading when needed
	const [category, setCategory] = useState([]); // Replace with your desired categories
	const [reccomendation, setReccomendation] = useState([]); // replace with your desired reccomendation menu
	const [searchQuery, setSearchQuery] = useState(""); // to save the search query data temporary
	const [filteredMenu, setFilteredMenu] = useState([]); // to save filtered menu if search query have a string inside it

	useEffect(() => {
		fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
			.then((response) => response.json())
			.then((json) => setCategory(json.categories))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [response1, response2, response3] = await Promise.all([
					fetch("https://www.themealdb.com/api/json/v1/1/random.php"),
					fetch("https://www.themealdb.com/api/json/v1/1/random.php"),
					fetch("https://www.themealdb.com/api/json/v1/1/random.php"),
				]);

				const data1 = await response1.json();
				const data2 = await response2.json();
				const data3 = await response3.json();

				setReccomendation(
					reccomendation.concat(data1.meals, data2.meals, data3.meals)
				); // Append data to state
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (searchQuery == "") {
			// Jika searchQuery kosong, tidak lakkukan apa - apa
		} else {
			// Jika searchQuery tidak kosong, mencari data dari api
			searchFilteredMenuWithAPI();
		}
	}, [searchQuery]); // Hanya memanggil useEffect ketika searchQuery berubah

	const searchFilteredMenuWithAPI = async () => {
		try {
			// Panggil API untuk melakukan pencarian
			const response = await fetch(
				`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
			);
			const searchData = await response.json();

			setFilteredMenu(searchData.meals);
		} catch (error) {
			console.error("Error searching menu data:", error);
		}
	};

	// const [userNotes, setUserNotes] = useState([
	// 	{
	// 		noteId: 1,
	// 		image:
	// 			"https://myfoodstory.com/wp-content/uploads/2017/12/Homemade-Creamy-Vegetable-Soup-2-1.jpg",
	// 		title: "Cream Soup",
	// 		content: "A low-Calory cream soup with corn.asdasd das",
	// 		category: "Work",
	// 	},
	// 	{
	// 		noteId: 2,
	// 		image:
	// 			"https://myfoodstory.com/wp-content/uploads/2017/12/Homemade-Creamy-Vegetable-Soup-2-1.jpg",
	// 		title: "Note 2",
	// 		content: "Lorem ipsum...",
	// 		category: "Personal",
	// 	},
	// 	{
	// 		noteId: 3,
	// 		image:
	// 			"https://myfoodstory.com/wp-content/uploads/2017/12/Homemade-Creamy-Vegetable-Soup-2-1.jpg",
	// 		title: "Note 3",
	// 		content: "Lorem ipsum...",
	// 		category: "Work",
	// 	},
	// 	{
	// 		noteId: 4,
	// 		image:
	// 			"https://myfoodstory.com/wp-content/uploads/2017/12/Homemade-Creamy-Vegetable-Soup-2-1.jpg",
	// 		title: "Note 4",
	// 		content: "Lorem ipsum...",
	// 		category: "Study",
	// 	},
	// 	// Add more dummy notes as needed
	// ]);

	// const [selectedCategory, setSelectedCategory] = useState(null);

	// const onCategoryPress = (selectedCategory) => {
	// 	setSelectedCategory(selectedCategory);
	// };

	// const filteredNotes = selectedCategory
	// 	? userNotes.filter((note) => note.category === selectedCategory)
	// 	: userNotes;

	return (
		<SafeAreaView>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<ScrollView bgColor="white" minHeight={"100%"}>
					<Box px={20} flex={1} bgColor="white">
						<Heading mt={60} fontSize={30} fontWeight="bold" color="#038861">
							Let’s Find Your Food
						</Heading>
						<Input
							rounded={15}
							mt={20}
							size="xl"
							isDisabled={false}
							backgroundColor="#F5F5F5"
							isInvalid={false}
							isReadOnly={false}
							borderWidth={0}>
							<InputSlot>
								<InputIcon marginStart={15}>
									<AntDesign name="search1" size={20} color="#B1B3BC" />
								</InputIcon>
							</InputSlot>
							<InputField
								placeholder="What food for today ..."
								onChangeText={(text) => setSearchQuery(text)}
								value={searchQuery}
							/>
						</Input>
						{renderFlatList()}

						{/* <ScrollView
								horizontal
								mt={15}
								showsHorizontalScrollIndicator={false}>
								<HStack
									bgColor="#038861"
									space="md"
									p={14}
									rounded={15}
									marginEnd={10}
									height={55}
									width={150}>
									<Image
										height={"80%"}
										width={"20%"}
										alt={"image"}
										source={require("../../assets/images/meal.png")}
									/>
									<Text color="white">Heavy meal</Text>
								</HStack>
								<HStack
									bgColor="#038861"
									space="md"
									p={14}
									rounded={15}
									marginEnd={10}
									height={55}
									width={150}>
									<MaterialCommunityIcons
										size={21}
										name="food-apple-outline"
										color="white"
									/>
									<Text color="white">Dessert</Text>
								</HStack>
								<HStack
									bgColor="#038861"
									space="md"
									p={14}
									rounded={15}
									marginEnd={10}
									height={55}
									width={150}>
									<Entypo name="drink" size={22} color="white" />
									<Text color="white">Drinks</Text>
								</HStack>
							</ScrollView> */}

						{/* <FlatList
        data={category}
        renderItem={({ item, index }) => (
          <CategoryTab
            key={index}
            title={item}
            padding="$2"
            margin="$2"
            onPress={() => onCategoryPress(item)}
          />
        )}
        horizontal={true}
        mb={"$4"}
      /> */}
						{/* <FlatList
        data={filteredNotes}
        renderItem={({ item }) => (
          <ListNote
            key={item.noteId}
            judul={item.title}
            isi={item.content}
            tanggal="tanggal"
            status={item.status}
            category={item.category}
            noteId={item.noteId}
          />
        )}
        keyExtractor={(item) => item.noteId}
      /> */}
					</Box>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

export default Home;

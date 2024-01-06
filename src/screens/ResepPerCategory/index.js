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

const ResepPerCategory = ({ route }) => {
	const { categoryName } = route.params; // pass data from previous page

	const [isLoading, setLoading] = useState(true); // To make sure loading is done or not and to make sure in return show loading when needed
	const [dataMenuPerCategory, setDataMenuPerCategory] = useState([]); // Replace with your desired categories
	const [searchQuery, setSearchQuery] = useState(""); // to save the search query data temporary
	const [filteredMenu, setFilteredMenu] = useState([]); // to save filtered menu if search query have a string inside it

	useEffect(() => {
		fetch(
			"https://www.themealdb.com/api/json/v1/1/filter.php?c=" + categoryName
		)
			.then((response) => response.json())
			.then((json) => setDataMenuPerCategory(json.meals))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		const filteredResult = dataMenuPerCategory.filter((item) =>
			item.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredMenu(filteredResult);
	}, [searchQuery, dataMenuPerCategory]);

	const renderList = () => {
		if (searchQuery !== "" && filteredMenu.length > 0) {
			return (
				<MasonryList
					numColumns={1}
					data={filteredMenu}
					renderItem={({ item }) => (
						<ListNote
							key={item.idMeal}
							judul={item.strMeal}
							image={item.strMealThumb}
							isi={"isi"}
							tanggal="tanggal"
							noteId={item.idMeal}
						/>
					)}
					keyExtractor={(item) => item.idMeal}
				/>
			);
		} else if (filteredMenu.length < 1) {
			return <Text>Sorry ... we couldn't find match record</Text>;
		} else {
			return (
				<MasonryList
					numColumns={1}
					data={dataMenuPerCategory}
					renderItem={({ item }) => (
						<ListNote
							key={item.idMeal}
							judul={item.strMeal}
							image={item.strMealThumb}
							isi={"isi"}
							tanggal="tanggal"
							noteId={item.idMeal}
						/>
					)}
					keyExtractor={(item) => item.noteId}
				/>
			);
		}
	};

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
								placeholder="What food for today..."
								onChangeText={(text) => setSearchQuery(text)}
								value={searchQuery}
							/>
						</Input>
						<Box mt={25} marginBottom={100}>
							<ScrollView>
								<Text fontWeight="bold" fontSize={18} color="black" mb={20}>
									{filteredMenu.length == 0
										? "Search in Category " + categoryName
										: "Category " + categoryName}
								</Text>
								{renderList()}
							</ScrollView>
						</Box>

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

export default ResepPerCategory;

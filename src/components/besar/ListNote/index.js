import React from "react";
import {
	Text,
	Pressable,
	Box,
	VStack,
	HStack,
	Heading,
	Image,
	Center,
	View,
} from "@gluestack-ui/themed";
import { IconDelete, IconEdit } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";

const ListNote = ({
	judul,
	image,
	isi,
	tanggal,
	tags,
	status,
	category,
	area,
	noteId,
	onDelete,
}) => {
	const navigation = useNavigation();

	const handleEditClick = () => {
		navigation.navigate("EditNote", {
			judul,
			image,
			isi,
			category,
			status,
			noteId,
		});
	};
	const handleDeleteClick = () => {
		onDelete(noteId);
		navigation.replace("MainApp");
	};

	return (
		<Pressable
			onPress={() => {
				navigation.navigate("DetailResep", {
					itemId: noteId,
				});
			}}>
			<Box
				bgColor="#038861"
				padding={15}
				marginBottom={15}
				height={"auto"}
				rounded={10}>
				<HStack space="lg">
					<Image
						alt="cover"
						w={80}
						height={90}
						rounded={10}
						source={{ uri: image }}
					/>
					<VStack minHeight={80} flex={1} justifyContent="space-between">
						<View style={{ width: "80%" }}>
							<Heading color="white" numberOfLines={2} ellipsizeMode="tail">
								{judul}
							</Heading>
						</View>
						{/* <Box width={200}>
            <Text color="white" fontSize={10}>
              {} // isi inside curly braces
            </Text>
          </Box> */}

						<HStack space="sm">
							<HStack
								bgColor="#FFD542"
								p={5}
								width={90}
								alignItems="center"
								rounded={15}
								justifyContent="center">
								<FontAwesome name="flag" size={18} color="black" />
								<Text marginStart={5} fontSize={12}>
									{area}
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
									{category}
								</Text>
							</HStack>
						</HStack>

						<Box>
							{/* <Text color="$white" fontWeight="$bold">
              {status}
            </Text> */}
						</Box>
					</VStack>
				</HStack>

				{/* <HStack>
        <Pressable onPress={handleEditClick}>
          <IconEdit />
        </Pressable>
        <Pressable onPress={handleDeleteClick}>
          <IconDelete />
        </Pressable>
      </HStack> */}
			</Box>
		</Pressable>
	);
};

export default ListNote;

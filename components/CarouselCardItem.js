import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

export const SLIDER_WIDTH = 370
export const ITEM_WIDTH = 366
export const IMAGE_WIDTH = 361.5

const CarouselCardItem = ({ item, index }) => {
    return (
        <View style={styles.container} key={index}>
            <Image
                source={{ uri: item.imgUrl }}
                style={styles.image}
            />
            <Text style={styles.header}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
        </View>
    )
    }
    
    const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#ddd',
        width: ITEM_WIDTH,
        paddingBottom: 40,
    },
    image: {
        width: IMAGE_WIDTH,
        height: 150,
    },
    header: {
        color: "#222",
        fontSize: 28,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingTop: 20
    },
    body: {
        color: "#222",
        fontSize: 18,
        paddingLeft: 20,
        paddingLeft: 20,
        paddingRight: 20
    }
})

export default CarouselCardItem
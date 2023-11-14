import React from 'react'
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native'

import DetailHeader from '../components/detailHeader'

const DetailScreen = ({
    route: {
        params: { item, type },
    },
}) => {
    return (
        <View style={styles.container}>
            <DetailHeader text={item.mainText} text2={item.secondaryText}></DetailHeader>
            <View style={styles.detailContainer}>
                <Image
                    source={{
                        uri: item.imageUrl,
                    }}
                    style={type == 'plant' ? styles.image : styles.imageMapa}
                />
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
                <ScrollView>
                    <Text style={styles.textDetail}>{item.description}</Text>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FEECCD',
        flex: 1,
    },
    detailContainer: {
        flex: 1,
        paddingTop: 18,
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        margin: 18,
        backgroundColor: '#CDC773',
        height: 680,
        width: 360,
    },
    imageMapa: {
        height: '95%',
        width: '95%',
        borderRadius: 20,
    },
    image: {
        height: 220,
        width: '90%',
        borderRadius: 20,
    },
    textDetail: {
        fontSize: 19,
        padding: 10,
    },
})

export default DetailScreen

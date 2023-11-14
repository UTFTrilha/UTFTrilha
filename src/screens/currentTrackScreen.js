import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

import Header from '../components/header'

const CurrentTrackScreen = () => {

    return (
        <View style={styles.container}>
            <View style={styles.trackContainer}>
                <Image source={require('../../assets/images/track.png')} style={styles.track}></Image>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FEECCD',
        flex: 1,
    },
    trackContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    track: {
        width: '85%',
        height: '85%',
        borderRadius: 20,
        alignSelf: 'center',
    },
})

export default CurrentTrackScreen

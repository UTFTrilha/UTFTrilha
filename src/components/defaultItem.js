import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const DefaultItem = ({ text }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#444a43',
        width: '95%',
        height: 64,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8,
    },
    text: {
        fontWeight: '600',
        fontSize: 20,
        color: '#000',
    },
})

export default DefaultItem

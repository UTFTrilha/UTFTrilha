import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const TypeItem = ({ text }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#336633',
        width: '95%',
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '600',
        fontSize: 20,
        color: '#000',
    },
})

export default TypeItem

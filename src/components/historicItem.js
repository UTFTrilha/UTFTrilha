import React, { cloneElement } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const HistoricItem = ({ navigation, item, type }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                navigation.navigate('Detail', { item, type })
            }}
        >
            <Text style={styles.text}>{item.mainText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CDC773',
        width: '95%',
        height: 64,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '600',
        fontSize: 25,
        color: '#000',
    },
})

export default HistoricItem

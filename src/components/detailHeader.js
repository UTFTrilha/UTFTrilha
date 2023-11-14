import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

const DetailHeader = ({ text, text2 }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{text}</Text>
            <Text style={styles.subtitle}>{text2}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#CDC773',
        paddingVertical: 20,
        alignItems: 'center',
        paddingTop: 30,
        elevation: 10,
        paddingHorizontal: 26,
    },
    title: {
        fontSize: 40,
    },
    subtitle: {
        fontSize: 20,
    },
})

export default DetailHeader

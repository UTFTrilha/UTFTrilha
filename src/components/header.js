import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Header = ({ titleText }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{titleText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#CDC773',
        paddingVertical: 20,
        alignItems: 'center',
    },
    title: {
        fontWeight: '600',
        fontSize: 40,
        color: '#000',
    },
})

export default Header

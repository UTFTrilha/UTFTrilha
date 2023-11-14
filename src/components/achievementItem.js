import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/Feather'

const AchievementItem = ({ text, text2, iconName }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{text}</Text>
                <Text style={styles.text2}>{text2}</Text>
            </View>
            <Icon name={iconName} size={30} color='#000000' style={styles.iconStyle}></Icon>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        height: 64,
        borderRadius: 10,
        paddingHorizontal: 16,
        backgroundColor: '#CDC773',
    },
    textContainer: {},
    text: {
        fontWeight: '600',
        fontSize: 20,
        color: '#000',
    },
    text2: {
        fontSize: 16,
        color: '#000',
    },
    iconStyle: {},
})

export default AchievementItem

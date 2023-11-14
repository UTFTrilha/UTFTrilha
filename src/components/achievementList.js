import React from 'react'
import { View, StyleSheet } from 'react-native'

import AchievementItem from './achievementItem'
import BlockedAchievement from './blockedAchievement'

const AchievementList = ({ listItems }) => {
    return (
        <View style={styles.container}>
            {listItems.length > 0 ? (
                listItems.map((item) => (
                    <AchievementItem
                        key={item.id}
                        text={item.mainText}
                        text2={item.secondaryText}
                        iconName={item.iconName}
                    />
                ))
            ) : (
                <BlockedAchievement text={'Nenhuma foi desbloqueada'} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        gap: 12,
    },
})

export default AchievementList

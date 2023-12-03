import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native'

import AchievementList from '../components/achievementList'

import { firebase } from '../firebase/config'

const AchievementsScreen = () => {
    const [achievementItemList, setAchievementItemList] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [user, setUser] = useState()

    const getAchievementList = async () => {
        const achievementsRef = firebase.firestore().collection('achievements').where
        const achievementsSnapshot = await achievementsRef.get()
        // #TODO - Alterar consulta pra fazer uso do id usuário logado




        let achievementItemListResult = []
        achievementsSnapshot.forEach((doc) => {
            achievementItemListResult.push(doc.data())
        })
        setAchievementItemList(achievementItemListResult)
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            getAchievementList()
            setRefreshing(false)
        }, 500)
    }, [])

    useEffect(() => {
        onRefresh()
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.homeContainer}>
                    <AchievementList listItems={achievementItemList} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FEECCD',
        flex: 1,
    },
    homeContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 16,
        gap: 16,
    },
})

export default AchievementsScreen

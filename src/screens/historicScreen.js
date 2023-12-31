import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import HistoricList from '../components/historicList'

import { firebase } from '../firebase/config'

const HistoricScreen = ({ navigation }) => {
    const [trailItemList, setTrailItemList] = useState([])
    const [plantItemList, setPlantItemList] = useState([])
    const [refreshing, setRefreshing] = useState(true)

    const getTrailItemList = async () => {
        const trailItemsRef = firebase.firestore().collection('trailItems')
        const userId = await AsyncStorage.getItem('userId')
        const trailItemsSnapshot = await trailItemsRef
            .where('userIdList', 'array-contains', userId)
            .get()
        let trailItemListResult = []
        trailItemsSnapshot.forEach((doc) => {
            trailItemListResult.push(doc.data())
        })
        setTrailItemList(trailItemListResult)
    }
    const getPlantItemList = async () => {
        const plantItemsRef = firebase.firestore().collection('plantItems')
        const userId = await AsyncStorage.getItem('userId')
        const plantItemsSnapshot = await plantItemsRef
            .where('userIdList', 'array-contains', userId)
            .get()
        let plantItemListResult = []
        plantItemsSnapshot.forEach((doc) => {
            plantItemListResult.push(doc.data())
        })
        setPlantItemList(plantItemListResult)
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            getTrailItemList()
            getPlantItemList()
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
                    <HistoricList
                        navigation={navigation}
                        listTitle={'Trilha'}
                        listItems={trailItemList}
                        listType={'trail'}
                    />
                    <HistoricList
                        navigation={navigation}
                        listTitle={'Planta'}
                        listItems={plantItemList}
                        listType={'plant'}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEECCD',
    },
    homeContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 16,
        gap: 16,
    },
})

export default HistoricScreen

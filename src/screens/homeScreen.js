import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Modal, Text, Alert } from 'react-native'

import Icon from 'react-native-vector-icons/Feather'

import { firebase } from '../firebase/config'

const HomeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true)
    const [trailItemList, setTrailItemList] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedTrail, setSelectedTrail] = useState({})

    const getTrailItemList = async () => {
        const trailItemsRef = firebase.firestore().collection('trailItems')
        const trailItemsSnapshot = await trailItemsRef.get()
        let trailItemListResult = []
        trailItemsSnapshot.forEach((doc) => {
            trailItemListResult.push(doc.data())
        })
        setTrailItemList(trailItemListResult)
        setLoading(false)
    }

    const handleButtonPress = (trail) => {
        setModalVisible(true)
        setSelectedTrail(trail)
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    useEffect(() => {
        getTrailItemList()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.homeContainer}>
                <Image source={require('../../assets/images/map.png')} style={styles.map}></Image>
                {!loading ? (
                    trailItemList.length > 0 ? (
                        trailItemList.map((trail) => (
                            <TouchableOpacity
                                onPress={() => handleButtonPress(trail)}
                                style={{ position: 'absolute' }}
                            >
                                <Icon
                                    name='map-pin'
                                    size={60}
                                    color='#ff0000'
                                    style={{
                                        position: 'absolute',
                                        top: trail.posY,
                                        left: trail.posX,
                                    }}
                                ></Icon>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.defaultMessageView}>
                            <Text>Nenhuma trilha encontrada</Text>
                        </View>
                    )
                ) : null}
                <TouchableOpacity
                    onPress={() => {
                        return Alert.alert(
                            'Confirmação necessária',
                            'Você realmente deseja deslogar?',
                            [
                                { text: 'Aceitar', onPress: () => navigation.navigate('Login') },
                                { text: 'Cancelar' },
                            ]
                        )
                    }}
                    style={styles.logoutContainer}
                >
                    <Icon name={'log-out'} size={20} />
                </TouchableOpacity>
            </View>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
                style={styles.modalContent}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.textMapPinDetails}>{selectedTrail.mainText}</Text>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}
                    >
                        {[...Array(selectedTrail.rating)].map((_, i) => (
                            <Icon
                                key={i}
                                name='star'
                                size={40}
                                color='#FFBF00'
                                style={styles.starIcon}
                            />
                        ))}
                    </View>
                    <TouchableOpacity onPress={closeModal}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
        paddingVertical: 16,
        justifyContent: 'space-between',
    },
    map: {
        height: '90%',
        width: '90%',
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        paddingVertical: 20,
    },
    modalContent: {
        height: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    textMapPinDetails: {
        fontSize: 25,
        color: 'white',
        alignSelf: 'center',
    },
    logoutContainer: {
        width: '90%',
        height: '7%',
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#948975',
        flexDirection: 'row',
    },
    defaultMessageView: {
        position: 'absolute',
        top: '45%',
        left: '25%',
        width: '50%',
        height: '7%',
        borderRadius: 10,
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEECCD',
    },
})

export default HomeScreen

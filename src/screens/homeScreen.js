import React, { useState } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Modal, Text, Alert } from 'react-native'

import Icon from 'react-native-vector-icons/Feather'

const HomeScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)

    const handleButtonPress = () => {
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.homeContainer}>
                <Image source={require('../../assets/images/map.png')} style={styles.map}></Image>
                <TouchableOpacity onPress={handleButtonPress} style={{ position: 'absolute' }}>
                    <Icon name='map-pin' size={60} color='#ff0000' style={styles.mapPinIcon}></Icon>
                </TouchableOpacity>

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
                    <Text style={styles.textMapPinDetails}>
                        Informações sobre a trilha selecionada
                    </Text>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}
                    >
                        <Icon name='star' size={40} color='#FFBF00' style={styles.starIcon}></Icon>
                        <Icon name='star' size={40} color='#FFBF00' style={styles.starIcon}></Icon>
                        <Icon name='star' size={40} color='#FFBF00' style={styles.starIcon}></Icon>
                        <Icon name='star' size={40} color='#FFBF00' style={styles.starIcon}></Icon>
                        <Icon name='star' size={40} color='#FFBF00' style={styles.starIcon}></Icon>
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
    mapPinIcon: {
        position: 'absolute',
        top: 310,
        left: 200,
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
})

export default HomeScreen

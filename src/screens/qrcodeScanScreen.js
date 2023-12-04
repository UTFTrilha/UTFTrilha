import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { BarCodeScanner } from 'expo-barcode-scanner'

import { firebase } from '../firebase/config'

const CameraScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        }
        getBarCodeScannerPermissions()
    }, [])

    const handleBarCodeScanned = async ({ data }) => {
        setScanned(true)

        const db = firebase.firestore()
        const userId = await AsyncStorage.getItem('userId')

        const qrCodeContentList = data.split(':')
        const achievementRef = doc(db, 'achievements', '9cQgGfy1J5dHAwQilH4X')
        await updateDoc(achievementRef, {
            userIdList: arrayUnion(userId),
        })
        if (qrCodeContentList[0] == 'plant-qrcode') {
            alert(`QR Code escaneado!`)
            const plantList = await firebase
                .firestore()
                .collection('plantItems')
                .where('id', '==', qrCodeContentList[1])
                .get()
            const plantRef = doc(db, 'plantItems', plantList.docs[0].data().id)
            await updateDoc(plantRef, {
                userIdList: arrayUnion(userId),
            })
            const achievementRef = doc(db, 'achievements', 'Y7caqexrvmDyycJUBXzy')
            await updateDoc(achievementRef, {
                userIdList: arrayUnion(userId),
            })
            navigation.navigate('Detail', {
                item: plantList.docs[0].data(),
                type: 'plant',
            })
            return
        } else if (qrCodeContentList[0] == 'trail-qrcode') {
            alert(`QR Code escaneado!`)
            const trailItem = await firebase
                .firestore()
                .collection('trailItems')
                .where('id', '==', qrCodeContentList[1])
                .get()
            const trailRef = doc(db, 'trailItems', trailItem.docs[0].data().id)
            await updateDoc(trailRef, {
                userIdList: arrayUnion(userId),
            })
            const achievementRef = doc(db, 'achievements', 'qB67KL4I02NJ9uTDPEMX')
            await updateDoc(achievementRef, {
                userIdList: arrayUnion(userId),
            })
            navigation.navigate('Detail', {
                item: trailItem.docs[0].data(),
                type: 'trail',
            })
            return
        }

        alert(`QR Code inválido!`)
    }

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Solicitando permissão da câmera</Text>
            </View>
        )
    } else if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text>Sem acesso a câmera do dispositivo :/</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.barCodeScanner}
            />
            {scanned && (
                <View style={styles.rescanButtonView}>
                    <Button
                        title={'Clique para escanear novamente'}
                        onPress={() => setScanned(false)}
                    ></Button>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#CDC773',
    },
    barCodeScanner: {
        width: '100%',
        height: '100%',
    },
    rescanButtonView: {
        zIndex: 1,
        marginTop: -56,
        width: '90%',
        height: '7%',
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: '#CDC773',
    },
})

export default CameraScreen

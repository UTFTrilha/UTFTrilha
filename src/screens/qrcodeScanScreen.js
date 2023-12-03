import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

        const db = firebase.firestore();
        const userId = await AsyncStorage.getItem('userId');

        const qrCodeContentList = data.split(':') // plant-qrcode:An63RIrg7Olji0XsrCfO
        //console.log(qrCodeContentList);
        const achievementRef = doc(db, "achievements", "9cQgGfy1J5dHAwQilH4X");
        await updateDoc(achievementRef, {
            userIdList: arrayUnion(userId)
        });
        if (qrCodeContentList[0] == 'plant-qrcode') {
            alert(`QR Code escaneado!`)
            const plantList = await firebase
                .firestore()
                .collection('plantItems')
                .where('id', '==', qrCodeContentList[1])
                .get()
            await setScanned(true)
            const plantRef = doc(db, "plantItems", plantList.docs[0].data().id);
            await updateDoc(plantRef, {
                userIdList: arrayUnion(userId)
            });
            const achievementRef = doc(db, "achievements", "Y7caqexrvmDyycJUBXzy");
            await updateDoc(achievementRef, {
                userIdList: arrayUnion(userId)
            });
            navigation.navigate('Detail', {
                item: plantList.docs[0]
                    .data(),
                type: 'plant',
            })
        } else if (qrCodeContentList[0] == 'trail-qrcode') {
            alert(`QR Code escaneado!`)
            const trailItem = await firebase
                .firestore()
                .collection('trailItems')
                .where('id', '==', qrCodeContentList[1])
                .get();
            await setScanned(true)
            const trailRef = doc(db, "trailItems", trailItem.docs[0].data().id);
            await updateDoc(trailRef, {
                userIdList: arrayUnion(userId)
            });
            const achievementRef = doc(db, "achievements", "qB67KL4I02NJ9uTDPEMX");
            await updateDoc(achievementRef, {
                userIdList: arrayUnion(userId)
            });
            navigation.navigate('Detail', {
                item: trailItem.docs[0]
                    .data(),
                type: 'trail',
            })
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
                <Button
                    title={'Clique para escanear novamente'}
                    onPress={() => setScanned(false)}
                />
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
})

export default CameraScreen

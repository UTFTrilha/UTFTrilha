import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

import { BarCodeScanner } from 'expo-barcode-scanner'

const CameraScreen = () => {
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        }
        getBarCodeScannerPermissions()
    }, [])

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true)
        alert(`QR Code escaneado!`)
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

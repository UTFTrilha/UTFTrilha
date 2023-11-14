import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

import { firebase } from '../firebase/config'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then((firestoreDocument) => {
                        if (!firestoreDocument.exists) {
                            alert('Usuario não existe mais')
                            return
                        }
                        const user = firestoreDocument.data()
                        navigation.navigate('HomeTabs')
                    })
                    .catch((error) => {
                        alert(error)
                    })
            })
            .catch((error) => {
                alert(error)
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <View style={styles.login}>
                    <Text style={styles.title}>Login</Text>
                    <Text style={styles.subtitle}>E-mail:</Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} />
                    <Text style={styles.subtitle}>Senha:</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={() => onLoginPress()}>
                        <Text style={styles.loginButtonText}>Fazer Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registerButton}>ou cadastre-se aqui</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FEECCD',
        flex: 1,
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    login: {
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CDC773',
        padding: 20,
        borderRadius: 10,
        borderRadius: 20,
        marginHorizontal: 40,
    },
    title: {
        fontSize: 35,
        color: '#000000',
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 22,
        color: '#000000',
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    input: {
        borderStyle: 'solid',
        borderColor: '#000000',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        width: '100%',
        height: 31,
        paddingHorizontal: 10,
    },
    loginButton: {
        marginTop: 20,
        backgroundColor: '#FEECCD',
        width: '100%',
        paddingVertical: 6,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonText: {
        fontSize: 30,
    },
    registerButton: {
        fontWeight: 'bold',
        color: '#5B2F14',
        fontSize: 20,
        marginTop: 4,
        backgroundColor: 'transparent',
    },
})

export default LoginScreen

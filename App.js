import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Icon from 'react-native-vector-icons/Feather'

import LoginScreen from './src/screens/loginScreen'
import RegisterScreen from './src/screens/registerScreen'
import HomeScreen from './src/screens/homeScreen'
import CurrentTrackScreen from './src/screens/currentTrackScreen'
import AchievementsScreen from './src/screens/achievementsScreen'
import CameraScreen from './src/screens/qrcodeScanScreen'
import HistoricScreen from './src/screens/historicScreen'
import DetailScreen from './src/screens/detailScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function HomeTabs() {
    function homeScreenTab(name, component, iconName) {
        return (
            <Tab.Screen
                name={name}
                component={component}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <View style={focused ? styles.largeCircle : styles.circle}>
                            <Icon name={iconName} color={color} size={focused ? 32 : 20} />
                        </View>
                    ),
                }}
            />
        )
    }

    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: styles.home,
                tabBarActiveTintColor: '#FFC126',
                headerStyle: {
                    height: 72,
                    backgroundColor: '#CDC773',
                },
                headerTitleStyle: {
                    fontSize: 32,
                    fontWeight: 'bold',
                },
            }}
        >
            {homeScreenTab('Trilha Ativa', CurrentTrackScreen, 'navigation')}
            {homeScreenTab('Conquistas', AchievementsScreen, 'award')}
            {homeScreenTab('Home', HomeScreen, 'home')}
            {homeScreenTab('Camera', CameraScreen, 'camera')}
            {homeScreenTab('Histórico', HistoricScreen, 'list')}
            <Tab.Screen
                name='Detail'
                component={DetailScreen}
                options={{ tabBarItemStyle: { display: 'none' }, headerShown: false }}
            />
        </Tab.Navigator>
    )
}

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Register' component={RegisterScreen} />
                <Stack.Screen name='HomeTabs' component={HomeTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    home: {
        height: 56,
        alignItems: 'center',
        backgroundColor: '#CDC773',
    },
    circle: {
        width: 42,
        height: 42,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5B2F14',
    },
    largeCircle: {
        width: 50,
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5B2F14',
    },
})

export default App

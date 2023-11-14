import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TypeItem from './typeItem'
import DefaultItem from './defaultItem'
import HistoricItem from './historicItem'

const HistoricList = ({ navigation, listTitle, listItems, listType }) => {
    return (
        <View style={styles.container}>
            <TypeItem text={listTitle} />
            {listItems.length > 0 ? (
                listItems.map((item) => (
                    <HistoricItem
                        navigation={navigation}
                        key={item.id}
                        item={item}
                        type={listType}
                    />
                ))
            ) : (
                <DefaultItem text={'Nenhuma foi desbloqueada'} />
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

export default HistoricList

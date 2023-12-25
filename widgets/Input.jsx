import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const Input = ({ isSecure, onChange, value, placeholder }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={isSecure}
            onChangeText={onChange}
            value={value}
            
        />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
})

export default Input
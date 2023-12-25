import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

const Button = ({ text, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            backgroundColor,
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <View>
            <Text style={{ color: textColor, fontSize: 16, fontWeight: 'bold' }}>
                {text}
            </Text>
        </View>
    </TouchableOpacity>
);

export default Button
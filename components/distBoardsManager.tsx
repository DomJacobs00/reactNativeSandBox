import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native"

export const DistBoardsManager = () => {
    const [stage, setStage] = useState('initial');
    const bingos = [
        {id:0, name:'one'},
        {id:1, name:'one'},
        {id:2, name:'one'},
        {id:3, name:'one'},
        {id:4, name:'one'},
        {id:5, name:'one'},
        {id:6, name:'one'},
        {id:7, name:'one'},
        {id:8, name:'one'},
        {id:9, name:'one'},
        {id:10, name:'one'}
    ]
    return (
        <View>
            {stage === 'initial' && (
                <View className="w-full bg-green-100 h-[100vh]">
                    <View className="border h-[10vh]">
                        <Text className="text-4xl font-bold px-1 py-2">Location Name</Text>
                    </View>
                    <View className="border h-[60vh]">
                        <ScrollView>
                            {bingos.map((b) => (
                                <TouchableOpacity 
                                    key={b.id}
                                    className="border pl-1 py-2 "
                                >
                                    <Text className="text-3xl">{b.name}</Text>
                                </TouchableOpacity>
                            ))}

                        </ScrollView>
                    </View>
                    <View className="border flex flex-row mt-10 justify-center">
                        <TouchableOpacity className="border rounded-full flex items-center justify-center">
                            <Text className="text-2xl px-5 py-1">Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="border rounded-full">
                            <Text className="text-5xl px-6 py-3">Scan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            )}
        </View>
    )
}
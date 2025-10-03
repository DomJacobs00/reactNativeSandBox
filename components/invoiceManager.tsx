import { Image, ScrollView, Text, View, TouchableOpacity, Modal, TextInput, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {invoices, mockInvoice, mockLabourItem} from '../constants/mockData'
import { Icons } from "@/constants/Icons";
import { useEffect, useRef, useState } from "react";
import { Invoice, LabourItem } from "@/interfaces/main";
import DateTimePicker from '@react-native-community/datetimepicker';
import {InvoiceScreen} from "@/constants/InvoiceScreen";


export default function InvoiceManager () {
    const [date, setDate] = useState(new Date())
    const[page, setPage] = useState('newEdit');
    const lastPage = useRef('initial');
    const curInvoices = invoices;

    const shareFnRef = useRef<(() => void) | null>(null);

    
    const [stage, setStage] = useState(1)
    const maxStage = 5;
    const [modal, setModal] = useState(false);
    const [popModal, setPopModal ] = useState(false);

    const[selectedInvoice, setSelectedInvoice] = useState<Invoice>(mockInvoice);


    

    function formatMoney(value: number): string {
        return value.toFixed(2); // ensures 2 decimals
    }
    
    
    const formatDate = (data:Date) => {

        const dayOut = String(data.getDate()).padStart(2,"0");
        const monthOut = String(data.getMonth() +1).padStart(2,"0");
        const yearOut = data.getFullYear();
        return `${dayOut}/${monthOut}/${yearOut}`

    }
    const toDate = (str:string) => {
        const [day, month, year] = str.split('/').map(Number);
        return new Date(year, month -1, day);
    }
    const getFirstFriday = (date: Date) => {
        const result = new Date(date);
        const day = result.getDay();
        const diff = (5 - day + 7) % 7 || 7;
        result.setDate(result.getDate()+diff);
        const formatted = formatDate(result);
        return formatted;
        
    }
    const emptyInvoice:Invoice = {
        date:getFirstFriday(date),
        labourItems:[],
        subtotal:0,
        lessCis:0,
        totalDue:0
    }
    const emptyLabourItem:LabourItem = {
        id:0,
        taxFree:false,
        date:'',
        siteLocation:'',
        description:'',
        qty:'',
        rate:'',
        amount:0
    }
    const [newInvoice, setNewInvoice] = useState<Invoice>(emptyInvoice);
    const [newLabourItem, setNewLabourItem] = useState<LabourItem>(emptyLabourItem);

    const stageSelection = ( direction : 'next'|'previous') => {
        if(direction === 'next' && stage < maxStage) {
            if(newLabourItem.taxFree && stage ===2){
                setStage(stage + 2);
            } else {
                setStage(stage +1);
            }
        }
        if (direction === 'next' && stage === maxStage) {
            const parseMoney = (v: any) => {
                if (typeof v === 'number') return v;
                const n = parseFloat(String(v).replace(',', '.'));
                return isNaN(n) ? 0 : n;
            };

            const lineAmount =
                parseMoney(newLabourItem.qty) * parseMoney(newLabourItem.rate);

            const newItem = {
                ...newLabourItem,
                amount: +lineAmount.toFixed(2),
            };
            // isntead of appending we need to replace by id

            //checking if id exsists

            const dupe = newInvoice.labourItems.find(l=>l.id === newLabourItem.id)

            if (dupe) {

                 setNewInvoice(prev => {
                    const nextItems = (prev.labourItems ?? []).map(item =>
                        item.id === newItem.id ? newItem : item
                    );
                    let subtotal = 0;
                    let lessCis = 0;
                    nextItems.map((item) => {
                        subtotal += item.amount
                        if(!item.taxFree) {

                            lessCis += (Number(item.amount) * 0.2) 
                        }

                    });
                    const total  = (subtotal - lessCis)
                    
                    return {...prev, labourItems: nextItems, subtotal:subtotal, lessCis:lessCis, totalDue: total  };
                 })

            } else {
                setNewLabourItem(prev => ({
                    ...prev, 
                    id: (newInvoice.labourItems?.length?? 0) + 1
                }))

                setNewInvoice(prev => {
                    
                    const nextItems = [...(prev.labourItems ?? []), newItem];
    
                    const subtotal = +nextItems
                    .reduce((sum, li) => sum + parseMoney(li.amount), 0)
                    .toFixed(2);
    
                    const cisBase = +nextItems
                    .reduce((sum, li) => sum + (li.taxFree ? 0 : parseMoney(li.amount)), 0)
                    .toFixed(2);
    
                    const lessCis = +(cisBase * 0.2).toFixed(2);
                    const totalDue = +(subtotal - lessCis).toFixed(2);
    
                    return { ...prev, labourItems: nextItems, subtotal, lessCis, totalDue };
                });
            }
            


            setNewLabourItem(emptyLabourItem);
            closeModal();
            return;
        }

        if(direction === 'previous' && stage !== 1) {
            setStage(stage -1);
        }
    }
    const openModal = () => {
        
        setModal(true);
    }
    const closeModal = () => {
        setModal(false);
        setNewLabourItem(emptyLabourItem);
        setStage(1);
    }

    const gotoInvoice = (id:number) => {
        if(!id) return
        const invoiceToSelect = curInvoices.find(i=>i.id === id);
        if(!invoiceToSelect) return
        setSelectedInvoice(invoiceToSelect);
        setPage('edit');

    }
    const changeDateInvoice = () => {
        setPopModal(true);
    }
    const getLabourItem = (id:number) => {
        if(id === 0 )return;
        const itemToEdit = newInvoice.labourItems.find(i=>i.id === id);
        if(!itemToEdit) return;
        setNewLabourItem(itemToEdit);
        setModal(true);
    }
    const removeItem = (id:number) => {
        if(id===0)return;

    }

    //editing exsisting invoice
    const editInvoice = () => {
        if(!selectedInvoice) return;
        setNewInvoice(selectedInvoice);
        console.log(newInvoice)
        lastPage.current = 'edit'
        setPage('newEdit');
    }
    return (
        <SafeAreaView>
            {page === 'initial' && (
                <>
                    <View className="w-full mx-4 mb-5">
                        <Text className="text-3xl font-bold">Invoices</Text>
                    </View>
                    <ScrollView className=" mx-3 h-[50vh] bg-white border border-gray-400 rounded-xl shadow-sm">
                        {curInvoices.map((invoice)=> (
                            <TouchableOpacity key = {invoice.id} onPress={() => gotoInvoice(invoice.id!)} className="flex flex-row items-center">
                                <Image
                                    source={Icons.invoiceSingle}
                                    className="h-20 w-20 p-2"
                                />
                                <Text className="text-2xl font-bold w-1/3">Invoice</Text>
                                <Text className="text-2xl text-gray-400 font-light">{invoice.date}</Text>
                            </TouchableOpacity>
                        ))}

                    </ScrollView>
                    <View className="w-full h-[24vh] flex items-center justify-end">
                        <TouchableOpacity 
                            onPress={()=>setPage('newEdit')}
                            className="bg-blue-300 w-[95%] rounded-xl mb-10 border border-blue-500">
                            <Text className="text-2xl font-bold text-center p-2">New Invoice</Text>
                        </TouchableOpacity>

                    </View>
                </>
            )}
            {page === 'newEdit' && (
                <View className="flex flex-col items-center">
                    <View className={`w-full mb-5 flex flex-row ${newInvoice.labourItems.length === 0  ? '': 'justify-between'}`}>
                        <TouchableOpacity onPress={()=> {
                            if(lastPage.current !== 'initial') {

                                setPage(lastPage.current)
                                lastPage.current = 'initial';
                            }
                            else {
                                setPage('initial');
                            }

                            }}>
                            <Image 
                                source={Icons.back}
                                className="h-10 w-10"
                            />
                        </TouchableOpacity>
                        {newInvoice.labourItems.length > 0 && (
                            <TouchableOpacity className="bg-green-500 border border-green-500 rounded-lg px-3 py-1 mr-5 shadow-sm">
                                <Text className="text-3xl text-white font-bold">Save</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View className="w-[93%] mb-1 ">
                        <Text className="text-gray-400 text-xl">Invoice Details</Text>
                    </View>
                    <View className="w-[93%] bg-white border border-gray-100 rounded-lg shadow-sm flex flex-row items-center">
                        <View className="w-[85%]">
                            <View className="flex flex-row">
                                <Text className="w-1/3 text-gray-400 p-2">Number</Text>
                                <Text className="text-gray-400 p-2">Week ending/ Date</Text>
                            </View>
                            <View className="flex flex-row">
                                <Text className="w-1/3 p-2 text-lg">changeMe!</Text>
                                <Text className="py-2 px-5 text-lg">{newInvoice?.date}</Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={()=> changeDateInvoice()} className="bg-blue-50 rounded-full p-2 m-2">
                                <Image
                                    source={Icons.editPen}
                                    className="h-8 w-8"
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View className="w-[93%] my-2">
                        <Text className="text-gray-400 text-xl">Items</Text>
                    </View>
                    <ScrollView className="w-[93%] bg-white border border-gray-300 rounded-lg shadow-md h-[38vh]">
                        {newInvoice?.labourItems?.map((item) => (
                            <TouchableOpacity key={item.id} className="flex flex-row px-4 py-3" onPress={()=>getLabourItem(item.id ?? 0)}>
                                <View className="flex flex-col w-1/2 ">
                                    <Text className="text-xl">{item.siteLocation}</Text>
                                    {item.date !== '' && (
                                        <Text className="ml-2 text-gray-400">{item.date}</Text>
                                    )}
                                    {item.taxFree && (
                                        <Text className="ml-2 text-gray-400">Tax free</Text>
                                    )}
                                </View>
                                <View className="flex flex-col justify-center items-end w-1/2">
                                    <View className="flex flex-row gap-1">
                                        <Text className="text-lg">{item.qty}</Text>
                                        <Text className="text-lg">*</Text>
                                        <Text className="text-lg font-bold">£ {item.rate}</Text>
                                    </View>
                                    <View>
                                        <Text className="text-2xl font-bold">£ {item.amount}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}

                    </ScrollView>
                    <TouchableOpacity 
                        onPress= {()=>{
                            openModal()    
                        }} 
                        className="flex flex-row items-center gap-2 bg-blue-500 px-6 py-1 rounded-full z-[10] -mt-2"
                        >
                        <Image 
                            source={Icons.plusWhite}
                            className="h-4 w-4"
                        />
                        <Text className="text-xl text-white">Add Item</Text>
                    </TouchableOpacity>
                    <View className="w-[93%] bg-white border border-gray-100 rounded-lg shadow-sm flex flex-col -mt-2 px-3 py-4">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-lg">Sub Total:</Text>
                            <Text className="text-lg text-gray-400">£ {formatMoney(newInvoice?.subtotal) ?? 0.00}</Text>
                        </View>
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-lg">Less CIS (20%):</Text>
                            <Text className="text-lg text-gray-400">£ {formatMoney(newInvoice?.lessCis)?? 0.00}</Text>
                        </View>
                        <View className="flex flex-row justify-between items-center">
                            <Text className="text-lg font-bold">Total Due:</Text>
                            <Text className="text-lg font-bold">£ {formatMoney(newInvoice?.totalDue)?? 0.00}</Text>
                        </View>
                    </View>
                </View>
            )}
            {page === 'edit' && (
                <>
                    <View className="w-full h-[10vh] px-2">
                        <View className="flex flex-row mb-3 -mt-5 justify-between">
                            <TouchableOpacity onPress={()=>setPage('initial')}>
                                <Image 
                                    source={Icons.back}
                                    className="h-10 w-10"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>editInvoice()} className="border px-3 py-1 border-blue-400 bg-blue-100 rounded-lg">
                                <Text className="text-3xl">Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View className="flex flex-row">
                                <Text className="w-1/3 text-lg">Invoice Date:</Text>
                                <Text className="text-lg">Total:</Text>
                            </View>
                            <View className="flex flex-row">
                                <Text className="w-1/3 text-lg font-bold">{selectedInvoice.date ?? ''}</Text>
                                <Text className="text-lg font-bold">£ {formatMoney(selectedInvoice.totalDue)}</Text>
                            </View>
                        </View>


                    </View>
                    <View className="bg-gray-300 w-full h-[60vh]">
                        
                        <InvoiceScreen invoice={selectedInvoice} onReadyToShare={(fn) => { shareFnRef.current = fn; }}/>
                    </View>
                    <View className="bg-white w-full h-[10vh] flex flex-row py-4 px-2 justify-center border border-gray-300">
                        <TouchableOpacity onPress={() => shareFnRef.current?.()} className="flex flex-row border  rounded-full h-[5vh] gap-2 items-center px-10">
                            <Image 
                                source={Icons.share}
                                className="h-6 w-6"
                            />
                            <Text className="text-2xl">Send / Download</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            <Modal
                animationType="fade"
                transparent={true}
                visible={popModal}
                onRequestClose={()=>setPopModal(false)}
            >
                <View className="flex-1 bg-black/50 justify-center p-8 ">
                    <View className="bg-white w-full rounded-2xl p-4 h-[40vh]">
                        <View className="flex flex-row justify-end w-full">
                            <TouchableOpacity onPress={()=>setPopModal(false)}>
                                <Image
                                    source={Icons.closeIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <View className="w-full flex flex-col">
                            <Text className="w-full text-center text-2xl">Select Invoice date:</Text>
                            <View className="w-full items-center">

                                <DateTimePicker
                                    value={newInvoice.date ? toDate(newInvoice.date) : date} 
                                    mode="date"
                                    display="spinner"
                                    onChange={(_,d)=> d && setNewInvoice(prev => ({
                                        ...prev,
                                        date: formatDate(d)
                                    }))}

                                    textColor="black"

                                />
                            </View>
                        </View>
                        
                        <View className="w-full px-10">
                            <TouchableOpacity onPress={()=>setPopModal(false)} className="rounded-full border bg-green-400 border-green-500">
                                <Text className="text-2xl text-center py-1">Continue</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </Modal>
            <Modal
                animationType="slide"
                transparent = {true}
                visible={modal}
                onRequestClose={()=>closeModal()}
            >
                <View className="flex-1 bg-black/20 justify-end items-center ">
                    <View className="bg-white w-full rounded-2xl p-4 h-[80%]">
                        <View className="flex flex-row justify-between items-center w-full">
                            <Text className="text-2xl p-2 font-bold">New Invoice</Text>
                            <TouchableOpacity onPress={()=>closeModal()}>
                                <Image 
                                    source={Icons.closeIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        {stage === 1 && (
                            <View className= " w-full h-[80%] flex flex-col gap-3 " >
                                {!newLabourItem.taxFree && (
                                    <>
                                        <Text className="text-3xl font-bold"> Please select the date: </Text>
                                        <View>
                                            <DateTimePicker 
                                                value={newLabourItem.date ? toDate(newLabourItem.date) : date} 
                                                mode="date"
                                                display="spinner"
                                                onChange={(_,d) => d && setNewLabourItem(prev=>({
                                                    ...prev,
                                                    date:formatDate(d)
                                                }))}
                                                textColor="black"
                                            />
                                        </View>
                                        <View className="flex flex-row">
                                            <TouchableOpacity 
                                                onPress={() => {
                                                    setNewLabourItem(prev => ({ ...prev, date: formatDate(new Date())}))
                                                }}
                                                className={`border ${formatDate(new Date()) === newLabourItem.date ? 'bg-gray-300':'bg-gray-100'}  border-gray-400 rounded-xl w-[30%] py-1`}
                                            >
                                                <Text className="text-xl text-center">Today</Text>
                                            </TouchableOpacity>
                                        </View>
                                        
                                    </>
                                )}
                                <View className="mt-5 flex flex-row justify-between px-10 bg-gray-100 p-2">
                                    <Text className="text-2xl">Tax free?</Text>
                                    <Switch value={newLabourItem.taxFree} onValueChange={(val)=>setNewLabourItem(prev=>({
                                        ...prev,
                                        taxFree:val,
                                    }))} />
                                </View>
                                {!!newLabourItem.id && (
                                    <View className="w-full mt-10 ">
                                        <TouchableOpacity onPress={()=>removeItem(newLabourItem.id!)} className="bg-red-500 w-1/2 px-4 py-1 rounded-full border border-red-400 shadow-sm" >
                                            <Text className="text-2xl text-center text-white font-bold">Delete Item</Text>
                                            </TouchableOpacity>
                                    </View>
                                )}
                            </View>

                        )}
                        {stage === 2 && (
                            <>
                                <View className="w-full h-[80%] flex flex-col justify-between">
                                    <View className="mt-10">
                                        <Text className="text-3xl font-bold"> Site address/Location:</Text>
                                        <TextInput
                                            value={newLabourItem.siteLocation} 
                                            onChangeText={(t)=> {
                                                setNewLabourItem(prev => ({
                                                    ...prev,
                                                    siteLocation: t
                                                }))
                                            }}
                                            className="border border-gray-400 rounded-md text-2xl py-2 px-2 mt-10"
                                        />
                                    </View>

                                </View>
                            </>
                        )}
                        {stage === 3 && (
                            <>
                                <View className="w-full h-[80%] flex flex-col justify-between">
                                    <View className="mt-10">
                                        <Text className="text-3xl font-bold"> Detailed Job Description:</Text>
                                        <TextInput
                                            value={newLabourItem.description}
                                            onChangeText={(t) => {
                                                setNewLabourItem(prev => ({
                                                    ...prev,
                                                    description: t
                                                }))
                                            }} 
                                            className="border border-gray-400 rounded-md text-2xl py-2 px-2 mt-10"
                                            numberOfLines={5}
                                        />
                                    </View>
                                </View>
                            </>
                        )}
                        {stage === 4 && (
                            <>
                                <View className="w-full h-[80%] flex flex-col">
                                    <View>
                                        <Text className="text-3xl font-bold">Quantity</Text>
                                        <TextInput
                                            value={newLabourItem.qty ?  String(newLabourItem.qty) : ''}
                                            onChangeText={(t) => {
                                                setNewLabourItem(prev => ({
                                                    ...prev,
                                                    qty: t
                                                }))
                                            }}
                                            className="border border-gray-400 rounded-md text-2xl py-2 px-2 my-10 mx-10 text-center"
                                            keyboardType="number-pad"
                                            returnKeyType="done"
                                            style={{
                                                color:'black'
                                            }}
                                        />
                                    </View>
                                    <View>
                                        <Text className="text-3xl font-bold">Rate</Text>
                                        <TextInput 
                                            value={newLabourItem.rate ?? ''}
                                            onChangeText={(t) => {
                                                const txt = t.replace(",", ".")
                                                if(/^\d*\.?\d{0,2}$/.test(txt) || txt === "") {
                                                    setNewLabourItem(prev => ({
                                                        ...prev,
                                                        rate: txt
                                                    }))
                                                }
                                            }}
                                            className="border border-gray-400 rounded-md text-2xl py-2 px-2 my-10 mx-10 text-center"
                                            keyboardType="numeric"
                                            returnKeyType="done"
                                            style={{
                                                color:'black'
                                            }}
                                            onEndEditing={()=> {
                                                const num = parseFloat((newLabourItem.rate || "0").replace(",", "."));
                                                const fixed = isNaN(num) ? "0.00" : num.toFixed(2);
                                                setNewLabourItem(prev => ({ ...prev, rate: fixed }));
                                            }}  
                                        />
                                    </View>
                                </View>
                            </>
                        )}
                        {stage === 5 && (
                            <>
                                <View className="w-full h-[80%] flex flex-col">
                                    <Text className="text-3xl mb-5">Item summary:</Text>
                                    <View className="flex flex-col">
                                        <Text className="text-2xl font-bold ">Date:</Text>
                                        <Text className="text-2xl ml-2">{newLabourItem.date ?? ''}</Text>
                                    </View>
                                    <View className="flex flex-col">
                                        <Text className="text-2xl font-bold">Site address/location:</Text>
                                        <Text className="text-2xl ml-2">{newLabourItem.siteLocation ?? ''}</Text>
                                    </View>
                                    <View className="flex flex-col">
                                        <Text className="text-2xl font-bold">Description:</Text>
                                        <Text className="text-2xl ml-2">{newLabourItem.description ?? ''}</Text>
                                    </View>
                                    <View className="flex flex-col">
                                        <Text className="text-2xl font-bold">Quantity:</Text>
                                        <Text className="text-2xl ml-2">{newLabourItem.qty ?? ''}</Text>
                                    </View>
                                    <View className="flex flex-col">
                                        <Text className="text-2xl font-bold">Rate:</Text>
                                        <Text className="text-2xl ml-2">£ {newLabourItem.rate ?? ''}</Text>
                                    </View>
                                </View>
                            </>
                        )}
                        <View className={`w-full flex flex-row ${stage === 1 ? 'justify-end' : 'justify-between'}  items-end`}>
                            {stage !== 1 && (

                                <TouchableOpacity onPress={()=>stageSelection('previous')} className="bg-blue-500 w-[40%] border border-blue-500 rounded-lg px-4 py-1">
                                    <Text className="text-white text-center text-3xl">Previous</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={()=>stageSelection('next')} className="bg-blue-500 w-[40%] border border-blue-500 rounded-lg px-4 py-1">
                                {stage !== maxStage ? (

                                    <Text className="text-white text-center text-3xl">Next</Text>
                                ): (
                                    <Text className="text-white text-center text-3xl">Add</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            

        </SafeAreaView>
    )
}
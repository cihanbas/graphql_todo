import React, { PureComponent, useState } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useQuery, useMutation } from '@apollo/react-hooks';
import DropDown from '../utils/selectOption'
import { colors } from '../utils/colors';
import { getAuthorsQuery, ADD_BOOK,getBooksQuery } from '../queries/queries'
const genres = [
    { title: 'fantastic' },
    { title: 'science' },
    { title: 'biography' },
    { title: 'funny' },
]

const addBookComponent = () => {
    const { loading, error,data  } = useQuery(getAuthorsQuery);
    const authorsData = useQuery(getAuthorsQuery)

    const [id, setID] = useState("");
    const [genre, setGenre] = useState("");
    const [value, onChangeText] = useState("");
    const [addTodo ,vaka ] = useMutation(ADD_BOOK);  
    console.log('vaka :', vaka);
     const addbook = () => {
        const bookData = {
            name: value,
            authorId: id,
            genre
        }; 
        addTodo({ variables: bookData,refetchQueries:[{
            query:getBooksQuery
        }]})

        onChangeText("");
     }
    if (loading) return <Text>Loading...</Text>
    if (error) return <Text>Error...</Text>
    const { authors } =  data

    return <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Input
            placeholder='Book Name'
            onChangeText={text => onChangeText(text)}
            value={value}
            containerStyle={{ borderColor: colors.primary, borderWidth: 0, paddingBottom: 20 }}
        />
        <DropDown
            dropdownTitle={'Select Author'}
            data={authors}
            title="Select Author"
            titleColName='name'
            onPress={item => setID(item.id)}
        />
        <DropDown
            dropdownTitle={'Select Genre'}
            data={genres}
            title="Select Genre"
            onPress={item => setGenre(item.title)}
        />
        <Button
            containerStyle={{ paddingVertical: 40, bottom: 0, position: 'absolute', left: 10, right: 10 }}
            title="Add Book"
            onPress={addbook}
            type="outline"
        />
    </View>
}

export default addBookComponent;
import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function Readers(props) {

    const renderDirectoryItem = ({item}) => {
        return (
            <ListItem
                title={item.title}
                subtitle={`by ${item.author}  /  ${item.category}`}
                leftAvatar={{ source: { uri: item.image }}}
                onPress={() => props.onPress(item.id)}
                bottomDivider
            />
        );
    };

    return (
        <FlatList
            data={props.books}
            renderItem={renderDirectoryItem}
            keyExtractor={item => item.id.toString()}
        />
    );
}

export default Readers;
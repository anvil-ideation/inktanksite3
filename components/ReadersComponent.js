import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function Readers(props) {

    const renderDirectoryItem = ({item}) => {
        return (
            <ListItem
                title={item.title}
                subtitle={item.description}
                leftAvatar={{ source: require(item.image)}}
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
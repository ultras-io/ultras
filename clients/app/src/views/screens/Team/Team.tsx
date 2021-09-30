
import React from 'react';
import {View, Text} from 'react-native';

import {ITeamProps} from './types';

import styles from './styles';

const Team: React.FC<ITeamProps> = ({title}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};

export default Team;

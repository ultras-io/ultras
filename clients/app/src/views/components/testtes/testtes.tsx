
import React from 'react';
import {View} from 'react-native';
import UltrasText from 'views/components/base/UltrasText';

import {ItesttesProps} from './types';

import styles from './styles';

const testtes: React.FC<ItesttesProps> = ({title}) => {
    return (
        <View style={styles.container}>
            <UltrasText style={styles.text}>{title}</UltrasText>
        </View>
    );
};

export default React.memo<ItesttesProps>(testtes);


'use strict';


const getTypesBaseCode = (name) => `
export interface I${name}Props {
    title: string;
};
`;

const getStylesBaseCode = () => `
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 8,
        alignSelf: 'flex-start',
    },
    text: {
        fontWeight: '600',
        textAlign: 'center',
    },
});
`;

const getComponentBaseCode = (name) => `
import React from 'react';
import {View, Text} from 'react-native';

import {I${name}Props} from './types';

import styles from './styles';

const ${name}: React.FC<I${name}Props> = ({title}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};

export default ${name};
`;

const getExportsBaseCode = (name) => `
import ${name} from './${name}';
export default ${name};

export * from './types';
export * from './${name}';
`;

module.exports = {
    getTypesBaseCode,
    getStylesBaseCode,
    getComponentBaseCode,
    getExportsBaseCode
};

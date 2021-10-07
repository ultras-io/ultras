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
    },
    text: {
        fontSize: 12,
    },
});
`;

const getComponentBaseCode = (name) => `
import React from 'react';
import {View} from 'react-native';
import UltrasText from 'views/components/base/UltrasText';

import {I${name}Props} from './types';

import styles from './styles';

const ${name}: React.FC<I${name}Props> = ({title}) => {
    return (
        <View style={styles.container}>
            <UltrasText style={styles.text}>{title}</UltrasText>
        </View>
    );
};

export default React.memo<I${name}Props>(${name});

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

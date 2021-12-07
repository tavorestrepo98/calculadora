/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import {styles} from '../theme/AppTheme';

interface BotonCalcProps {
  texto: string;
  color?: string;
  ancho?: boolean;
  accion: (numeroText: string) => void;
}

export const BotonCalc: FC<BotonCalcProps> = ({
  texto,
  color = '#2D2D2D',
  ancho = false,
  accion,
}) => {
  return (
    <TouchableOpacity onPress={() => accion(texto)}>
      <View
        style={{
          ...styles.boton,
          backgroundColor: color,
          width: ancho ? 180 : 80,
        }}>
        <Text
          style={{
            ...styles.botonTexto,
            color: color === '#9B9B9B' ? 'black' : 'white',
          }}>
          {texto}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

BotonCalc.propTypes = {
  texto: PropTypes.string.isRequired,
  color: PropTypes.string,
  ancho: PropTypes.bool,
  accion: PropTypes.func.isRequired,
};

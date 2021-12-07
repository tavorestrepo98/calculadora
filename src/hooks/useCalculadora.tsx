import {useState, useRef} from 'react';
import {Alert, Platform, ToastAndroid} from 'react-native';

enum Operadores {
  sumar,
  restar,
  multiplicar,
  dividir,
}

export const useCalculadora = () => {
  const [numeroAnterior, setNumeroAnterior] = useState('0');
  const [numero, setNumero] = useState('0');

  const ultimaOperacion = useRef<Operadores>();

  const limpiar = () => {
    setNumeroAnterior('0');
    setNumero('0');
  };

  const armarNumero = (numeroTexto: string) => {
    //No aceptar mas de 1 punto
    if (numero.includes('.') && numeroTexto === '.') {
      return;
    }

    if (numero.startsWith('0') || numero.startsWith('-0')) {
      //punto decimal
      if (numeroTexto === '.') {
        setNumero(numero + numeroTexto);
      } else if (numeroTexto === '0' && numero.includes('.')) {
        setNumero(numero + numeroTexto);
      } else if (numeroTexto !== '0' && !numero.includes('.')) {
        setNumero(numeroTexto);
      } else if (numeroTexto === '0' && !numero.includes('.')) {
        setNumero(numero);
      } else {
        setNumero(numero + numeroTexto);
      }
    } else {
      setNumero(numero + numeroTexto);
    }
  };

  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };

  const eliminarUltimoDigito = () => {
    if (numero.length === 2 && numero.includes('-')) {
      setNumero('0');
    } else if (numero.length === 1) {
      setNumero('0');
    } else {
      setNumero(numero.slice(0, numero.length - 1));
    }
  };

  const cambiarNumeroAnterior = () => {
    if (numero.endsWith('.')) {
      setNumeroAnterior(numero.slice(0, -1));
    } else {
      setNumeroAnterior(numero);
    }
    setNumero('0');
  };

  const btnDividir = () => {
    cambiarNumeroAnterior();
    ultimaOperacion.current = Operadores.dividir;
  };

  const btnMultiplicar = () => {
    cambiarNumeroAnterior();
    ultimaOperacion.current = Operadores.multiplicar;
  };

  const btnRestar = () => {
    cambiarNumeroAnterior();
    ultimaOperacion.current = Operadores.restar;
  };

  const btnSumar = () => {
    cambiarNumeroAnterior();
    ultimaOperacion.current = Operadores.sumar;
  };

  const calcular = () => {
    const num1 = Number(numero);
    const num2 = Number(numeroAnterior);

    switch (ultimaOperacion.current) {
      case Operadores.sumar:
        setNumero(`${num1 + num2}`);
        break;

      case Operadores.restar:
        setNumero(`${num2 - num1}`);
        break;

      case Operadores.multiplicar:
        setNumero(`${num1 * num2}`);
        break;

      case Operadores.dividir:
        if (num1 !== 0) {
          setNumero(`${num2 / num1}`);
        } else {
          if (Platform.OS !== 'ios') {
            ToastAndroid.show("Can't divide by zero!", ToastAndroid.LONG);
          } else {
            Alert.alert("Can't divide by zero!");
            setNumero('0');
          }
        }
        break;
      default:
        break;
    }
    setNumeroAnterior('0');
  };

  return {
    numero,
    numeroAnterior,
    setNumero,
    setNumeroAnterior,
    limpiar,
    armarNumero,
    positivoNegativo,
    eliminarUltimoDigito,
    btnDividir,
    btnMultiplicar,
    btnRestar,
    btnSumar,
    calcular,
  };
};

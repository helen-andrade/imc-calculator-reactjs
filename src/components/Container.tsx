import React, { useState } from 'react';

const Container = () => {
  const [weight, setWeight] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [imc, setImc] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const formatInput = (value: string) => {
    return value.replace(',', '.');
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatInput(e.target.value);
    setWeight(formattedValue === '' ? '' : Number(formattedValue));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatInput(e.target.value);
    setHeight(formattedValue === '' ? '' : Number(formattedValue));
  };

  const calculateIMC = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const imcValue = weight / (heightInMeters * heightInMeters);
      setImc(imcValue);
      setCategory(getIMCCategory(imcValue));
      setVisible(true);
    }
  };

  const getIMCCategory = (imcValue: number) => {
    if (imcValue < 18.5) {
      return 'Abaixo do peso';
    } else if (imcValue >= 18.5 && imcValue < 24.9) {
      return 'Peso normal';
    } else if (imcValue >= 25 && imcValue < 29.9) {
      return 'Sobrepeso';
    } else if (imcValue >= 30 && imcValue < 34.9) {
      return 'Obesidade grau I';
    } else if (imcValue >= 35 && imcValue < 39.9) {
      return 'Obesidade grau II';
    } else {
      return 'Obesidade grau III';
    }
  };

  const clearFields = () => {
    setWeight('');
    setHeight('');
    setImc(null);
    setCategory(null);
    setVisible(false);
  };

  return (
    <div className='container'>
      <h1>Calculadora de IMC</h1>
      <input 
        className='weight' 
        type="text" 
        required 
        placeholder='Digite seu peso'
        value={weight === '' ? '' : weight.toString()}
        onChange={handleWeightChange}
      />
      <input 
        className='height' 
        type="text" 
        required 
        placeholder='Digite sua altura'
        value={height === '' ? '' : height.toString()}
        onChange={handleHeightChange}
      />
      <button onClick={calculateIMC}>Calcular IMC</button>

      {visible && (
        <>
          <span className='imc-result' style={{ visibility: 'visible' }}>
            Seu IMC é: {imc?.toFixed(2)} - {category}
          </span>
          <button className='clear' onClick={clearFields} style={{ visibility: 'visible' }}>
            Limpar 🧹
          </button>
        </>
      )}
    </div>
  );
};

export default Container;
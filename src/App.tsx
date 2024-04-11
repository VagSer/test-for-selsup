import { useEffect, useRef, useState } from 'react';
import './App.css'

type Color = `#${string}`

interface Param {
  id: number;
  name: string;
  type: `string`;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}


export default function App() {
  const [params, setParams] = useState([
    {id: 1, name: 'Назначение'},
    {id: 2, name: 'Длина'}
  ] as Param[])

  const inputNewParam = useRef<HTMLInputElement>(null)

  const [paramValues, setParamValues ]= useState([
    {paramId: 1, value: ''},
    {paramId: 2, value: ''},
  ] as ParamValue[])

  const [model, setModel] = useState({
    paramValues, colors: ['#ffffff'],
  } as Model)

  const addNewParam = () => {
    if (inputNewParam.current) {
      let newParam = inputNewParam.current.value.replace(/\s{2,}/g, ' ').trim() 
      if (newParam) {
        let newId = Date.now()
        setParams([...params, {id: newId, name: newParam, type: `string`}])
        setParamValues([...paramValues, {paramId: newId, value: ''}])
      }
      inputNewParam.current.value = ''
    }
  }

  const getName = (paramId: number) => {
    const searchParam = params.find(param => param.id === paramId)
    return searchParam?.name
  }

  const updateModel = (paramId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    let innerParamValues = [...paramValues].map(param => param.paramId === paramId? 
      {paramId, value: event.target.value} : {...param})
    setParamValues(innerParamValues)
  }

  const getModel = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(model)
  }

  useEffect(() => {
    setModel({...model, paramValues})
  }, [paramValues])

  return (
    <>
      <form className='paramsForm' onSubmit={event => getModel(event)}>
        {model.paramValues.map(param => 
          <div key={param.paramId}>
            <label htmlFor={param.paramId.toString()}>
              {getName(param.paramId)}
            </label>
            <input 
              type='text'
              id={param.value}
              onChange={event => updateModel(param.paramId, event)}
              placeholder='Введите значение...'
            />
          </div>
        )}
        <div>
          <input 
            type='text'
            ref={inputNewParam}
            placeholder='Новый параметр'
          />
          <button type='button' onClick={addNewParam}>
            Добавить параметр
          </button>
        </div>
        <button>
          getModel
        </button>
      </form>
    </>
  )
}
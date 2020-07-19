import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import axios from 'axios'
import { LeafletMouseEvent } from 'leaflet'

import api from '../../services/api'
import './styles.css'
import logo from '../../assets/logo.svg'

// Definição dos tipos de dados que virão no obj retornado da API
interface Item {
    id: number
    title: string
    image_url: string
}

interface IBGEUFResponse {
    sigla: string
}

interface IBGECityResponse {
    nome: string
}

/**
 * Qual função quero executar e quando(quando tal informação mudar).
 * 
 * useEffect() necessária para que a função seja executada sem a 
 * necessidade de que a funcão de render seja executada inteira novamente
 * 
 * Se as [] estiverem vazias, a função será executada uma vez quando o 
 * componente for exibido na tela, caso tenha algum valor a função será
 * executada sempre que o valor for alterado
 * 
 * O estado armazena infos dentro do componente
 * 
 * Sempre que se cria estado para array ou obj, dese-se informar manualmente
 * o tipo da variável
 */

const CreatePoint = () => {
    // Estados
    const [items, setItems] = useState<Array<Item>>([])
    const [ufs, setUfs] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])
    const [selectedUf, setSelectedUf] = useState('0')
    const [selectedCity, setSelectedCity] = useState('0')
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    })
    const [selectedItems, setSelectedItems] = useState<number[]>([0, 0])

    const history = useHistory()

    useEffect(() => {
        // navigator.geolocation.getCurrentPosition(position =>{
        //     const latitude = position.coords.longitude
        //     const longitude = position.coords.latitude
        const latitude = -23.5503099
        const longitude = -46.6342009

            setInitialPosition([latitude, longitude])
    }, [])

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data)
        })
    }, [])

    useEffect(() => {
        axios
            .get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const ufName = response.data.map(uf => uf.sigla)
                setUfs(ufName)
        })
    }, [])

    useEffect(() => {
        axios
            .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                const cityNames = response.data.map(city => city.nome)  
                setCities(cityNames)
        })
    }, [selectedUf])   

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value    
        setSelectedUf(uf)
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value    
        setSelectedCity(city)
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    // ??
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        // ... copia todas as infos dentro do formData
        setFormData({ ...formData, [name]: value })
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id)

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id)
            setSelectedItems(filteredItems)
        } else {
            setSelectedItems([ ...selectedItems, id ])
        }

    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const { name, email, whatsapp } = formData
        const uf = selectedUf
        const city = selectedCity
        const [latitude, longitude] = selectedPosition
        const items = selectedItems
        
        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        }

        await api.post('points', data)

        alert('Ponto de coleta criado')

        history.push('/')
    }

/**
 * O primeiro item do map deve ter um valor no key={}. Esse valor tem que ser um valor que será único para cada item contido dentro do obj.
 */

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt=""/>
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>


            <form onSubmit={handleSubmit}>
                <h1>Cadastro do<br /> ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                            <input type="text" name="name" id="name" onChange={handleInputChange}/>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email" onChange={handleInputChange} />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input type="text" name="whatsapp" id="whatsapp"onChange={handleInputChange} />
                        </div>

                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione um endereço no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
                        <TileLayer 
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition} />
                    </Map>

                </fieldset>

                <div className="field-group">
                    <div className="field">
                        <label htmlFor="uf">Estado (UF)</label>
                        <select value={selectedUf}  onChange={handleSelectUf} name="uf" id="uf">
                            <option value="0">Selecione uma UF</option>
                            {ufs.map(uf => (
                                <option key={uf} value={uf}>{uf}</option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <label htmlFor="uf">Cidade</label>
                        <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                        <option value="0">Selecione uma cidade</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                </div>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        { items.map(item =>  {
                            return (
                                <li
                                    key={item.id}
                                    onClick={() => handleSelectItem(item.id)}
                                    className={selectedItems.includes(item.id) ? 'selected' : ''}
                                >
                                    <img src={item.image_url} alt="Teste"/>
                                    <span>{item.title}</span>
                                </li>                        
                            )
                        })}
                    </ul>

                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>

            </form>

        </div>
    )
}

export default CreatePoint
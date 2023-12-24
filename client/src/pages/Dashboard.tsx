import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Fatura } from '../models/Fatura';



const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

const Dashboard = () => {

    const [faturas, setFaturas] = useState<Fatura[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFaturas = faturas.filter(fatura => 
        fatura.numero_cliente.includes(searchTerm)
    );

    const energyData = filteredFaturas.map(fatura => {
        return {
            name: fatura.mes_referencia,
            energy: fatura.energia_eletrica_quantidade + fatura.energia_scee_quantidade,
            compensatedEnergy: fatura.energia_compensada_quantidade
        };
    });
    
    const monetaryData = filteredFaturas.map(fatura => {
        return {
            name: fatura.mes_referencia,
            totalWithoutGD: fatura.energia_eletrica_valor + fatura.energia_scee_valor + fatura.contrib_ilum_publica,
            gdSavings: fatura.energia_compensada_valor
        };
    });

    const fetchFaturas = async () => {
        try {
            const response = await axios.get('http://localhost:8080/faturas');
            setFaturas(response.data);
        } catch (error: any) {
            console.error('Error fetching faturas:', error);
        }
    };

    useEffect(() => {
        fetchFaturas();
    }, []);

    const calculateConsumoEnergiaElétrica = (fatura: Fatura) => {
        const energia_eletrica_quantidade = fatura.energia_eletrica_quantidade;
        const energia_scee_quantidade = fatura.energia_scee_quantidade;
    
        return energia_eletrica_quantidade + energia_scee_quantidade;
    }

  return (
    <main className='w-screen flex'>
    <Sidebar />
    <section className='flex flex-col p-10 gap-10 justify-center items-center w-full'>
    <h1>Dashboard</h1>

    <input 
    type="text" 
    value={searchTerm} 
    onChange={(e) => setSearchTerm(e.target.value)} 
    placeholder="Pesquisar por número de cliente" 
    className='p-2 w-1/2 rounded border-2 border-gray-500'
/>

    <section className='flex flex-wrap gap-10'>

    <div className='flex flex-col gap-3'>
        <h2 className='text-xl font-bold'>Consumo de Energia Elétrica</h2>
        <LineChart width={600} height={300} data={energyData}>
            <Line type="monotone" dataKey="energy" stroke="#8884d8" />
            <Line type="monotone" dataKey="compensatedEnergy" stroke="#82ca9d" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>

        <LineChart width={600} height={300} data={monetaryData}>
            <Line type="monotone" dataKey="totalWithoutGD" stroke="#8884d8" />
            <Line type="monotone" dataKey="gdSavings" stroke="#82ca9d" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>
        </div>
        <div className='flex flex-col gap-3'>
        <h2 className='text-xl font-bold'>Energia Compensada</h2>
        </div>
        <div className='flex flex-col gap-3'>
        <h2 className='text-xl font-bold'>Valor total sem GD</h2>
        </div>
        <div className='flex flex-col gap-3'>
        <h2 className='text-xl font-bold'>Economia GD</h2>
        </div>

  </section>
  </section>
    </main>
  )
}

export default Dashboard
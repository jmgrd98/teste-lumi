import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Fatura } from '../models/Fatura';

const Dashboard = () => {
    const [faturas, setFaturas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [energyData, setEnergyData] = useState([]);
    const [monetaryData, setMonetaryData] = useState([]);

    useEffect(() => {
        const fetchFaturas = async () => {
            try {
                const response = await axios.get('http://localhost:8080/faturas');
                setFaturas(response.data);
                processChartData(response.data);
            } catch (error) {
                console.error('Error fetching faturas:', error);
            }
        };
        fetchFaturas();
    }, []);

    useEffect(() => {
        const filteredFaturas = searchTerm ? faturas.filter((fatura: Fatura) => fatura.numero_cliente.includes(searchTerm)) : faturas;
        processChartData(filteredFaturas);
    }, [searchTerm, faturas]);

    const filteredFaturas = searchTerm
        ? faturas.filter((fatura: Fatura) => fatura.numero_cliente.includes(searchTerm))
        : faturas;

        const processChartData = (faturas: Fatura[]) => {
            const energyChartData = faturas.map((fatura: Fatura) => ({
                name: fatura.mes_referencia,
                Consumo: fatura.energia_eletrica_quantidade + fatura.energia_scee_quantidade,
                'Energia Compensada': fatura.energia_compensada_quantidade
            }));
        
            const monetaryChartData = faturas.map(fatura => ({
                name: fatura.mes_referencia,
                'Total sem GD': (fatura.energia_eletrica_valor + fatura.energia_scee_valor + fatura.contrib_ilum_publica).toFixed(2),
                'Economia GD': fatura.energia_compensada_valor
            }));
        
            setEnergyData(energyChartData);
            setMonetaryData(monetaryChartData);
        };
        

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
                <div className='flex flex-wrap gap-10'>
                <div className='flex gap-5 text-center items-center justify-center'>
                    <div className='flex flex-col gap-3 text-center w-full items-center'>
                        <h2 className='text-xl font-bold'>Consumo de Energia Elétrica (KWh)</h2>
                        <LineChart width={400} height={200} data={energyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Consumo" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="Energia Compensada" stroke="#82ca9d" />
                        </LineChart>
                    </div>
                    <div className='flex flex-col gap-3 text-center w-full items-center'>
                        <h2 className='text-xl font-bold'>Valores Monetários (R$)</h2>
                        <LineChart width={400} height={200} data={monetaryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Total sem GD" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="Economia GD" stroke="#82ca9d" />
                        </LineChart>
                    </div>
                </div>
                </div>
            </section>
        </main>
    );
};

export default Dashboard;

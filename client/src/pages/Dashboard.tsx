import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

const Dashboard = () => {

    const [faturas, setFaturas] = useState([]);

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

    const calculateConsumoEnergiaElétrica = (fatura: any) => {
        const energia_eletrica_quantidade = fatura.energia_eletrica_quantidade;
        const energia_scee_quantidade = fatura.energia_scee_quantidade;
    
        return energia_eletrica_quantidade + energia_scee_quantidade;
    }

  return (
    <main className='w-screen flex'>
    <Sidebar />
    <section className='flex flex-col p-10 gap-10 justify-center items-center w-full'>
    <h1>Dashboard</h1>

    <section className='flex flex-wrap gap-10'>

    <div className='flex flex-col gap-3'>
        <h2 className='text-xl font-bold'>Consumo de Energia Elétrica</h2>
        <LineChart width={600} height={300} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
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
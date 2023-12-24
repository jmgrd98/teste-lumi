import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

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

  return (
    <main className='w-screen flex'>
    <Sidebar />
    <h1>Dashboard</h1>
    </main>
  )
}

export default Dashboard
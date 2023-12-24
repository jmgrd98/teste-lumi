import {useState, useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import { Button, Table, Space } from 'antd';

const Library = () => {
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

    const searchFaturas = async (numeroCliente: string) => {
        if (numeroCliente) {
            try {
                const response = await axios.get(`http://localhost:8080/faturas/cliente/${numeroCliente}`);
                setFaturas(response.data);
            } catch (error) {
                console.error(error);
            }
        } else {
            fetchFaturas();
        }
    };

    const columns = [
        {
            title: 'Número Cliente',
            dataIndex: 'numero_cliente',
            key: 'numero_cliente'
        },
        {
            title: 'Mês Referência',
            dataIndex: 'mes_referencia',
            key: 'mes_referencia'
        },
        {
            title: 'Quantidade Energia Elétrica',
            dataIndex: 'energia_eletrica_quantidade',
            key: 'energia_eletrica_quantidade'
        },
        {
            title: 'Valor Energia Elétrica',
            dataIndex: 'energia_eletrica_valor',
            key: 'energia_eletrica_valor'
        },
        {
            title: 'Download',
            key: 'download',
            render: (_, record) => (
                <a href={`http://localhost:8080/faturas/download/${record.id}`} download>
                    Download
                </a>
            )
        }
    ];

    const paginationConfig = {
        pageSize: 5,
        showSizeChanger: false,
    };

  return (
    <main className='w-screen flex'>
        <Sidebar/>
        <section className='flex flex-col gap-10 p-10 justify-center items-center w-full'>
         <h1>Faturas</h1>
         <input
            type='text'
            placeholder='Pesquise um número de cliente'
            onChange={(e) => searchFaturas(e.target.value)} 
            className='p-2 w-1/2 rounded border-2 border-gray-500'
            />
            <Table dataSource={faturas} columns={columns}  pagination={paginationConfig} />
    </section>
    </main>
  )
}

export default Library
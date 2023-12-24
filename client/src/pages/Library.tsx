import {useState, useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios';

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
            <table className='w-full'>
                <thead className='w-full text-center'>
                    <tr>
                        <th>ID</th>
                        <th>Número Cliente</th>
                        <th>Mês Referência</th>
                        <th>Quantidade Energia Elétrica</th>
                        <th>Valor Energia Elétrica</th>
                        <th>Download</th>
                    </tr>
                </thead>
                <tbody className='w-full text-center'>
                    {faturas.map(fatura => (
                        <tr key={fatura.id}>
                            <td>{fatura.id}</td>
                            <td>{fatura.numero_cliente}</td>
                            <td>{fatura.mes_referencia}</td>
                            <td>{fatura.energia_eletrica_quantidade}</td>
                            <td>{fatura.energia_eletrica_valor}</td>
                            <td>
                                <a href={`http://localhost:8080/faturas/download/${fatura.id}`} download>
                                    Download
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </section>
    </main>
  )
}

export default Library
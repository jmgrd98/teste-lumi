import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {

    const [faturas, setFaturas] = useState([]);

    const fetchFaturas = async () => {
        try {
            const response = await axios.get('http://localhost:8080/');
            setFaturas(response.data); // Make sure to use response.data
        } catch (error) {
            console.error('Error fetching faturas:', error);
        }
    };

    useEffect(() => {
        fetchFaturas();
    }, []);



  return (
    <main>
         <h1>Faturas</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Número Cliente</th>
                        <th>Mês Referência</th>
                        <th>Quantidade Energia Elétrica</th>
                        <th>Valor Energia Elétrica</th>
                    </tr>
                </thead>
                <tbody>
                    {faturas.map(fatura => (
                        <tr key={fatura.id}>
                            <td>{fatura.id}</td>
                            <td>{fatura.numero_cliente}</td>
                            <td>{fatura.mes_referencia}</td>
                            <td>{fatura.energia_eletrica_quantidade}</td>
                            <td>{fatura.energia_eletrica_valor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </main>
  )
}

export default Dashboard
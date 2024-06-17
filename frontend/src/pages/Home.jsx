import { Flex, Input } from "@chakra-ui/react";
import { CardReserva } from "../components/CardReserva";
import { useEffect, useState } from "react";
import axios from "axios";


export function Home({ token }) {
    const [reservas, setReservas] = useState([]);
    const [filtroNomeSala, setFiltroNomeSala] = useState("");

    useEffect(() => {
        fetchReservas();
    }, [token]);

    const fetchReservas = async () => {
        try {
            const req = await axios.get('http://localhost:8800/reservas',{
                headers: { Authorization: token },
            });

            const reservas = req.data;
            reservas.sort((a, b) => new Date(a.data_uso) - new Date(b.data_uso));
            setReservas(reservas);
            console.log("Reservas:", reservas);
        } catch (error) {
            console.log("Erro ao buscar reservas:", error);

        }
    };

    const handleFiltroNomeSalaChange = (e) => {
        setFiltroNomeSala(e.target.value);
    };

    return (
        <>
            <Flex pl='7rem' mt='2rem' w='90%'>
                <Input
                    className="bg-slate-300"
                    pr='4.5rem'
                    type="text"
                    placeholder='Pesquisar...'
                    color='black'
                    value={filtroNomeSala}
                    onChange={handleFiltroNomeSalaChange}
                />
            </Flex>

            <Flex wrap='wrap' px='6rem' mt='2rem'>
                {reservas.length > 0 ? (
                    reservas
                    .filter(reservas => {
                        if (typeof reservas.nome_sala === 'string' && typeof filtroNomeSala === 'string') {
                            return reservas.nome_sala.toLowerCase().includes(filtroNomeSala.toLowerCase());
                        }
                        return false; // ou outra ação adequada se algum deles não for uma string válida
                    })
                    .map((reservas, index) => (
                        <CardReserva key={index} reservas={reservas} />
                    ))
                    ) : (
                        <p>Nenhuma reserva encontrada</p>
                    )}
            </Flex>
        </>
    );
}

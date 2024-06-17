import React from "react";
import { Card, CardBody, Stack, Text, Flex } from "@chakra-ui/react";
import { PerfilUsuario } from "../PerfilUsuario";



export function CardReserva({ reservas }) {
    console.log("Reserva recebida:", reservas); // Verifica a reserva recebida

    const formatarData = (data) => {
        const date = new Date(data)
        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <Card
            w='20rem'
            mx='1rem'
            mb='2rem'
            color='white'
            bg='gray'>
            <CardBody>
                <Flex justifyContent='center'>
                    <PerfilUsuario nomeUsuario={'Pedro'} />
                </Flex>
                <Stack mt='6' spacing='3'>
                    <Text fontWeight='bold'>Nome da sala: {reservas.nome_sala}</Text>
                    <Text>local da sala: {reservas.local_sala}</Text>
                    <Text>Data: {formatarData(reservas.data_uso)}</Text>
                    <Text>Hora inicial: {reservas.hora_inicio_uso}</Text>
                    <Text>Hora final: {reservas.hora_final_uso}</Text>
                    <Text>Responsável: {reservas.responsavel}</Text>
                </Stack>
            </CardBody>
        </Card>
    )
}
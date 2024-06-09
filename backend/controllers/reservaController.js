import jwt from 'jsonwebtoken';
import { createConnection } from '../db.js';
import * as dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const getReservas = async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ message: "Token não fornecido!" });

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token inválido' });

        const q = "SELECT * FROM reserva WHERE usuario_id = ?";
        const id = decoded.id;

        let conn;
        try {
            const db = await createConnection();
            const conn = await db.getConnection()
            const data = await conn.query(q, [id]);
            return res.status(200).json(data);
        } catch (err) {
            return res.json(err);
        } finally {
            if (conn) conn.end();
        }
    });
};

export const addReserva = async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ message: "Token não fornecido!" });

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token inválido' });

        const q = "INSERT INTO reserva(nome_sala, local_sala, data_uso, hora_inicio_uso, hora_final_uso, responsavel, motivo_uso, info_gerais, convidados, usuario_id) VALUES (?,?,?,?,?,?,?,?,?,?)";

        const values = [
            req.body.nome_sala,
            req.body.local_sala,
            req.body.data_uso,
            req.body.hora_inicio_uso,
            req.body.hora_final_uso,
            req.body.responsavel,
            req.body.motivo_uso,
            req.body.info_gerais,
            req.body.convidados,
            decoded.id
        ];

        let conn;
        try {
            const db = await createConnection(); // Chama a função createConnection para estabelecer a conexão com o banco de dados
            const conn = await db.getConnection()
            await conn.query(q, values);
            return res.status(200).json("Reserva criada com sucesso.");
        } catch (err) {
            console.error("Erro ao inserir no banco de dados:", err);
            return res.status(500).json(err);
        } finally {
            if (conn) conn.end();
        }
    });
};

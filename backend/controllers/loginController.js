import bcrypt from 'bcrypt';
import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const addLogin = async (req, res) => {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
    }

    const q = "SELECT * FROM users WHERE usuario = ?";

    let conn;
    try {
        conn = await pool.getConnection();
        const [result] = await conn.query(q, [usuario]);

        if (result.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const resultUsuario = result[0];

        if (!resultUsuario.senha) {
            console.error('Senha não encontrada para o usuário:', usuario);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }


        const isMatch = await bcrypt.compare(senha, resultUsuario.senha);
        console.log('Comparação de senha:', isMatch, senha, resultUsuario.senha);

        if (!isMatch) {
            return res.status(401).json({ error: 'Senha inválida.' });
        }

        const token = jwt.sign({ id: resultUsuario.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error("Erro no banco de dados:", err);
        return res.status(500).json({ error: "Erro no servidor!" });
    } finally {
        if (conn) conn.release();
    }
};

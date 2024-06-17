import bcrypt from "bcrypt";
import { pool } from "../db.js";

const saltRounds = 10;

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        console.error('Erro ao hashear a senha:', err);
        throw err;
    }
};

// Exemplo de uso ao criar um novo usuário
const createUser = async (nome, usuario, senha) => {
    const hashedSenha = await hashPassword(senha);
    const q = "INSERT INTO users (`nome`, `usuario`, `senha`) VALUES (?, ?, ?)";
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(q, [nome, usuario, hashedSenha]);
        console.log('Usuário criado com sucesso');
    } catch (err) {
        console.error('Erro ao criar usuário:', err);
    } finally {
        if (conn) conn.release();
    }
};



export const getUsers = async (req, res) => {
    const q = "SELECT * FROM users";
    let conn = await pool.getConnection();

    try {
        const rows = await conn.query(q);
        res.status(200).json(rows);
    } catch (err) {
        res.json(err);
    } finally {
        if (conn) conn.end();
    }
};

export const getUserById = async (req, res) => {
    const q = "SELECT * FROM users WHERE id = ?";
    const id = req.params.id;
    let conn = await pool.getConnection();

    try {
        const rows = await conn.query(q, [id]);
        res.status(200).json(rows);
    } catch (err) {
        res.json(err);
    } finally {
        if (conn) conn.end();
    }
};

const SALT_ROUNDS = 10;
export const addUser = async (req, res) => {
    const { nome, usuario, senha } = req.body;
    

    try {
        const hashedSenha = await bcrypt.hash(senha,SALT_ROUNDS)

        const q = "INSERT INTO users(`nome`, `usuario`, `senha`) VALUES (?, ?, ?)";
        const conn = await pool.getConnection()
        await conn.query(q, [nome, usuario, hashedSenha]);
        conn.release();
        res.status(201).send('Usuário criado com sucesso!');
    } catch (err) {
        console.error("Erro no banco de dados:", err);
        res.status(500).send("Erro no servidor!");
    } finally {
        if(conn) conn.release();
    }
};




// Script para hashear 'senha123'
//const senha = 'senha123'; // Senha em texto plano

// bcrypt.genSalt(saltRounds, function(err, salt) {
   // bcrypt.hash(senha, salt, function(err, hash) {
     //   if (err) {
       //     console.error('Erro ao hashear a senha:', err);
        // } else {
          //  console.log('Senha hasheada:', hash);
        //}
   // });
// });
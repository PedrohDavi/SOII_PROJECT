import mariadb from 'mariadb';

const dbConfig ={
    host: 'localhost',
    user: 'pedro',
    password: 'senha123',
    database: 'so2',
    port: 3306,
    connectionLimit: 5,
    acquireTimeout: 60000
};

let pool;

const createDatabaseQuery = async () => {
    try {
        const conn = await pool.getConnection();
        await conn.query(`CREATE DATABASE IF NOT EXISTS so2;`);
        console.log("Banco de dados acessado/criado com sucesso");
    } catch (err) {
        console.error("Erro ao acessar/criar banco de dados:", err);
    }
};

    const createTablesQuery = async () => {
        const createUserTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255),
                usuario VARCHAR(255),
                senha VARCHAR(30)
            );
        `;
        const createReservaTableQuery = `
        CREATE TABLE IF NOT EXISTS reserva (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome_sala VARCHAR(250), 
            local_sala VARCHAR(250), 
            data_uso DATE, 
            hora_inicio_uso TIME, 
            hora_final_uso TIME, 
            responsavel VARCHAR(250),
            motivo_uso VARCHAR(450),
            info_gerais VARCHAR(450), 
            convidados VARCHAR(250), 
            usuario_id INT NOT NULL,
            FOREIGN KEY (usuario_id) REFERENCES users(id)
        );`;

    try {
        const conn = await pool.getConnection();
        await conn.query(createUserTableQuery);
        await conn.query(createReservaTableQuery);
        console.log("Tabelas acessadas/criadas com sucesso");
    } catch (err) {
        console.error("Erro ao criar as tabelas:", err);
    }
};

const initializeDatabase = async () => {
    pool = mariadb.createPool({
        ...dbConfig,
        database: 'so2'
    });

    await createDatabaseQuery();
    await createTablesQuery();
};

const init = async () => {
    await initializeDatabase();
};

init().catch(err => console.error("Erro ao inicializar o banco de dados:", err));

export { pool };
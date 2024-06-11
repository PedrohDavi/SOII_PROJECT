import mariadb from 'mariadb';

export const pool = mariadb.createPool({
    host: 'localhost',
    user: 'pedro',
    password: 'senha123',
    database: 'so2',
    port: 3306,
    connectionLimit: 50,
    acquireTimeout: 60000
});

async function createDatabase() {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query("CREATE DATABASE IF NOT EXISTS so2");
    } catch (err) {
        console.error("Erro ao criar/verificar banco de dados:", err);
    } finally {
        if (conn) conn.end();
    }
}

async function createTables() {
    const db = mariadb.createPool({
        host: 'localhost',
        user: 'pedro',
        password: 'senha123',
        database: 'so2',
        port: 3306,
        connectionLimit: 5
    });

    let conn;
    try {
        conn = await db.getConnection();
        await conn.query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(255) NOT NULL, usuario VARCHAR(255) NOT NULL, senha VARCHAR(255) NOT NULL)");
        await conn.query("CREATE TABLE IF NOT EXISTS reserva (id INT AUTO_INCREMENT PRIMARY KEY, nome_sala VARCHAR(250), local_sala VARCHAR(250), data_uso DATE, hora_inicio_uso TIME, hora_final_uso TIME, responsavel VARCHAR(250), motivo_uso VARCHAR(450), info_gerais VARCHAR(450), convidados VARCHAR(250), usuario_id INT NOT NULL, FOREIGN KEY (usuario_id) REFERENCES users(id))");
        console.log("Tabelas criadas");
    } catch (err) {
        console.error("Erro ao criar/verificar tabelas:", err);
    } finally {
        if (conn) conn.end();
    }
}

async function createConnection() {
    await createDatabase();

    await new Promise(resolve => setTimeout(resolve, 2000));

    await createTables();

    console.log("Conexão com o banco de dados estabelecida com sucesso.");

    return pool; // Retorna o objeto de conexão
}


createConnection().catch(err => {
    console.error("Erro ao conectar ao banco de dados:", err);
});

export { createConnection }; // Exporta a função createConnection para uso externo
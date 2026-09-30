import mysql from 'mysql2/promise';

export function criarPool() {
    return mysql.createPool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME,
        connectionLimit: 10, //limite de conexões simultaneas
        waitForConnections: true,//criar uma fila de novas requisições. Será usado caso as 10 conexões simultaneas esteja efetivamente em uso, para nao perder nenhuma requisicao, se estiver falso, nao ficará em fila
        queueLimit: 0 //tamanho da fila. quantas requisições ficarao aguardando as 10 finalizarem. usar 0 apenas em ambiente de teste, em produção, limitar a 30, 40, 50, dependendo do servidor
    })
}
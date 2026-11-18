import mysql from 'mysql2/promise';

async function main() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Siddik@123',
    database: 'smartled_jreda2',
  });
  const [rows] = await conn.query('DESCRIBE Lights');
  console.log('Lights fields:', (rows as any[]).map(r => `${r.Field} (${r.Type})`).join('\n'));
  await conn.end();
}

main().catch(console.error);

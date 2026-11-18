const mysql = require('./node_modules/mysql2');

const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Siddik@123',
  database: 'smartled_jreda2',
});

conn.query('DESCRIBE Lights', (err, rows) => {
  if (err) {
    console.error('Error querying Lights:', err);
  } else {
    console.log('Lights fields:\n' + rows.map(r => `${r.Field} (${r.Type})`).join('\n'));
  }
  conn.end();
});

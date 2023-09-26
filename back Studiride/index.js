const Server = require('./app/server.js');
const database = require('./app/database.js');

// Initialisez la base de données avant de créer une instance du serveur
database.initDatabase();

// Créez une instance du serveur après avoir initialisé la base de données
new Server();

// Démarrez le serveur

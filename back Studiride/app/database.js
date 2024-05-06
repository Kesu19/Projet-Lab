// database.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('covoiturage.db');

function initDatabase() {
  db.serialize(() => {
    // Table des utilisateurs
    
    db.run(`
      CREATE TABLE IF NOT EXISTS utilisateurs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT,
        prenom TEXT,
        email TEXT UNIQUE,
        tel TEXT,
		    identifiant TEXT UNIQUE,
        mot_de_passe TEXT,
        statuts INTEGER,
        longitude INTEGER,
        latitude INTEGER
      )
    `);

    // Table des statuts
    db.run(`
      CREATE TABLE IF NOT EXISTS statuts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT UNIQUE
      )
    `);
    
    db.run(`
      CREATE TABLE IF NOT EXISTS conversations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        utilisateur1_id INTEGER,
        utilisateur2_id INTEGER,
        FOREIGN KEY (utilisateur1_id) REFERENCES utilisateurs(id),
        FOREIGN KEY (utilisateur2_id) REFERENCES utilisateurs(id)
      )
    `);

    // Table des messages
    db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        conversation_id INTEGER,
        expediteur_id INTEGER,
        contenu TEXT,
        date_envoi DATETIME,
        FOREIGN KEY (conversation_id) REFERENCES conversations(id),
        FOREIGN KEY (expediteur_id) REFERENCES utilisateurs(id)
      )
    `);

  });
}

module.exports = {
  db,
  initDatabase
};

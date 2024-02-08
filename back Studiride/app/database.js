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
        statuts INTEGER
      )
    `);

    // Table des statuts
    db.run(`
      CREATE TABLE IF NOT EXISTS statuts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT UNIQUE
      )
    `);

    // // Insérer des données factices dans la table des statuts
    // const insertStatuts = db.prepare("INSERT INTO statuts (nom) VALUES (?)");
    // insertStatuts.run("Passager");
    // insertStatuts.run("Conducteur");
    // insertStatuts.finalize();

    // // Insérer des données factices dans la table des utilisateurs
    // const insertUtilisateurs = db.prepare("INSERT INTO utilisateurs (nom, prenom, email, identifiant, mot_de_passe, statuts) VALUES (?, ?, ?, ?, ?, ?)");
    // insertUtilisateurs.run("Doe", "John", "john@example.com", "John123", "motdepasse123", 1); // Utilisateur avec le statut "Passager"
    // insertUtilisateurs.run("Smith", "Jane", "jane@example.com", "Jane123", "mdp456", 2); // Utilisateur avec le statut "Conducteur"
    // insertUtilisateurs.finalize();
  });
}

module.exports = {
  db,
  initDatabase
};

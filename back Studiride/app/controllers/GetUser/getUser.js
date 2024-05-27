const { db } = require('../../database.js'); // Assurez-vous d'importer correctement votre module de base de données

module.exports = class GetUser {
    constructor(app) {
        this.app = app
        this.run()
    }

    /**
     * Middleware
     */
    async middleware() {
        this.app.get('/getUser', async (req, res) => {
            try {
                // Recherchez l'utilisateur dans la base de données SQLite
                db.all('SELECT * FROM utilisateurs WHERE statuts != ?', req.query.statuts, (err, user) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: "Erreur du serveur." });
                    }

                    if (!user) {
                        return res.status(404).json({ message: "Il n'y a aucun utilisateur" });
                    } else {
                        return res.send(user);
                    }
                });
            } catch (error) {
                return res.status(500).json({ message: error.message || "Une erreur s'est produite lors du GET " + req.query.id });
            }
        });

        this.app.get('/getUserById', async (req, res) => {
            try {
                // Recherchez l'utilisateur dans la base de données SQLite
                db.all('SELECT * FROM utilisateurs WHERE id != ?', req.query.id, (err, user) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: "Erreur du serveur." });
                    }

                    if (!user) {
                        return res.status(404).json({ message: "Il n'y a aucun utilisateur" });
                    } else {
                        return res.send(user);
                    }
                });
            } catch (error) {
                return res.status(500).json({ message: error.message || "Une erreur s'est produite lors du GET " + req.query.id });
            }
        });
    }

    /**
     * Run
     */
    run() {
        this.middleware()
    }
}

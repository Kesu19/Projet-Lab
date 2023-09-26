const { db } = require('../../database.js'); // Assurez-vous d'importer correctement votre module de base de données

module.exports = class Login {
    constructor(app) {
        this.app = app
        this.run()
    }

    /**
     * Middleware
     */
    async middleware() {
        this.app.get('/login', async (req, res) => {
            try {
                if (!req.query.identifiant || !req.query.mdp) {
                    return res.status(400).json({ message: "Identifiant and MDP required" });
                }

                // Recherchez l'utilisateur dans la base de données SQLite
                db.get('SELECT * FROM utilisateurs WHERE identifiant = ?', req.query.identifiant, (err, user) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: "Erreur du serveur." });
                    }

                    if (!user) {
                        return res.status(404).json({ message: "L'identifiant : " + req.query.identifiant + " n'existe pas" });
                    } else {
                        // Comparez le mot de passe fourni avec celui de la base de données
                        if (user.mot_de_passe !== req.query.mdp) {
							console.log(user.mot_de_passe ,req.query.mdp)
                            return res.status(401).json({ message: "The identifiant and MDP doesn't match" });
                        } else {
                            return res.send(user);
                        }
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

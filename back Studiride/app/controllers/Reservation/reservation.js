const { db } = require('../../database.js'); // Assurez-vous d'importer correctement votre module de base de données

module.exports = class Reservaton {
    constructor(app) {
        this.app = app
        this.run()
    }

    /**
     * Middleware
     */
    async middleware() {
        this.app.get('/getALLReservation', async (req, res) => {
            try {
                // Recherchez l'utilisateur dans la base de données SQLite
                db.all(
                    'SELECT * FROM reservation WHERE idPassager = ? OR idConducteur = ?',[req.query.idUser, req.query.idUser], (err, user) => {
					console.log(user)
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: "Erreur du serveur." });
                    }

                    if (!user) {
                        return res.status(404).json({ message: "Il n'y a aucun reservation" });
                    } else {
                        return res.send(user);
                    }
                });
            } catch (error) {
                return res.status(500).json({ message: error.message || "Une erreur s'est produite lors du GET " + req.query.id });
            }
        });

        this.app.put('/user/:identifiant', (req, res) => {
            const identifiant = req.params.identifiant;
            const newPassword = req.body.newpassword;
        
            db.get('SELECT * FROM utilisateurs WHERE identifiant = ?', identifiant, (err, user) => {
                if (err) {
                    return res.status(500).json({ message: err.message || "An error occurred while retrieving the user" });
                }
        
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
        
                db.run('UPDATE utilisateurs SET mot_de_passe = ? WHERE identifiant = ?', [newPassword, identifiant], (err) => {
                    if (err) {
                        return res.status(500).json({ message: err.message || "An error occurred while updating the password" });
                    }
        
                    return res.status(200).json({ message: "Password changed successfully" });
                });
            });
        });
    }

    /**
     * Run
     */
    run() {
        this.middleware()
    }
}

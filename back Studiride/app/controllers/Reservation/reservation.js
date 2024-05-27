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

        this.app.post('/addReservation', async (req, res) => {
			try {
                const { idConducteur, idPassager} = req.body;
                let dateReservation = getTomorrowDate();
                db.run(`
                    INSERT INTO reservation (idConducteur, idPassager, dateReservation, heureReservation, valider)
                    VALUES (?, ?, ?, ?, ?)
                `, [idConducteur, idPassager, dateReservation, 9, 0], function(err) {
                    if (err) {
                    return console.error(err.message);
                    }
                });
			} catch (error) {
				return res.status(500).json({ message: error.message || "Une erreur s'est produite lors de la création de l'utilisateur." });
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

const getTomorrowDate = () => {
    let today = new Date();
    today.setDate(today.getDate() + 1);
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };
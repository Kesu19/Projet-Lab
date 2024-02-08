

const { db } = require('../../database.js'); // Assurez-vous d'importer correctement votre module de base de données

module.exports = class CreateUser {
    constructor(app) {
        this.app = app
        this.run()
    }

    /**
     * Middleware
     */
    async middleware() {
		this.app.post('/signup', async (req, res) => {
			try {
				const { nom, prenom, email, tel,identifiant, motDePasse, statut } = req.body;
		
				if (!nom || !prenom || !email || !tel ||!identifiant || !motDePasse || !statut) {
					return res.status(400).json({ message: "Tous les champs sont obligatoires" });
				}
		
				// Vérifiez si l'identifiant de l'utilisateur existe déjà dans la base de données
				db.get('SELECT id FROM utilisateurs WHERE identifiant = ?', identifiant, (err, existingUser) => {
					if (err) {
						console.error(err);
						return res.status(500).json({ message: "Erreur lors de la vérification de l'existence de l'utilisateur." });
					}
		
					if (existingUser) {
						return res.status(409).json({ message: "L'identifiant existe déjà" });
					}
		
					// Ajoutez un nouvel utilisateur dans la base de données en utilisant le contrôleur
					createUser(nom, prenom, email, tel,identifiant, motDePasse, statut, (err, userId) => {
						if (err) {
							console.error(err);
							return res.status(500).json({ message: "Erreur lors de la création de l'utilisateur." });
						}
		
						return res.status(201).json({ message: "Utilisateur créé avec succès", userId });
					});
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


function createUser(nom, prenom, email,tel, identifiant, motDePasse, statut, callback) {
    db.run(
        'INSERT INTO utilisateurs (nom, prenom, email, tel, identifiant, mot_de_passe, statuts) VALUES (?, ?, ?, ?, ?, ?,?)',
        [nom, prenom, email, tel, identifiant, motDePasse, statut],
        function (err) {
            if (err) {
                console.error('Erreur lors de la création de l\'utilisateur :', err.message);
                return callback(err);
            }
            callback(null, this.lastID); // Appel du callback avec l'ID de l'utilisateur créé
        }
    );
}




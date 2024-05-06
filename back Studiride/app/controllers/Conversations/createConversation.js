const { db } = require('../../database.js'); 

module.exports = class ConversationManager {
    constructor(app) {
        this.app = app;
        this.run();
    }

    /**
     * Middleware
     */
    async middleware() {
        this.app.post('/conversation/start', async (req, res) => {
            try {
                const { utilisateur1_id, utilisateur2_id } = req.body;
                db.get('SELECT id FROM conversations WHERE (utilisateur1_id = ? AND utilisateur2_id = ?) OR (utilisateur1_id = ? AND utilisateur2_id = ?)',
                    [utilisateur1_id, utilisateur2_id, utilisateur2_id, utilisateur1_id],
                    (err, existingConversation) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ message: "Erreur lors de la vérification de l'existence de la conversation." });
                        }
                        
                        if (existingConversation) {
                            return res.status(409).json({ message: "La conversation existe déjà." ,"conversationId": existingConversation.id});
                        }

                        createConversation(utilisateur1_id, utilisateur2_id, (err, conversationId) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({ message: "Erreur lors de la création de la conversation." });
                            }
                            
                            return res.status(201).json({ message: "Conversation créée avec succès", conversationId });
                        });
                    });
            } catch (error) {
                return res.status(500).json({ message: error.message || "Une erreur s'est produite lors de la création de la conversation." });
            }
        });
    }

    /**
     * Run
     */
    run() {
        this.middleware();
    }
};

function createConversation(utilisateur1_id, utilisateur2_id, callback) {
    db.run(
        'INSERT INTO conversations (utilisateur1_id, utilisateur2_id) VALUES (?, ?)',
        [utilisateur1_id, utilisateur2_id],
        function (err) {
            if (err) {
                console.error('Erreur lors de la création de la conversation :', err.message);
                return callback(err);
            }
            callback(null, this.lastID); 
        }
    );
}

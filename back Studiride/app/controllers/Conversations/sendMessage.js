const { db } = require('../../database.js'); 

module.exports = class SendMessage {
    constructor(app) {
        this.app = app;
        this.run();
    }

    /**
     * Middleware
     */
    async middleware() {
        this.app.post('/conversation/message', async (req, res) => {
            try {
                const { conversation_Id,expediteur_id, contenu } = req.body;
    
                db.get('SELECT id FROM conversations WHERE id = ?', [conversation_Id], (err, conversation) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: "Erreur lors de la vérification de l'existence de la conversation." });
                    }
    
                    if (!conversation) {
                        return res.status(404).json({ message: "Conversation non trouvée." });
                    }
                    const currentDate = new Date().toLocaleString();
                    db.run(
                        'INSERT INTO messages (conversation_id, expediteur_id, contenu, date_envoi) VALUES (?, ?, ?, ?)',
                        [conversation_Id, expediteur_id, contenu,currentDate],
                        function (err) {
                            if (err) {
                                console.error('Erreur lors de l\'envoi du message :', err.message);
                                return res.status(500).json({ message: "Erreur lors de l'envoi du message." });
                            }
                            return res.status(201).json({ message: "Message envoyé avec succès", messageId: this.lastID });
                        }
                    );
                });
            } catch (error) {
                return res.status(500).json({ message: error.message || "Une erreur s'est produite lors de l'envoi du message." });
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
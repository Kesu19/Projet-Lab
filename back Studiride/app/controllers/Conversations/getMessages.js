const { db } = require('../../database.js'); 

module.exports = class GetMessages {
    constructor(app) {
        this.app = app;
        this.run();
    }

    /**
     * Middleware
     */
    async middleware() {
        this.app.get('/conversation/messages', async (req, res) => {
            try {
                const { conversation_Id} = req.body;
    
                db.get('SELECT id FROM conversations WHERE id = ?', [conversation_Id], (err, conversation) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: "Erreur lors de la vérification de l'existence de la conversation." });
                    }
    
                    if (!conversation) {
                        return res.status(404).json({ message: "Conversation non trouvée." });
                    }
    
                    db.all('SELECT * FROM messages WHERE conversation_id = ?', [conversation_Id], (err, messages) => {
                        if (err) {
                            console.error('Erreur lors de la récupération des messages :', err.message);
                            return res.status(500).json({ message: "Erreur lors de la récupération des messages." });
                        }
                        return res.status(200).json(messages);
                    });
                });
            } catch (error) {
                return res.status(500).json({ message: error.message || "Une erreur s'est produite lors de la récupération des messages." });
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
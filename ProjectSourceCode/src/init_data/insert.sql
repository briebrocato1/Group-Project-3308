INSERT INTO users (username,email,password) VALUES ('admin','boulderingbuffs@gmail.com','$2a$10$t2FV25XVFoM.wF/Ge80CiuCNMS9LDUPQhebbCFxfycu5e9Dxqy7vq');

INSERT INTO messages (author, text, parentID) VALUES
-- Top-level messages
(`Bouldering Buffs`, `Thank you for using our site! Make sure not to post any private information, and use common sense.`, NULL), -- Message 1
(`Bouldering Buffs`, `Post here with your best local climbing spots!`, NULL), -- Message 2
(`Bouldering Buffs`, `Post here to find climbing partners. Remember to not post personal info, and just meet up on the mountain!`, NULL), -- Message 3


(`Ollie`, `Anyone going to be at the 1st Flatiron Sunday?`, 3); -- Reply to message 1 (parentID = 1)



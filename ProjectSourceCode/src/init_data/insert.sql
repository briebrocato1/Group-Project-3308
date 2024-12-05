INSERT INTO users (username,email,password) VALUES ('admin','boulderingbuffs@gmail.com','$2a$10$t2FV25XVFoM.wF/Ge80CiuCNMS9LDUPQhebbCFxfycu5e9Dxqy7vq');

INSERT INTO messages (author, text, parentID) VALUES
-- Top-level messages
('Alice', 'This is the first message. It is the start of the conversation.', NULL), -- Message 1
('Bob', 'This is a top-level message. What do you think about Alice''s post?', NULL), -- Message 2
('Charlie', 'I have some thoughts on this topic too.', NULL), -- Message 3
('David', 'This conversation is really interesting. I have some initial comments.', NULL), -- Message 4
('Eve', 'I think this is a great discussion. Here are my thoughts.', NULL), -- Message 5

-- Insert replies to Message 1 (Alice's message)
('David', 'I agree with Alice, but I have some additional points.', 1), -- Reply to message 1 (parentID = 1)
('Eve', 'I''m not sure I understand Alice''s point. Could you elaborate?', 1), -- Reply to message 1 (parentID = 1)
('Bob', 'Alice, could you explain more about your perspective?', 1), -- Reply to message 1 (parentID = 1)
('Charlie', 'David, I agree with your point on this matter.', 1), -- Reply to message 1 (parentID = 1)

-- Insert replies to Message 2 (Bob's message)
('Alice', 'I think Bob makes a valid point. What does everyone else think?', 2), -- Reply to message 2 (parentID = 2)
('David', 'Bob, I see your point. However, I think there are a few nuances to consider.', 2), -- Reply to message 2 (parentID = 2)
('Charlie', 'I believe Bob raises an interesting question here. I would love to hear more opinions.', 2), -- Reply to message 2 (parentID = 2)

-- Insert replies to Message 3 (Charlie's message)
('Bob', 'Charlie, I''m really intrigued by your thoughts. Can you elaborate on what you mean?', 3), -- Reply to message 3 (parentID = 3)
('David', 'I agree with Charlie''s point here, but I think we should also discuss...', 3), -- Reply to message 3 (parentID = 3)
('Alice', 'Charlie, your perspective is insightful! I want to hear more about your ideas.', 3), -- Reply to message 3 (parentID = 3)
('Eve', 'Charlie, let me understand better. Are you suggesting...?', 3), -- Reply to message 3 (parentID = 3)

-- Insert replies to Message 4 (David's message)
('Alice', 'David, I totally agree! Let''s dive deeper into that.', 4), -- Reply to message 4 (parentID = 4)
('Bob', 'David, I think you bring up an interesting point. I''d love to discuss it further.', 4), -- Reply to message 4 (parentID = 4)
('Charlie', 'David, I appreciate your feedback. I think we are on the same page.', 4), -- Reply to message 4 (parentID = 4)
('Eve', 'David, could you clarify that last part for me? I''m not sure I understand.', 4), -- Reply to message 4 (parentID = 4)

-- Insert replies to Message 5 (Eve's message)
('Alice', 'Eve, I completely agree with your perspective. What do you think about this?', 5), -- Reply to message 5 (parentID = 5)
('Charlie', 'Eve, I think you''ve got a great point there. Let me add my thoughts...', 5), -- Reply to message 5 (parentID = 5)
('Bob', 'Eve, I like where you''re going with this! I think we can explore it further.', 5), -- Reply to message 5 (parentID = 5)
('David', 'I believe Eve is correct. Here''s how I would expand on that idea...', 5), -- Reply to message 5 (parentID = 5)

-- Insert additional replies to various messages
('Bob', 'Charlie, I totally understand your argument. Let''s explore that further.', 6), -- Reply to message 6 (parentID = 6)
('David', 'I feel the same way as Bob. Let''s not rush to conclusions.', 6), -- Reply to message 6 (parentID = 6)
('Alice', 'I agree with Bob and David on this. Let''s give this a bit more thought.', 6), -- Reply to message 6 (parentID = 6)
('Charlie', 'Bob, I love your input! I think we can dive even deeper into this.', 7), -- Reply to message 7 (parentID = 7)
('David', 'Eve, I really appreciate your comment. I agree with your points.', 8), -- Reply to message 8 (parentID = 8)
('Alice', 'Charlie, I''m excited to hear more from you. What''s next?', 9), -- Reply to message 9 (parentID = 9)
('Bob', 'David, let me add a different angle to this discussion.', 10), -- Reply to message 10 (parentID = 10)

-- Continue adding more replies to other messages
('Eve', 'Alice, I think we''ve made some great progress here. What''s next for the discussion?', 11), -- Reply to message 11 (parentID = 11)
('Charlie', 'I agree with Eve, but I think we need more perspectives to consider.', 12), -- Reply to message 12 (parentID = 12)
('David', 'Bob, I''ve been thinking about your comment. Let me add my take on it.', 13), -- Reply to message 13 (parentID = 13)
('Alice', 'David, I completely understand your perspective on this.', 14), -- Reply to message 14 (parentID = 14)
('Charlie', 'Eve, let me further clarify my point on this issue.', 15), -- Reply to message 15 (parentID = 15)
('Bob', 'Alice, I agree with you. We should continue exploring this subject.', 16), -- Reply to message 16 (parentID = 16)
('David', 'Charlie, I think you''ve hit the nail on the head. Let''s expand on that idea.', 17), -- Reply to message 17 (parentID = 17)
('Eve', 'Bob, I''d like to hear more from you on this. Let''s dig deeper.', 18), -- Reply to message 18 (parentID = 18)
('Alice', 'David, you make an excellent point. Let''s build on that discussion.', 19), -- Reply to message 19 (parentID = 19)

-- Final set of replies
('Bob', 'Charlie, I see where you''re coming from, but I have another angle to explore.', 20), -- Reply to message 20 (parentID = 20)
('David', 'Eve, your idea is intriguing. I think we should take it further.', 21), -- Reply to message 21 (parentID = 21)
('Alice', 'I agree with Bob. Let''s challenge this idea and see where it leads.', 22), -- Reply to message 22 (parentID = 22)
('Charlie', 'Alice, I think we''ve reached a new understanding here. Let''s discuss it more.', 23), -- Reply to message 23 (parentID = 23)
('David', 'Eve, I think we need more research before we conclude anything.', 24), -- Reply to message 24 (parentID = 24)
('Bob', 'Charlie, your input is valuable. Let''s continue with this discussion.', 25), -- Reply to message 25 (parentID = 25)
('Alice', 'I think this discussion is evolving nicely. We should keep pushing forward.', 26), -- Reply to message 26 (parentID = 26)
('David', 'Bob, I''m curious about your thoughts on the matter. Let''s keep the conversation going.', 27), -- Reply to message 27 (parentID = 27)
('Charlie', 'David, I''m excited to continue the conversation. What''s your take on this?', 28), -- Reply to message 28 (parentID = 28)
('Eve', 'Alice, I really enjoy how this conversation is progressing. I''m learning a lot.', 29), -- Reply to message 29 (parentID = 29)
('Bob', 'I''m glad to hear that, Eve! Let''s keep it going!', 30); -- Reply to message 30 (parentID = 30)
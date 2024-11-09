INSERT INTO messages (author, text, parentID) VALUES
('Alice', 'This is the first message. It is the start of the conversation.', NULL), -- Message 1
('Bob', 'This is a top-level message. What do you think about Alice''s post?', NULL), -- Message 2
('Charlie', 'I have some thoughts on this topic too.', NULL), -- Message 3

-- Insert replies (parentID is the ID of the message being replied to)
('David', 'I agree with Alice, but I have some additional points.', 1), -- Reply to message 1 (parentID = 1)
('Eve', 'I''m not sure I understand Alice''s point. Could you elaborate?', 1), -- Reply to message 1 (parentID = 1)
('Bob', 'Charlie, I like your thoughts! What else do you have to say?', 3), -- Reply to message 3 (parentID = 3)
('Alice', 'David, I''m glad you agree! Feel free to share your points.', 4), -- Reply to message 4 (parentID = 4)
('Charlie', 'Eve, let me clarify: I believe...', 5), -- Reply to message 5 (parentID = 5)
('Bob', 'David, I''m with you on that point. Let''s explore it further.', 4); -- Reply to message 4 (parentID = 4)

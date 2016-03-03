


--CREATE TABLE [dbo].[AspNetUserLogs](
--	[Id] [nvarchar](128) NOT NULL ,
--	[Entry] [nvarchar](128) NOT NULL,
--	[CreatedAt] [date] NOT NULL,
--	[User_Id] [nvarchar](128) NOT NULL,

-- CONSTRAINT [PK_dbo.AspNetUserNotes] PRIMARY KEY CLUSTERED ([Id] ASC, [User_Id] ASC),  
--  FOREIGN KEY ([User_Id]) REFERENCES [dbo].[AspNetUsers] ([Id])   ON DELETE CASCADE
--);



--CREATE TABLE [dbo].[AspNetUserNote](
--	[NoteId] [nvarchar](128) NOT NULL ,
--	[Note] [nvarchar](128) NOT NULL,
--	[EnteredBy] [nvarchar](128) NOT NULL,
--	[CreatedAt] [date] NOT NULL,
--	[User_Id] [nvarchar](128) NOT NULL,

-- CONSTRAINT [PK_dbo.AspNetUserNote] PRIMARY KEY CLUSTERED ([NoteId] ASC, [User_Id] ASC),  
--  FOREIGN KEY ([User_Id]) REFERENCES [dbo].[AspNetUsers] ([Id])   ON DELETE CASCADE
--);


INSERT INTO [dbo].[AspNetUserNote] (NoteId, Note, EnteredBy, CreatedAt, User_Id) VALUES(1,'Set as Admin', 'System', '12/01/2012', N'3a2f0df2-ca9d-49a3-bbc9-304bb82079a5')
INSERT INTO [dbo].[AspNetUserNote] (NoteId, Note, EnteredBy, CreatedAt, User_Id) VALUES(2,'Changed Avatar due to complaint', 'System', '09/18/2013', N'3a2f0df2-ca9d-49a3-bbc9-304bb82079a5')
INSERT INTO [dbo].[AspNetUserNote] (NoteId, Note, EnteredBy, CreatedAt, User_Id) VALUES(3, 'Sent email regarding overpayment', 'System', '2/12/2014', N'3a2f0df2-ca9d-49a3-bbc9-304bb82079a5')

INSERT INTO [dbo].[AspNetUserLogs] (Id, Entry, CreatedAt, User_Id) VALUES (1,'Logged In', '01/04/2013', N'3a2f0df2-ca9d-49a3-bbc9-304bb82079a5');
INSERT INTO [dbo].[AspNetUserLogs] (Id, Entry, CreatedAt, User_Id) VALUES (2,'Logged Out','12/17/2012', N'3a2f0df2-ca9d-49a3-bbc9-304bb82079a5');
INSERT INTO [dbo].[AspNetUserLogs] (Id, Entry, CreatedAt, User_Id) VALUES (3,'Logged In with Google', '04/08/2013', N'3a2f0df2-ca9d-49a3-bbc9-304bb82079a5');
INSERT INTO [dbo].[AspNetUserLogs] (Id, Entry, CreatedAt, User_Id) VALUES (4,'Logged In Twitter', '03/02/2014', N'3a2f0df2-ca9d-49a3-bbc9-304bb82079a5');


﻿CREATE TABLE [dbo].[Users]
(
	[Id] INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	[RoleId] INT NOT NULL,
	[Name] NVARCHAR(256) NOT NULL,
	[Email] NVARCHAR(256) NOT NULL,

	CONSTRAINT [FK_USER_ROLEID] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles] ([Id])
)
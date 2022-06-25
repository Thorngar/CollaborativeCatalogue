﻿CREATE TABLE [dbo].[Users]
(
	[Id] INT NOT NULL IDENTITY(1, 1) PRIMARY KEY,
	[RoleId] INT NOT NULL,
	[Name] NVARCHAR(256) NOT NULL,
	[Email] NVARCHAR(256) NOT NULL,
	[Password] NVARCHAR(MAX) NOT NULL,
	[Salt] NVARCHAR(MAX) NOT NULL,
	[Address] NVARCHAR(MAX) NULL,
	[PhoneNumber] NVARCHAR(30) NULL,
	[WebsiteLink] NVARCHAR(256) NULL,

	CONSTRAINT [FK_USER_ROLES] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles] ([Id]),

	CONSTRAINT [UQ_USER_EMAIL] UNIQUE ([Email]),

	CONSTRAINT [MINLENGTH_USER_PASSWORD] CHECK (LEN([Password]) >= 8)
)
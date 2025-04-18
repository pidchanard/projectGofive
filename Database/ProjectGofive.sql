USE [master]
GO
/****** Object:  Database [ProjectGofive]    Script Date: 4/8/2025 4:05:48 PM ******/
CREATE DATABASE [ProjectGofive]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ProjectGofive', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\ProjectGofive.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ProjectGofive_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\ProjectGofive_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [ProjectGofive] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ProjectGofive].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ProjectGofive] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ProjectGofive] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ProjectGofive] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ProjectGofive] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ProjectGofive] SET ARITHABORT OFF 
GO
ALTER DATABASE [ProjectGofive] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ProjectGofive] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ProjectGofive] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ProjectGofive] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ProjectGofive] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ProjectGofive] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ProjectGofive] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ProjectGofive] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ProjectGofive] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ProjectGofive] SET  ENABLE_BROKER 
GO
ALTER DATABASE [ProjectGofive] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ProjectGofive] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ProjectGofive] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ProjectGofive] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ProjectGofive] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ProjectGofive] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [ProjectGofive] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ProjectGofive] SET RECOVERY FULL 
GO
ALTER DATABASE [ProjectGofive] SET  MULTI_USER 
GO
ALTER DATABASE [ProjectGofive] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ProjectGofive] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ProjectGofive] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ProjectGofive] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ProjectGofive] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ProjectGofive] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'ProjectGofive', N'ON'
GO
ALTER DATABASE [ProjectGofive] SET QUERY_STORE = OFF
GO
USE [ProjectGofive]
GO
/****** Object:  User [gid]    Script Date: 4/8/2025 4:05:48 PM ******/
CREATE USER [gid] FOR LOGIN [gid] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 4/8/2025 4:05:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Documents]    Script Date: 4/8/2025 4:05:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Documents](
	[DocId] [int] IDENTITY(1,1) NOT NULL,
	[Doc_name] [nvarchar](max) NULL,
	[DocDate] [date] NULL,
	[DocDescription] [nvarchar](max) NULL,
 CONSTRAINT [PK_Documents] PRIMARY KEY CLUSTERED 
(
	[DocId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permissions]    Script Date: 4/8/2025 4:05:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permissions](
	[PermissionId] [int] IDENTITY(1,1) NOT NULL,
	[PermissionName] [nvarchar](max) NULL,
 CONSTRAINT [PK_Permissions] PRIMARY KEY CLUSTERED 
(
	[PermissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 4/8/2025 4:05:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[RoleId] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nvarchar](max) NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SavedSearches]    Script Date: 4/8/2025 4:05:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SavedSearches](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[SearchKeyword] [nvarchar](max) NOT NULL,
	[SavedAt] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_SavedSearches] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserPermissions]    Script Date: 4/8/2025 4:05:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserPermissions](
	[UserPermissionId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[PermissionId] [int] NOT NULL,
	[IsReadable] [bit] NOT NULL,
	[IsWritable] [bit] NOT NULL,
	[IsDeletable] [bit] NOT NULL,
 CONSTRAINT [PK_UserPermissions] PRIMARY KEY CLUSTERED 
(
	[UserPermissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 4/8/2025 4:05:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](max) NULL,
	[LastName] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
	[Phone] [nvarchar](max) NULL,
	[Username] [nvarchar](max) NULL,
	[Password] [nvarchar](max) NULL,
	[RoleId] [int] NOT NULL,
	[CreateDate] [date] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250401172918_CreateDB1', N'9.0.2')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250404120120_AddSavedSearchesTable', N'9.0.2')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250405095444_UpdateDatabaseStructure', N'9.0.2')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250406122828_UpdateDocumentModel', N'9.0.2')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250406124304_Update_DocumentModel', N'9.0.2')
GO
SET IDENTITY_INSERT [dbo].[Documents] ON 

INSERT [dbo].[Documents] ([DocId], [Doc_name], [DocDate], [DocDescription]) VALUES (18, N'document 1', CAST(N'2025-04-07' AS Date), N'Project simple')
INSERT [dbo].[Documents] ([DocId], [Doc_name], [DocDate], [DocDescription]) VALUES (19, N'document 3', CAST(N'2025-03-08' AS Date), N'Project system analysis
')
INSERT [dbo].[Documents] ([DocId], [Doc_name], [DocDate], [DocDescription]) VALUES (20, N'document 2', CAST(N'2025-06-07' AS Date), N'www')
INSERT [dbo].[Documents] ([DocId], [Doc_name], [DocDate], [DocDescription]) VALUES (21, N'document 4', CAST(N'2025-06-07' AS Date), N'www')
INSERT [dbo].[Documents] ([DocId], [Doc_name], [DocDate], [DocDescription]) VALUES (22, N'document 5', CAST(N'2025-07-07' AS Date), N'www')
INSERT [dbo].[Documents] ([DocId], [Doc_name], [DocDate], [DocDescription]) VALUES (23, N'document 6', CAST(N'2025-12-07' AS Date), N'xxx')
INSERT [dbo].[Documents] ([DocId], [Doc_name], [DocDate], [DocDescription]) VALUES (24, N'document 7', CAST(N'2025-11-07' AS Date), N'www')
INSERT [dbo].[Documents] ([DocId], [Doc_name], [DocDate], [DocDescription]) VALUES (25, N'document 8', CAST(N'2025-05-07' AS Date), N'www')
INSERT [dbo].[Documents] ([DocId], [Doc_name], [DocDate], [DocDescription]) VALUES (26, N'document 9', CAST(N'2025-04-07' AS Date), N'www')
SET IDENTITY_INSERT [dbo].[Documents] OFF
GO
SET IDENTITY_INSERT [dbo].[Permissions] ON 

INSERT [dbo].[Permissions] ([PermissionId], [PermissionName]) VALUES (1, N'Super Admin')
INSERT [dbo].[Permissions] ([PermissionId], [PermissionName]) VALUES (2, N'HR Admin')
INSERT [dbo].[Permissions] ([PermissionId], [PermissionName]) VALUES (3, N'Admin')
INSERT [dbo].[Permissions] ([PermissionId], [PermissionName]) VALUES (4, N'Employee')
SET IDENTITY_INSERT [dbo].[Permissions] OFF
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([RoleId], [RoleName]) VALUES (1, N'Super Admin')
INSERT [dbo].[Roles] ([RoleId], [RoleName]) VALUES (2, N'HR Admin')
INSERT [dbo].[Roles] ([RoleId], [RoleName]) VALUES (3, N'Admin')
INSERT [dbo].[Roles] ([RoleId], [RoleName]) VALUES (4, N'Employee')
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
SET IDENTITY_INSERT [dbo].[SavedSearches] ON 

INSERT [dbo].[SavedSearches] ([Id], [UserId], [SearchKeyword], [SavedAt]) VALUES (1, 1, N'string', CAST(N'2025-04-04T12:41:58.9815696' AS DateTime2))
INSERT [dbo].[SavedSearches] ([Id], [UserId], [SearchKeyword], [SavedAt]) VALUES (2, 1, N'string', CAST(N'2025-04-04T12:42:01.1146626' AS DateTime2))
SET IDENTITY_INSERT [dbo].[SavedSearches] OFF
GO
SET IDENTITY_INSERT [dbo].[UserPermissions] ON 

INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsReadable], [IsWritable], [IsDeletable]) VALUES (2158, 2051, 1, 0, 0, 0)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsReadable], [IsWritable], [IsDeletable]) VALUES (2159, 2051, 2, 0, 0, 0)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsReadable], [IsWritable], [IsDeletable]) VALUES (2160, 2051, 3, 0, 0, 0)
INSERT [dbo].[UserPermissions] ([UserPermissionId], [UserId], [PermissionId], [IsReadable], [IsWritable], [IsDeletable]) VALUES (2161, 2051, 4, 0, 0, 0)
SET IDENTITY_INSERT [dbo].[UserPermissions] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserId], [FirstName], [LastName], [Email], [Phone], [Username], [Password], [RoleId], [CreateDate]) VALUES (2050, N'ayaya11', N'kakak111', N'1@1', N'1111111111', N'ayaya11', N'', 3, CAST(N'2025-04-08' AS Date))
INSERT [dbo].[Users] ([UserId], [FirstName], [LastName], [Email], [Phone], [Username], [Password], [RoleId], [CreateDate]) VALUES (2051, N'i', N'7', N'1@gmail.com', N'0000000000', N'1@7', N'12345', 2, CAST(N'2025-04-08' AS Date))
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
/****** Object:  Index [IX_UserPermissions_PermissionId]    Script Date: 4/8/2025 4:05:48 PM ******/
CREATE NONCLUSTERED INDEX [IX_UserPermissions_PermissionId] ON [dbo].[UserPermissions]
(
	[PermissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_UserPermissions_UserId]    Script Date: 4/8/2025 4:05:48 PM ******/
CREATE NONCLUSTERED INDEX [IX_UserPermissions_UserId] ON [dbo].[UserPermissions]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Users_RoleId]    Script Date: 4/8/2025 4:05:48 PM ******/
CREATE NONCLUSTERED INDEX [IX_Users_RoleId] ON [dbo].[Users]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[UserPermissions]  WITH CHECK ADD  CONSTRAINT [FK_UserPermissions_Permissions_PermissionId] FOREIGN KEY([PermissionId])
REFERENCES [dbo].[Permissions] ([PermissionId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UserPermissions] CHECK CONSTRAINT [FK_UserPermissions_Permissions_PermissionId]
GO
ALTER TABLE [dbo].[UserPermissions]  WITH CHECK ADD  CONSTRAINT [FK_UserPermissions_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UserPermissions] CHECK CONSTRAINT [FK_UserPermissions_Users_UserId]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Roles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([RoleId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Roles_RoleId]
GO
USE [master]
GO
ALTER DATABASE [ProjectGofive] SET  READ_WRITE 
GO

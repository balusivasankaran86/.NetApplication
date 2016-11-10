create database DB_Frist

use DB_Frist

create table T_USERTYPE
(
ID int identity (1,1)  primary key,
Name varchar(250),
Descriptions varchar(500)
)

create table T_USER
(
ID int identity (1,1)  primary key,
Name varchar(250),
DOB date,
Gender varchar(10),
UserType int FOREIGN KEY REFERENCES T_USERTYPE(ID)
)

create table T_COURSES
(
ID int identity (1,1)  primary key,
Course_Name varchar(250),
Descriptions varchar(500)
)

create table T_SUBJECT
(
ID int identity (1,1)  primary key,
Subject_Name varchar(250),
Descriptions varchar(500)
)

create table T_COURES_SUBJECT_MAP
(
ID int identity (1,1)  primary key,
CourseID int FOREIGN KEY REFERENCES T_COURSES(ID),
SubjectID int FOREIGN KEY REFERENCES T_SUBJECT(ID)
)

CREATE TABLE [dbo].[DBAudit](
	[AuditId] [varchar](200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	[RevisionStamp] [datetime] NULL,
	[TableName] [nvarchar](50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[UserName] [nvarchar](50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[Actions] [nvarchar](1) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[OldData] [xml] NULL,
	[NewData] [xml] NULL,
	[ChangedColumns] [nvarchar](1000) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
 CONSTRAINT [PK_DBAudit] PRIMARY KEY CLUSTERED 
(
	[AuditId] ASC
)WITH (PAD_INDEX  = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

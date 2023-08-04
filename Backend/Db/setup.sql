create DATABASE Social;
use Social;

-- Create tables
create table Users (
    id int PRIMARY key IDENTITY(1,1),
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password VARCHAR(500) NOT NULL,
    picturePath varchar(255),
    -- friends ARRAY, # not yet added to db
    location varchar(255),
    occupation varchar(255),
    viewedProfile int,
    impression int,
);

create table Posts (
    userId int,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    description VARCHAR(255),
    picturePath VARCHAR(255),
    userPicturePath VARCHAR(255),
    -- likes ARRAY bool, # not yet added to db
    -- comments ARRAY, # not yet added to db
);
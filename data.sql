CREATE TABLE IF NOT EXISTS `admin` (
  `adminid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `pswd` varchar(100) DEFAULT NULL,
  `deviceid` varchar(255) DEFAULT NULL,
  `su` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`adminid`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `admin_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `category` (
  `categoryid` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`categoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `deviceid` (
  `deviceidid` int(11) NOT NULL AUTO_INCREMENT,
  `deviceid` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`deviceidid`),
  UNIQUE KEY `deviceid` (`deviceid`),
  UNIQUE KEY `deviceid_deviceid_unique` (`deviceid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `post` (
  `postid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `post` varchar(500) NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `adminid` int(11) DEFAULT NULL,
  `categoryid` int(11) NOT NULL,
  `subcategoryid` int(11) NOT NULL,
  `writerid` int(11) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`postid`),
  KEY `adminid` (`adminid`),
  KEY `categoryid` (`categoryid`),
  KEY `subcategoryid` (`subcategoryid`),
  KEY `writerid` (`writerid`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`adminid`) REFERENCES `admin` (`adminid`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `post_ibfk_2` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `post_ibfk_3` FOREIGN KEY (`subcategoryid`) REFERENCES `subcategory` (`subcategoryid`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `post_ibfk_4` FOREIGN KEY (`writerid`) REFERENCES `writer` (`writerid`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `subcategory` (
  `subcategoryid` int(11) NOT NULL AUTO_INCREMENT,
  `subcategory` varchar(100) DEFAULT NULL,
  `categoryid` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`subcategoryid`),
  KEY `categoryid` (`categoryid`),
  CONSTRAINT `subcategory_ibfk_1` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `user` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `pswd` varchar(100) DEFAULT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `gender` varchar(7) DEFAULT NULL,
  `deviceid` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `user_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `views` (
  `viewsid` int(11) NOT NULL AUTO_INCREMENT,
  `duration` int(11) NOT NULL,
  `postid` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`viewsid`),
  KEY `postid` (`postid`),
  KEY `userid` (`userid`),
  CONSTRAINT `views_ibfk_1` FOREIGN KEY (`postid`) REFERENCES `post` (`postid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `views_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `writer` (
  `writerid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `pswd` varchar(100) DEFAULT NULL,
  `deviceid` varchar(255) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`writerid`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `writer_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO `admin` (`adminid`,`name`,`email`,`pswd`,`deviceid`,`su`,`createdAt`,`updatedAt`) VALUES (1,'Admin','admin@pinched.in','de987519344b6dded71944313cf5232211b73a44556013cab47c750feb089d2c',NULL,1,'2017-02-07 18:26:55.000','2017-02-07 18:26:55.000');

INSERT INTO `category` (`categoryid`,`category`,`createdAt`,`updatedAt`) VALUES (1,'Education','2017-02-07 18:27:35.000','2017-02-07 18:27:35.000');

INSERT INTO `deviceid` (`deviceidid`,`deviceid`,`source`,`createdAt`,`updatedAt`) VALUES (1,'adwjh','android','2017-02-13 19:20:17.000','2017-02-13 19:20:17.000');

INSERT INTO `post` (`postid`,`title`,`post`,`link`,`image`,`adminid`,`categoryid`,`subcategoryid`,`writerid`,`verified`,`createdAt`,`updatedAt`) VALUES (2,'Test New','Test',NULL,'http://www.pinched.in.s3.amazonaws.com/post/7b7b94952deca51f208d0034b109b488c5dce6d6e68a5ecc496215592edc35b9.png',1,1,1,1,1,'2017-02-07 18:28:41.000','2017-02-12 10:52:39.000');
INSERT INTO `post` (`postid`,`title`,`post`,`link`,`image`,`adminid`,`categoryid`,`subcategoryid`,`writerid`,`verified`,`createdAt`,`updatedAt`) VALUES (4,'Test','Test','','http://www.pinched.in.s3.amazonaws.com/post/73f3dff522ebd402f42181c1117ef58ac30a7284914e46f7d1b59f763703a7a5.jpg',1,1,1,1,1,'2017-02-13 18:51:14.000','2017-02-13 18:51:52.000');
INSERT INTO `post` (`postid`,`title`,`post`,`link`,`image`,`adminid`,`categoryid`,`subcategoryid`,`writerid`,`verified`,`createdAt`,`updatedAt`) VALUES (5,'Test','Test','','http://www.pinched.in.s3.amazonaws.com/post/4d4915066f7b7487b2e0300ed2e414c2b8d15203a89642619820c0e509435731.jpg',1,1,1,1,1,'2017-02-13 19:50:15.000','2017-02-13 19:50:26.000');
INSERT INTO `post` (`postid`,`title`,`post`,`link`,`image`,`adminid`,`categoryid`,`subcategoryid`,`writerid`,`verified`,`createdAt`,`updatedAt`) VALUES (6,'Test','Test','','http://www.pinched.in.s3.amazonaws.com/post/8f832abaf54be66c1af4b8f3d0a085d18829bb2fb206b47228b2a155cd53617e.jpg',1,1,1,1,1,'2017-02-14 03:15:53.000','2017-02-14 03:16:01.000');
INSERT INTO `post` (`postid`,`title`,`post`,`link`,`image`,`adminid`,`categoryid`,`subcategoryid`,`writerid`,`verified`,`createdAt`,`updatedAt`) VALUES (7,'test','tes','','http://www.pinched.in.s3.amazonaws.com/post/f2f6871dd309fe52d2b29e1b2c81f152799708156f04b2a23cf54a371e0b4859.jpg',1,1,1,1,1,'2017-02-14 03:19:35.000','2017-02-14 03:19:42.000');
INSERT INTO `post` (`postid`,`title`,`post`,`link`,`image`,`adminid`,`categoryid`,`subcategoryid`,`writerid`,`verified`,`createdAt`,`updatedAt`) VALUES (8,'test','tes','','http://www.pinched.in.s3.amazonaws.com/post/ed6f466b9cd7af9d86971e908afa10abcb8936cdb8714e5cdb11e689976d5bcd.jpg',1,1,1,1,1,'2017-02-14 03:21:05.000','2017-02-14 03:21:13.000');
INSERT INTO `post` (`postid`,`title`,`post`,`link`,`image`,`adminid`,`categoryid`,`subcategoryid`,`writerid`,`verified`,`createdAt`,`updatedAt`) VALUES (9,'test','tes','','http://www.pinched.in.s3.amazonaws.com/post/56f24e5a2630c55e8bf67b6f2b53328f03cd15454a9b691775e664502407673d.jpg',1,1,1,1,1,'2017-02-14 03:23:04.000','2017-02-14 03:23:13.000');
INSERT INTO `post` (`postid`,`title`,`post`,`link`,`image`,`adminid`,`categoryid`,`subcategoryid`,`writerid`,`verified`,`createdAt`,`updatedAt`) VALUES (10,'test','tes','','http://www.pinched.in.s3.amazonaws.com/post/dcf8bd952f50e149a1e1cc1761d81c0344015358a92c59cf3e4c48ff413c658b.jpg',1,1,1,1,1,'2017-02-14 03:24:29.000','2017-02-14 03:24:41.000');
INSERT INTO `post` (`postid`,`title`,`post`,`link`,`image`,`adminid`,`categoryid`,`subcategoryid`,`writerid`,`verified`,`createdAt`,`updatedAt`) VALUES (11,'test','tes','','http://www.pinched.in.s3.amazonaws.com/post/0e26a3d8253d6b19e91d56fbe00698fae05c61eb89fc5973c5c1b8a136eb65bb.jpg',1,1,1,1,1,'2017-02-14 03:25:49.000','2017-02-14 03:25:59.000');
INSERT INTO `post` (`postid`,`title`,`post`,`link`,`image`,`adminid`,`categoryid`,`subcategoryid`,`writerid`,`verified`,`createdAt`,`updatedAt`) VALUES (12,'test','tes','','http://www.pinched.in.s3.amazonaws.com/post/b7df82529fc8a57736519f4af40f8ec28846188f21e9cfa40798fce5ace4c282.jpg',1,1,1,1,1,'2017-02-14 03:27:01.000','2017-02-14 03:35:01.000');
INSERT INTO `post` (`postid`,`title`,`post`,`link`,`image`,`adminid`,`categoryid`,`subcategoryid`,`writerid`,`verified`,`createdAt`,`updatedAt`) VALUES (13,'ahhgwf fjabcjhgajf nhabfjkhakfb fjahwkjfhkawhfkjaw','hjfbaejbaehbhfa fabwhfkjbaf ahfbkjawbfkaf akwfkjawbfka fkjawfkjawbfkaw fkjawbfkawhfk awfakufhkajfaeffhjfbaejbaehbhfa fabwhfkjbaf ahfbkjawbfkaf akwfkjawbfka fkjawfkjawbfkaw fkjawbfkawhfk awfakufhkajfaeffhjfbaejbaehbhfa fabwhfkjbaf ahfbkjawbfkaf akwfkjawbfka fkjawfkjawbfkaw fkjawbfkawhfk awfakufhkajfa','','http://www.pinched.in.s3.amazonaws.com/post/bb99b6df5fac310568ca5d887b1e3bc8adbe54b1bc886a5d4a3369c21330f892.jpg',1,1,1,1,1,'2017-02-15 18:10:52.000','2017-02-15 18:11:05.000');
INSERT INTO `post` (`postid`,`title`,`post`,`link`,`image`,`adminid`,`categoryid`,`subcategoryid`,`writerid`,`verified`,`createdAt`,`updatedAt`) VALUES (15,'abc','abc','abc','http://www.pinched.in.s3.amazonaws.com/post/11cb49fb9e404d335f9e350803cf8f6218a4b04e4144a8691e52c5067b32562d.jpg',1,1,1,1,1,'2017-02-15 18:31:45.000','2017-02-15 18:31:56.000');

INSERT INTO `subcategory` (`subcategoryid`,`subcategory`,`categoryid`,`createdAt`,`updatedAt`) VALUES (1,'CLAT',1,'2017-02-07 18:27:43.000','2017-02-07 18:27:43.000');





INSERT INTO `writer` (`writerid`,`name`,`email`,`pswd`,`deviceid`,`verified`,`createdAt`,`updatedAt`) VALUES (1,'Test','test@pinched.in','c7861c12008d6d8611bcf7b443c29ecc069d8efa1c2887530c0d76e45ec44438',NULL,1,'2017-02-07 18:27:15.000','2017-02-07 18:27:30.000');
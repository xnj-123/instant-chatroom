const Users = `  
CREATE TABLE IF NOT EXISTS users (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    username VARCHAR(255),  
    email VARCHAR(255) UNIQUE NOT NULL,  
    sex ENUM('男', '女', '未知') DEFAULT '未知',  
    birthday DATE,  
    phone VARCHAR(20),  
    password VARCHAR(255) NOT NULL,  
    register TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    sign TEXT,  
    avatar VARCHAR(255)
);`

const Friends = `
CREATE TABLE IF NOT EXISTS friends (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    userid INT,  
    friendID INT,  
    markName VARCHAR(255),
    addTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    state TINYINT DEFAULT 0 COMMENT '0表示已为好友，1表示申请中，2表示申请发送方，对方还未同意',  
    FOREIGN KEY (userid) REFERENCES users(id),  
    FOREIGN KEY (friendID) REFERENCES users(id)  
);`

const SingleChat = `
CREATE TABLE IF NOT EXISTS singleChat (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    sendId INT,  
    receiveID INT,  
    content TEXT,  
    Ctype TINYINT DEFAULT 0 COMMENT '0文字，1图片链接，2音频链接...',  
    Ctime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    status TINYINT DEFAULT 0 COMMENT '0已读，1未读',  
    FOREIGN KEY (sendId) REFERENCES users(id),  
    FOREIGN KEY (receiveID) REFERENCES users(id)  
);`

const Group = `
CREATE TABLE IF NOT EXISTS groupN (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    grouperID INT,  
    groupName VARCHAR(255) NOT NULL,  
    groupUrl VARCHAR(255),  
    groupNews TEXT,  
    groupTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    FOREIGN KEY (grouperID) REFERENCES users(id)  
);`

const GroupPlay = `
CREATE TABLE IF NOT EXISTS groupPlay (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    groupID INT,  
    userID INT,  
    群内名 VARCHAR(255),  
    加入时间 TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    未读消息数 INT DEFAULT 0,  
    isShield TINYINT DEFAULT 0 COMMENT '0不屏蔽，1屏蔽',  
    FOREIGN KEY (groupID) REFERENCES groupN(id),  
    FOREIGN KEY (userID) REFERENCES users(id)  
);`

const GroupMessage = `
CREATE TABLE IF NOT EXISTS groupMessage (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    groupID INT,  
    senderID INT,  
    content TEXT,  
    Ctype TINYINT DEFAULT 0 COMMENT '0文字，1图片链接，2音频链接...',  
    Ctime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    FOREIGN KEY (groupID) REFERENCES groupN(id),  
    FOREIGN KEY (senderID) REFERENCES users(id)  
);`

const ValidatTable = `
CREATE TABLE IF NOT EXISTS verification(  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    email VARCHAR(255) NOT NULL,  
    code VARCHAR(6) NOT NULL,
    codeDate DATETIME NOT NULL,
    UNIQUE KEY (email)
);`

module.exports = [Users,Friends,SingleChat,Group,GroupPlay,GroupMessage,ValidatTable]

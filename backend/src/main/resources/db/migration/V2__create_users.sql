CREATE TABLE users (
    id            BIGINT IDENTITY(1,1) PRIMARY KEY,
    username      NVARCHAR(100) NOT NULL UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    role          NVARCHAR(50)  NOT NULL DEFAULT 'USER',
    created_at    DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME()
);
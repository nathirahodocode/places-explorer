CREATE TABLE favorite_places (
    id            BIGINT IDENTITY(1,1) PRIMARY KEY,
    place_id      NVARCHAR(255)  NOT NULL,
    name          NVARCHAR(500)  NOT NULL,
    address       NVARCHAR(1000),
    latitude      FLOAT,
    longitude     FLOAT,
    created_at    DATETIME2      NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT uq_favorite_places_place_id UNIQUE (place_id)
);
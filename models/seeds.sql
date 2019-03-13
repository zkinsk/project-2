USE dogs_day_out;

INSERT INTO Parks (name, lat, lon, createdAt, updatedAt)
VALUES
	("Barker Field", 37.539114, -77.482023, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("Churchill Dog Park", 37.5239282, -77.4126637, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("Northside Dog Park", 37.5977001, -77.4436564, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("Phideaux Dog Park", 37.5198621, -77.483193, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("Rockwood Park", 37.448200, -77.582310, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    
INSERT INTO Users (email, password, name, profileImage, createdAt, updatedAt)
VALUES
	("dawso.andrew@gmail.com", "$2a$10$hUin0YPkLkKwpqoyw.rptum5iT.1iZE.qCOMzReeGfkzFOKJ6Uize", "Andrew", "https://s3.amazonaws.com/dogs-day-out/3amNcNZotSaqYay5DXXsZ.jpg", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Dogs (name, gender, bio, weight, energy, patience, dominance, profileImage, UserId, createdAt, updatedAt)
VALUES
	("Gumbo", "Male", "A Good Boy", 70, 3, 6, 2, "https://s3.amazonaws.com/dogs-day-out/5QKB6V1J1x2mA4emOhwPI.jpg", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
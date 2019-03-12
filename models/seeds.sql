USE dogs_day_out;

INSERT INTO parks (name, lat, lon, createdAt, updatedAt)
VALUES
	("Barker Field", 37.539114, -77.482023, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("Churchill Dog Park", 37.5239282, -77.4126637, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("Northside Dog Park", 37.5977001, -77.4436564, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("Phideaux Dog Park", 37.5198621, -77.483193, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("Rockwood Park", 37.448200, -77.582310, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO events (date, time, ParkId, createdAt, updatedAt)
VALUES
	("2019-03-09", "Afternoon", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("2019-03-09", "Afternoon", 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("2019-03-09", "Evening", 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    
INSERT INTO users (email, password, name, createdAt, updatedAt)
VALUES
	("dawso.andrew@gmail.com", "$2a$10$hUin0YPkLkKwpqoyw.rptum5iT.1iZE.qCOMzReeGfkzFOKJ6Uize", "Andrew", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO dogs (name, gender, bio, weight, energy, patience, dominance, UserId, createdAt, updatedAt)
VALUES
	("Gumbo", "Male", "A Good Boy", 70, 3, 6, 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    
INSERT INTO attendances (UserId, EventId, createdAt, updatedAt)
VALUES
	(1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
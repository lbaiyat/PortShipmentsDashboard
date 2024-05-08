.mode csv

CREATE TEMP TABLE _csv_import (
    Name TEXT,
    Price REAL,
    Weight REAL,
    Length REAL,
    Width REAL,
    Height REAL,
    ShipmentDate TEXT,
    DestinationPort TEXT
  );
.separator ","
.import "sql/shipmentsData.csv" _csv_import

INSERT INTO Shipment (Name,Price,Weight,Length,Width,Height,ShipmentDate,DestinationPort) SELECT
      Name,
      Price,
      Weight,
      Length,
      Width,
      Height,
      ShipmentDate,
      DestinationPort
FROM _csv_import WHERE 1;
DROP TABLE _csv_import;

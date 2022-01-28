import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imgUrl TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL); ",
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const insertPlace = (title, imgUrl, address, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "INSERT INTO places (title , imgUrl , address , lat , lng ) VALUES (?,?,?,?,?); ",
        [title, imgUrl, address, lat, lng],
        (_, response) => {
          resolve(response);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};
export const fetchAllPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "SELECT * FROM places",
        [],
        (_, response) => {
          resolve(response);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const clearTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql("DELETE FROM places"),
        [],
        (_, response) => {
          resolve(response);
        },
        (_, error) => {
          reject(error);
        };
    });
  });
  return promise;
};

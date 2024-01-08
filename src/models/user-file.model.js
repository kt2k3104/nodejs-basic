import fs from "fs";
import path from "path";

const p = path.join(__dirname, "..", "..", "data", "users.json");

export default class User {
  constructor(name, age, address, email, id) {
    this.name = name;
    this.age = age;
    this.address = address;
    this.email = email;
    this.id = id;
  }

  async save() {
    try {
      const users = await User.fetchAllUsers();
      users.push(this);
      return new Promise((resolve, reject) => {
        fs.writeFile(p, JSON.stringify(users), (err) => {
          if (err) {
            reject(err);
          }

          resolve(true);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  static setUsers(users) {
    try {
      return new Promise((resolve, reject) => {
        fs.writeFile(p, JSON.stringify(users), (err) => {
          if (err) {
            reject(err);
          }

          resolve(true);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  static fetchAllUsers() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }
}

const fs = require('fs');

class MessageHandler {
  constructor(fileName) {
    this.fileName = fileName;
  }

  getAll = async () => {
      let fileContentsAsString = "";
      try {
          fileContentsAsString = await fs.promises.readFile(this.fileName, "utf-8");
      }catch(error) {
          console.log("File could not be found")
      }
      try {
          return JSON.parse(fileContentsAsString);
      } catch(SyntaxError) {
          //inicializa el array para insertar al archivo el primer objeto cuando no se hizo un save
          console.log("File empty");
          return [];
      }
  }
  save = async(message) => {
    try {
      let fileContent = await this.getAll();
      const newObjectToAppend = { ...message };
      const updatedFile = [...fileContent, newObjectToAppend];
      await fs.promises.writeFile(this.fileName, JSON.stringify(updatedFile));
    } catch (error) {
      console.log(`Error reading file ${this.filename}: ${error}`);
      return null;
    }
  };
}
module.exports = MessageHandler;
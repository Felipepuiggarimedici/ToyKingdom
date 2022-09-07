const fs = require('fs');

class CartHandler {
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
          console.log(this.fileName);
          return "File not found";
      }
  }

  getById = async(id) => {
    try {
      let fileContent = await this.getAll();
      let cart = fileContent.find(cart => cart.id == id);
      if (typeof cart === 'undefined') {
        return "Id does not exist";
      }
      return cart;
    } catch (error) {
      console.log(`Error reading file ${this.filename}: ${error}`);
    }
  };
  save = async(cart) => {
    try {
      let fileContent = await this.getAll();
      const lastItem = fileContent[fileContent.length - 1];
      let newId = 0;
      if (typeof lastItem !== 'undefined') {
        newId = parseInt(lastItem.id) + 1;
      }
      const newObjectToAppend = { ...cart, id: (newId).toString() };
      const updatedFile = [...fileContent, newObjectToAppend];
      await fs.promises.writeFile(this.fileName, JSON.stringify(updatedFile));
      return newId.toString();
    } catch (error) {
      console.log(`Error reading file ${this.filename}: ${error}`);
      return null;
    }
  };
  deleteById = async(id) => {
    try {
      let fileContent = await this.getAll();
      let cartFound = false;
      fileContent = fileContent.filter(cart => {
        if (cart.id === id) {
          cartFound = true;
        }
        return cart.id !== id
      });
      await fs.promises.writeFile(this.fileName, JSON.stringify(fileContent));
      return cartFound;
    } catch (error) {
      console.log(error)
      return `Error: ${error}`
    }
  };
  changeCart = async (cartId, cartArray) => {
    try {
      let fileContent = await this.getAll();
      if (fileContent.some(cartInFile => cartInFile.id === cartId)) {
        //id has to be replaced
        const indexForReplacement = fileContent.findIndex(cart => cart.id === cartId);
        fileContent[indexForReplacement] = {id: cartId, productList: cartArray};
      } else {
        fileContent.push({id: cartId, productList: cartArray});
      }
        await fs.promises.writeFile(this.fileName, JSON.stringify(fileContent));
        return (cartId);
    } catch (error) {
      return `File couldn't be updated ${error}`;
    }
  }
}
export default CartHandler;
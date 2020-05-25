// LOCALSTORAGE
export const STORAGE = "productos mi carrito";


// ARRAYS FUNCIONES
export const removeArrayDuplicates = (array) => {
    // array sin duplicados
    return Array.from(new Set(array))
  };

  export const removeItemArray = (array, item) => {
 
    const index = array.indexOf(item)
    if (index > -1){
        array.splice(index, 1)
    }
 
     return array
   };


   export const countDuplicatesItemArray = (value, array) => {
    let count = 0;
  
    array.forEach((element) => {
      if (element === value) {
        count++;
      }
    });
  
    return count;
  };
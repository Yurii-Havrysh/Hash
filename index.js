function hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        let char = key.charCodeAt(i);
        hash = (hash << 5) - hash + char;
    }; //iteration through key

    hash |= 0;
    return hash;
} //creating custom hash function

console.log(hash('test'));

//Data structure for the hash table
class HashTable {
    constructor(size = 10) {
      this.size = size;
      this.buckets = new Array(size).fill(null).map(() => []); 
    } //appropriating each bucket with an empty array
  
    hash(key) {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        let char = key.charCodeAt(i);
        hash = (hash << 5) - hash + char;
      } 
      hash |= 0;
      return Math.abs(hash) % this.size;
    } //modifying custom hash function to get index within the bounds of table's size
  
    insert(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [existingKey, _] = bucket[i]; /*exisingKey is variable as a key and '_' is something insted of value, 
            because we don't need to check value*/
            if (existingKey === key) {
                bucket[i][1] = value;
                return;
            }
        } //updating value for the same key. This is example of collision handling itself

      bucket.push([key, value]);
    } //creating key-value pair formula
  
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [existingKey, value] = bucket[i];
            if (existingKey === key) {
                return value; 
            }
        }
      return undefined;
    } //formula for retrieving value for key
  
    delete(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
  
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i].key === key) {
          bucket.splice(i, 1); 
          return; 
        }
      }
    } 
  }


const exempHashTable = new HashTable; //setting limit of 10 slots (buckets) where key-value pairs get inserted
exempHashTable.insert('name', 'Eric');
exempHashTable.insert('Eric', 'name'); //collision handling here
exempHashTable.insert('surname', 'Lopez');
exempHashTable.insert('index', 45);
exempHashTable.insert('id number', 45345323212);


exempHashTable.delete('id number');


console.log(exempHashTable.get('name'));
console.log(exempHashTable.get('Eric'));
console.log(exempHashTable.get('surname'));
console.log(exempHashTable.get('index'));
console.log(exempHashTable.get('email')); //'undefined' because there is no key 'email
console.log(exempHashTable.get('id number')); //'undefined' because of deleting this key
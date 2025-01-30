import LinkedList from "./LinkedList.js";

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.8;
    this.array = [];
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);

    if (!this.array[hashCode]) {
      this.array[hashCode] = new LinkedList({ key, value });
      this.array[hashCode].append({ key, value });
    } else if (this.array[hashCode].contains("serg")) {
      const index = this.array[hashCode].find(key);
      this.array[hashCode].at(index).value.value = value;
    } else {
      this.array[hashCode].append({ key, value });
    }
  }
}

export default HashMap;

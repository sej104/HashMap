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
    const bucket = this.array[this.hash(key)];

    if (!bucket) {
      this.array[hashCode] = new LinkedList();
      this.array[hashCode].append({ key, value });
    } else if (bucket.contains(key)) {
      const keyIndex = bucket.find(key);
      bucket.at(keyIndex).value.value = value;
    } else {
      bucket.append({ key, value });
    }
  }

  get(key) {
    const bucket = this.array[this.hash(key)];
    if (!bucket || !bucket.contains(key)) return null;

    const keyIndex = bucket.find(key);
    const keyValue = bucket.at(keyIndex).value.value;
    return keyValue;
  }

  has(key) {
    const bucket = this.array[this.hash(key)];
    if (!bucket || !bucket.contains(key)) return false;
    return true;
  }

  remove(key) {
    let bucket = this.array[this.hash(key)];
    if (!bucket || !bucket.contains(key)) return false;

    const keyIndex = bucket.find(key);
    bucket.removeAt(keyIndex);
    if (!bucket.size()) this.array[this.hash(key)] = null;
    return true;
  }

  length() {
    let total = 0;
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i]) {
        total += this.array[i].size();
      }
    }
    return total;
  }
}

export default HashMap;

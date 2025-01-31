import LinkedList from "./LinkedList.js";
import Node from "./Node.js";

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  checkIndex(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
  }

  increaseBuckets() {
    this.capacity = this.capacity * 2;
    const copy = [...this.buckets];
    this.clear();

    for (let bucket of copy) {
      if (bucket) {
        let temp = bucket.head;
        while (temp) {
          this.set(temp.value.key, temp.value.value);
          temp = temp.nextNode;
        }
      }
    }
  }

  set(key, value) {
    const hashCode = this.hash(key);
    this.checkIndex(hashCode);
    const bucket = this.buckets[hashCode];

    if (!bucket) {
      this.buckets[hashCode] = new LinkedList(new Node({ key, value }));
    } else if (bucket.contains(key)) {
      const keyIndex = bucket.find(key);
      bucket.at(keyIndex).value.value = value;
    } else {
      bucket.append({ key, value });
    }

    if (this.length() > this.capacity * this.loadFactor) {
      this.increaseBuckets();
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    this.checkIndex(hashCode);
    const bucket = this.buckets[hashCode];

    if (!bucket || !bucket.contains(key)) return null;

    const keyIndex = bucket.find(key);
    return bucket.at(keyIndex).value.value;
  }

  has(key) {
    const hashCode = this.hash(key);
    this.checkIndex(hashCode);
    const bucket = this.buckets[hashCode];

    if (!bucket || !bucket.contains(key)) return false;
    return true;
  }

  remove(key) {
    const hashCode = this.hash(key);
    this.checkIndex(hashCode);
    const bucket = this.buckets[hashCode];

    if (!bucket || !bucket.contains(key)) return false;

    const keyIndex = bucket.find(key);
    bucket.removeAt(keyIndex);
    if (!bucket.size()) this.buckets[hashCode] = null;

    return true;
  }

  length() {
    let count = 0;
    for (let bucket of this.buckets) {
      if (bucket) {
        count += bucket.size();
      }
    }
    return count;
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.capacity = 16;
  }

  keys() {
    const keys = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        let temp = bucket.head;
        while (temp) {
          keys.push(temp.value.key);
          temp = temp.nextNode;
        }
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        let temp = bucket.head;
        while (temp) {
          values.push(temp.value.value);
          temp = temp.nextNode;
        }
      }
    }
    return values;
  }

  entries() {
    const entries = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        let temp = bucket.head;
        while (temp) {
          entries.push([temp.value.key, temp.value.value]);
          temp = temp.nextNode;
        }
      }
    }
    return entries;
  }
}

export default HashMap;

import Node from "./Node.js";

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    if (!this.head) this.head = new Node(value);
    else {
      let temp = this.head;
      while (temp.nextNode) temp = temp.nextNode;
      temp.nextNode = new Node(value);
    }
  }

  size() {
    let count = 0;
    let temp = this.head;
    while (temp) {
      temp = temp.nextNode;
      count += 1;
    }
    return count;
  }

  at(index) {
    if (index < 0 || index >= this.size()) return null;
    let currentIndex = 0;
    let temp = this.head;
    while (currentIndex < index) {
      temp = temp.nextNode;
      currentIndex += 1;
    }
    return temp;
  }

  contains(key) {
    let temp = this.head;
    while (temp) {
      if (temp.value.key === key) return true;
      temp = temp.nextNode;
    }
    return false;
  }

  find(key) {
    let currentIndex = 0;
    let temp = this.head;
    while (temp) {
      if (temp.value.key === key) return currentIndex;
      temp = temp.nextNode;
      currentIndex += 1;
    }
    return null;
  }

  removeAt(index) {
    if (index < 0 || index >= this.size()) return;
    if (index === 0) {
      this.head = this.head.nextNode;
      return;
    }

    let currentIndex = 0;
    let previous = null;
    let current = this.head;

    while (currentIndex < index) {
      previous = current;
      current = current.nextNode;
      currentIndex += 1;
    }
    previous.nextNode = current.nextNode;
  }
}

export default LinkedList;

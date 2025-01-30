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

  prepend(value) {
    this.head = new Node(value, this.head);
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

  head() {
    return this.head;
  }

  tail() {
    if (!this.head) return null;
    let temp = this.head;
    while (temp.nextNode) temp = temp.nextNode;
    return temp;
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

  pop() {
    if (!this.head) return;
    if (this.size() === 1) {
      this.head = null;
      return;
    }
    let previous;
    let current = this.head;
    while (current.nextNode) {
      previous = current;
      current = current.nextNode;
    }
    previous.nextNode = null;
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

  toString() {
    let temp = this.head;
    let string = "";
    while (temp) {
      string += `( ${temp.value} ) -> `;
      temp = temp.nextNode;
    }
    return (string += "null");
  }

  insertAt(value, index) {
    if (index < 0) return;
    if (index === 0) {
      this.prepend(value);
      return;
    }
    if (index >= this.size()) {
      this.append(value);
      return;
    }

    let currentIndex = 0;
    let temp = this.head;
    while (currentIndex + 1 < index) {
      temp = temp.nextNode;
      currentIndex += 1;
    }
    temp.nextNode = new Node(value, temp.nextNode);
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

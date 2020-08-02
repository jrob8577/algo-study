
class Node {
  constructor(num, node = undefined) {
    this.value = num;
    this.next = node;
  }

  set value(num) {
    this.val = num;
  }

  get value() {
    return this.val;
  }

  set next(node) {
    this.nextNode = node;
  }

  get next() {
    return this.nextNode;
  }
}

class LinkedList {
  constructor() {
    this.head = undefined;
    this.end = undefined;
    this.count = 0;
  }

  get length() {
    return this.count;
  }

  add(num) {
    if (this.head === undefined) {
      this.head = new Node(num);
      this.end = this.head;
    } else {
      this.end.next = new Node(num);
      this.end = this.end.next;
    }

    this.count = this.count + 1;
  }

  includes(num) {
    let walker = this.head;

    while (walker !== undefined) {
      if (walker.value === num) {
        return true;
      }
      walker = walker.next;
    }

    return false;
  }

  getValueAt(index) {
    let walker = this.head, count = 0;

    while (walker !== undefined && count < index) {
      count++;
      walker = walker.next;
    }

    if (walker !== undefined) {
      return walker.value;
    } else {
      return undefined;
    }
  }

  toString() {
    const temp = [];
    let walker = this.head;

    while (walker !== undefined) {
      temp.push(walker.value);
      walker = walker.next;
    }

    return `${temp.join(' -> ')}`;
  }
}

const solution = (listOne, listTwo) => {
  const union = new LinkedList(), intersection = new LinkedList();
  const tracking = {};

  let temp, val;
  for (let i = 0; i < listOne.length; i++) {
    val = listOne.getValueAt(i);
    temp = tracking[val];

    if (temp === undefined) {
      union.add(val);
      tracking[val] = true;
    }
  }

  for (let j = 0; j < listTwo.length; j++) {
    val = listTwo.getValueAt(j);
    temp = tracking[val];

    if (temp !== undefined) {
      intersection.add(val);
    } else {
      union.add(val);
    }
  }

  return [union, intersection];
}


const listOne = new LinkedList();
listOne.add(10);
listOne.add(15);
listOne.add(4);
listOne.add(20);

const listTwo = new LinkedList();
listTwo.add(8);
listTwo.add(4);
listTwo.add(2);
listTwo.add(10);

(() => {
  const [
    union, intersection
  ] = solution(listOne, listTwo);

  console.log(`Testing intersection: ${intersection.toString()}`);
  console.log(intersection.includes(4));
  console.log(intersection.includes(10));
  console.log(intersection.length === 2);

  console.log(`Testing union: ${union.toString()}`);
  console.log(union.includes(10));
  console.log(union.includes(15));
  console.log(union.includes(4));
  console.log(union.includes(20));
  console.log(union.includes(8));
  console.log(union.includes(2));
  console.log(union.length === 6);
})()


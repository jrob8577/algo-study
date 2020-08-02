class LinkedListNode {
  constructor(value) {
    this._value = value;
    this._next = undefined;
  }

  get value() {
    return this._value;
  }

  get next() {
    return this._next;
  }

  set next(nextNode) {
    this._next = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.head = undefined;
    this.tail = undefined;
    this.size = 0;
  }

  insert(element) {
    if (this.head === undefined) {
      // When the list is empty
      this.head = new LinkedListNode(element);
      this.tail = this.head;
    } else {
      // When the list is not empty
      // let walker = this.head;

      // while(walker.next !== undefined) {
      //   walker = walker.next;
      // }

      // walker.next = new LinkedListNode(element);
      this.tail.next = new LinkedListNode(element);
      this.tail = this.tail.next;
    }

    this.size = this.size + 1;
  }

  delete(element) {
    if (this.head === undefined) {
      return;
    }

    if (this.head.value === element) {
      this.head = this.head.next;
      this.size = this.size - 1;
    } else {
      let walker = this.head;

      while (walker.next.value !== element && walker !== undefined) {
        walker = walker.next;
      }

      if (walker !== undefined) {
        walker.next = walker.next.next;
        this.size = this.size - 1;

        if (walker.next === undefined) {
          tail = walker;
        }
      }
    }
  }

  toString() {
    const temp = [];
    let walker = this.head;

    while (walker !== undefined) {
      temp.push(walker.value);
      walker = walker.next;
    }

    return `[${temp.join(' ')}] (${this.size})`
  }
}


(() => {
  const list = new LinkedList();

  for (let i = 0; i < 10; i++) {
    list.insert(i);
    console.log(list.toString());
  }

  list.delete(4);
  console.log(list.toString());
})()
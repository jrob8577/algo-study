class LinkedList {
  constructor() {
    this.list = [];
    this.size = 0;
  }

  /**
   * this.list = []
   * this.size = 0
   *
   * insert(42)
   * this.list[0] = 42;
   * this.size = 1
   *
   * insert(43)
   * this.list[1] = 42
   * this.size = 2
   */
  insert(element) {
    this.list[this.size] = element;
    this.size = this.size + 1;
  }

  delete(element) {
    let index = 0;

    while (index < this.size && this.list[index] !== element) {
      index++;
    }
    /*
           0  1  2  3  4
        [ 42 28 19 35 15 ]
                 ^

        delete(19)

        size | index | this.list[index]
           5 | 0     | 42
           5 | 1     | 28
           5 | 2     | 19
    */
    // for(optional_initialization; optional_sentinel; optional_post_update)
    // for(;;) {

    // }
    for (; index < this.size - 1; index++) {
      this.list[index] = this.list[index + 1];
    }

    this.size = this.size - 1;

    // this.list = [
    //   ...this.slice(0, index),
    //   ...this.slice(index + 1)
    // ];
    // this.size = this.size - 1;
  }

  toString() {
    const temp = [];

    for (let i = 0; i < this.size; i++) {
      temp.push(i);
    }

    return `[${temp.join(' ')}] (${this.size})`;
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

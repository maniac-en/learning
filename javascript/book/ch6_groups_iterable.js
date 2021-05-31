#!/usr/bin/env node

class Group {
    constructor() {
        this.members = [];
    }

    add(value) {
        if (!this.has(value)) {
            this.members.push(value);
        }
    }

    delete(value) {
        this.members = this.members.filter(v => v !== value);
    }

    has(value) {
        return this.members.includes(value);
    }

    static from(collection) {
        let group = new Group;
        for (let value of collection) {
            group.add(value);
        }
        return group;
    }

    [Symbol.iterator]() {
        return new GroupIterator(this);
    }
}

class GroupIterator {
    constructor(group) {
        this.index = 0;
        this.group = group;
    }

    next() {
        if (this.index >= this.group.members.length) {
            return {
                undefined,
                done: true
            };
        } else {
            let result = {
                value: this.group.members[this.index],
                done: false
            };
            this.index++;
            return result;
        }
    }
}

// test
for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}

export class Todo {
    id: number;
    title: string;
    description: string;
    image: string;
    due: Date;
    completed: boolean = false;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }
export class TaskEntity{
    private id: string;
    private title: string;

    constructor(id: string, title: string){
        this.id = id;
        this.title = title;
    }

    static toJSON(value: TaskEntity){
        return JSON.stringify(value);
    }

    static fromJSON(value: string){
        return JSON.parse(value) as TaskEntity;
    }
}
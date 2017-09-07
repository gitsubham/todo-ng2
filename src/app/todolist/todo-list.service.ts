import { Injectable } from '@angular/core';
import { ITask } from '../_models/';

@Injectable()
export class ToDoListService {
    private _itemsInTodoList: Array<ITask> = [];  
    
    fetchTodoList  = () : Array<ITask> => this._itemsInTodoList;

    addItemInTodoList  = (item: ITask) : Array<ITask> => {
        this._itemsInTodoList[item.id] = item;
        return this.fetchTodoList();
    };

    deleteItemFromTodoList = (index : number) => {
        this._itemsInTodoList.splice(index,1);
        return this.fetchTodoList();
    }
}
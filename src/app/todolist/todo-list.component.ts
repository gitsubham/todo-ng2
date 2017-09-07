import { Component, Input, OnInit } from '@angular/core';

import { User, ITask } from '../_models/';
import { ToDoListService } from './todo-list.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'to-do-list',
    templateUrl: 'todo-list.component.html',
    styleUrls : ['todo-list.component.css'],
    providers: [ToDoListService, ] 
})

export class ToDoListComponent implements OnInit {

    private _tasksInTodoList : Array<ITask> = [];
    private _showToDoList: boolean = false;
    private _toDoListName: string = '';
    private _selectedTaskIds: Array<number> = [];

    @Input() currentUser : User; 
    constructor(private _toDoListService: ToDoListService ) {}

    ngOnInit() {
       this._tasksInTodoList = this._toDoListService.fetchTodoList();
    }

    addItemInToDoList = (index: number = 0) => {
        const dummyTask = this._addDummyTask(this._tasksInTodoList.length);
        this._tasksInTodoList = this._toDoListService.addItemInTodoList(dummyTask);
    }
    
    createToDoList = () => {
        this._showToDoList = true;
        this.addItemInToDoList();
    }

    _addDummyTask = (index: number = 0) : ITask => {
        return {id: index, caption : ''};
    }

    saveItem = (caption: string, index : number) => {
        this._tasksInTodoList = this._toDoListService.addItemInTodoList({
            id : index,
            caption: caption,
        });
    }

    deleteMultiItemsFromToDoList = (taskId: number) => {
        if (this._selectedTaskIds) {
            for (let i:number = this._selectedTaskIds.length -1; i >= 0; i--) {
                if (this._selectedTaskIds[i] >= 0) {
                   this._toDoListService.deleteItemFromTodoList(i);
                }
            }
        }
       this._tasksInTodoList = this._toDoListService.fetchTodoList();
       this._selectedTaskIds = [];
       if (!this._tasksInTodoList.length) {
            this._showToDoList = false;
        }
    }

    appendToSelectedTaskList = (index: number) => {
        if (this._selectedTaskIds[index] >=0 ) {
            this._selectedTaskIds[index] = -1;
        } else {
            this._selectedTaskIds[index] = index;
        }
    }

    deleteSingleItemFromToDoList = (index: number) => {
        if (this._selectedTaskIds && this._selectedTaskIds[index] >=0) { 
            this._selectedTaskIds.splice(index,1);
        }
        this._toDoListService.deleteItemFromTodoList(index);
        if (!this._tasksInTodoList.length) {
            this._showToDoList = false;
        }
    }

    shouldShowMultiDelete() {
        let counter =0;
        if (this._selectedTaskIds) {
            this._selectedTaskIds.forEach((taskId) => {
                if (this._selectedTaskIds[taskId]>= 0) {
                    counter++;
                }
            })
        }
        return (counter >0) ? true : false;
    }
}
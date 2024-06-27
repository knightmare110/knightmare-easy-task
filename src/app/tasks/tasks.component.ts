import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { type NewTask } from './task/task.model';
import { TasksService } from './tasks.service';
@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, NewTaskComponent],
})
export class TasksComponent {
  @Input({ required: true }) name?: string;
  @Input({ required: true }) userId!: string;
  isShowAddModal: boolean = false;

  constructor(private tasksService: TasksService) {}

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId);
  }

  onStartAddTask() {
    this.isShowAddModal = true;
  }

  onCloseAddTask() {
    this.isShowAddModal = false;
  }

  onAddTask(taskData: NewTask) {
    this.isShowAddModal = false;
    this.tasksService.addTask(taskData, this.userId);
  }
}

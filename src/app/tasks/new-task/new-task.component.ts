import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { type NewTask } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({required: true}) userId!: string;
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<NewTask>();

  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');

  private tasksService = inject(TasksService);

  onCancelAddTask() {
    this.close.emit();
  }

  onSubmit() {
    this.tasksService.addTask({
      title: this.enteredTitle(),
      summary: this.enteredSummary(),
      dueDate: this.enteredDate(),
    }, this.userId);
    this.close.emit();
  }
}

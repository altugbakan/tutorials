import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Board } from '../board.model';
import { BoardService } from '../board.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit, OnDestroy {
  boards: Board[] = [];
  sub: Subscription | undefined;

  constructor(public boardService: BoardService) {}

  ngOnInit(): void {
    this.sub = this.boardService.getUserBoards().subscribe((boards) => {
      this.boards = boards;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards!, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(this.boards);
  }
}

import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  arrayRemove,
  query,
  where,
  orderBy,
  getDocs,
  writeBatch,
} from '@angular/fire/firestore';
import { Board, Task } from './board.model';
import { Observable, from, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private afAuth: Auth, private db: Firestore) {}

  // Creates a new board for the current user
  createBoard(data: Board) {
    const user = this.afAuth.currentUser;
    return addDoc(collection(this.db, 'boards'), {
      ...data,
      uid: user?.uid,
      tasks: [{ description: 'Hello!', label: 'yellow' }],
    });
  }

  // Delete board
  deleteBoard(boardId: string) {
    return deleteDoc(doc(this.db, 'boards', boardId));
  }

  // Update the tasks on the board
  updateTasks(boardId: string, tasks: Task[]) {
    updateDoc(doc(this.db, 'boards', boardId), { tasks });
  }

  // Remove a specific task from the board
  removeTask(boardId: string, task: Task) {
    updateDoc(doc(this.db, 'boards', boardId), {
      tasks: arrayRemove(task),
    });
  }

  // Get all boards owned by current user
  getUserBoards(): Observable<Board[]> {
    const user = this.afAuth.currentUser;
    if (user) {
      const q = query(
        collection(this.db, 'boards'),
        where('uid', '==', user?.uid),
        orderBy('priority')
      );
      return from(getDocs(q)).pipe(
        switchMap((snapshot) => {
          const boards = snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Board)
          );
          return of(boards);
        })
      );
    } else {
      return of([]);
    }
  }

  // Batch write to change the priority of each board for sorting
  async sortBoards(boards: Board[]) {
    const batch = writeBatch(this.db);
    const refs = boards.map((b) => doc(collection(this.db, 'boards'), b.id));
    refs.forEach((doc, idx) => batch.update(doc, { priority: idx }));

    await batch.commit();
  }
}

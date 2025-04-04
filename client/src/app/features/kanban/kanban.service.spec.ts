/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KanbanService } from './kanban.service';

describe('Service: Kanban', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KanbanService]
    });
  });

  it('should ...', inject([KanbanService], (service: KanbanService) => {
    expect(service).toBeTruthy();
  }));
});

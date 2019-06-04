import { TestBed } from '@angular/core/testing';

import { TodosApiService } from './todos-api.service';

describe('TodosApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodosApiService = TestBed.get(TodosApiService);
    expect(service).toBeTruthy();
  });
});

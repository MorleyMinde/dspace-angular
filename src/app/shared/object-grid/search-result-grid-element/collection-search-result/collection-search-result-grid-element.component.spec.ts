import { CollectionSearchResultGridElementComponent } from './collection-search-result-grid-element.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TruncatePipe } from '../../../utils/truncate.pipe';
import { Collection } from '../../../../core/shared/collection.model';
import { TruncatableService } from '../../../truncatable/truncatable.service';
import { CollectionSearchResult } from '../../../object-collection/shared/collection-search-result.model';

let collectionSearchResultGridElementComponent: CollectionSearchResultGridElementComponent;
let fixture: ComponentFixture<CollectionSearchResultGridElementComponent>;

const truncatableServiceStub: any = {
  isCollapsed: (id: number) => Observable.of(true),
};

const mockCollectionWithAbstract: CollectionSearchResult = new CollectionSearchResult();
mockCollectionWithAbstract.hitHighlights = [];
mockCollectionWithAbstract.dspaceObject = Object.assign(new Collection(), {
  metadata: [
    {
      key: 'dc.description.abstract',
      language: 'en_US',
      value: 'Short description'
    } ]
});

const mockCollectionWithoutAbstract: CollectionSearchResult = new CollectionSearchResult();
mockCollectionWithoutAbstract.hitHighlights = [];
mockCollectionWithoutAbstract.dspaceObject = Object.assign(new Collection(), {
  metadata: [
    {
      key: 'dc.title',
      language: 'en_US',
      value: 'Test title'
    } ]
});

describe('CollectionSearchResultGridElementComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionSearchResultGridElementComponent, TruncatePipe ],
      providers: [
        { provide: TruncatableService, useValue: truncatableServiceStub },
        { provide: 'objectElementProvider', useValue: (mockCollectionWithAbstract) }
      ],

      schemas: [ NO_ERRORS_SCHEMA ]
    }).overrideComponent(CollectionSearchResultGridElementComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CollectionSearchResultGridElementComponent);
    collectionSearchResultGridElementComponent = fixture.componentInstance;
  }));

  describe('When the collection has an abstract', () => {
    beforeEach(() => {
      collectionSearchResultGridElementComponent.dso = mockCollectionWithAbstract.dspaceObject;
      fixture.detectChanges();
    });

    it('should show the description paragraph', () => {
      const collectionAbstractField = fixture.debugElement.query(By.css('p.card-text'));
      expect(collectionAbstractField).not.toBeNull();
    });
  });

  describe('When the collection has no abstract', () => {
    beforeEach(() => {
      collectionSearchResultGridElementComponent.dso = mockCollectionWithoutAbstract.dspaceObject;
      fixture.detectChanges();
    });

    it('should not show the description paragraph', () => {
      const collectionAbstractField = fixture.debugElement.query(By.css('p.card-text'));
      expect(collectionAbstractField).toBeNull();
    });
  });
});

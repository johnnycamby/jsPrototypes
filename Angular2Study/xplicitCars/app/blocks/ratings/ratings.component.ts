
import { Component, OnChanges, Input, Output, OnInit, EventEmitter } from 'angular2/core'


@Component({
    selector: 'app-rating',
    templateUrl: 'app/blocks/ratings/ratings.component.html'
})

export class RatingsComponent implements OnChanges, OnInit {

    @Input() rating: number;
    starWidth: number;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges() { }

    ngOnInit() { }
}
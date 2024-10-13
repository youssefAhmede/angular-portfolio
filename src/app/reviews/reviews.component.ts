import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewsService } from '../services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviewForm: FormGroup;
  reviews: any[] = []; // خاصية جديدة لتخزين المراجعات
  formSubmitted: boolean = false;
  submissionMessage: string = '';

  constructor(private fb: FormBuilder, private reviewsService: ReviewsService) {
    this.reviewForm = this.fb.group({
      rate: ['', Validators.required],
      comment: ['', Validators.required],
      
    });
  }

  ngOnInit(): void {
    this.loadReviews(); // جلب المراجعات عند تحميل المكون
  }

  loadReviews(): void {
    this.reviewsService.getReviews().subscribe({
      next: (data) => {
        this.reviews = data; // تخزين المراجعات في الخاصية
      },
      error: (err) => {
        console.error('Error fetching reviews', err);
      }
    });
  }

  onSubmit(): void {
    const newReview = {
      rate: this.reviewForm.value.rate,
      comment: this.reviewForm.value.comment,
    };
    this.reviewsService.addReview(newReview).subscribe({
      next: () => {
        this.submissionMessage = 'Review added successfully!';
        this.formSubmitted = true;
        this.reviewForm.reset();
        this.loadReviews(); // جلب المراجعات مرة أخرى بعد إضافة مراجعة جديدة
      },
      error: (err) => {
        this.submissionMessage = 'Error adding Review. Please try again.';
        console.error(err);
      }
    });
  }
}

import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { SharedService } from '../user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, CommonModule } from '@angular/common';
import { NgModel, FormsModule } from '@angular/forms';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  // Change any types to something else
  userData: any;
  userSnippets: any;
  selectedSnippet: any;
  snippetSearch: string = '';
  allSnippets: any;
  isCreatingNewSnippet: boolean = true;
  isEditingSnippet: boolean = false;

  // New snippet
  title = '';
  language = '';
  content = '';

  //Edit snippet
  newTitle = '';
  newLanguage = '';
  newContent = '';

  route: ActivatedRoute = inject(ActivatedRoute);

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.sharedService.userData$.subscribe((data) => {
      this.userData = data;
    });

    this.sharedService.getSnippets(this.userData?.id).subscribe((snippets) => {
      this.allSnippets = snippets;
      this.userSnippets = snippets;
    });
  }

  filterSnippets() {
    if (this.snippetSearch) {
      this.userSnippets = this.allSnippets.filter((item: any) =>
        item.title.toLowerCase().includes(this.snippetSearch.toLowerCase())
      );
    } else {
      this.userSnippets = this.allSnippets;
    }
  }

  createNewSnippet() {
    this.isCreatingNewSnippet = true;
    this.selectedSnippet = null;
  }

  selectSnippet(snippet: any) {
    this.isCreatingNewSnippet = false;
    this.selectedSnippet = snippet;
    console.log(this.selectedSnippet);
  }

  addNewSnippet() {
    if (this.title != '' && this.language != '' && this.content != '') {
      this.sharedService
        .addSnippet(this.title, this.language, this.content, this.userData?.id)
        .subscribe({
          next: () => {
            window.location.reload();
          },
        });
    }
  }

  removeSnippet() {
    this.sharedService.removeSnippet(this.selectedSnippet?.id).subscribe({
      next: () => {
        setInterval(() => {
          window.location.reload();
        }, 100);
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  copy(elementId: string) {
    const element = this.el.nativeElement.querySelector(elementId);

    if (element) {
      const content = element.innerText || element.textContent;

      const textarea = document.createElement('textarea');
      textarea.value = content;
      document.body.appendChild(textarea);

      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      alert('Content copied to clipboard!');
    } else {
      console.error(`Element with ID ${elementId} not found`);
    }
  }

  allowEditSnippet() {
    this.isEditingSnippet = !this.isEditingSnippet;
  }

  onTitleBlur(event: any) {
    this.newTitle = event.target.innerText;
  }

  onLanguageBlur(event: any) {
    this.newLanguage = event.target.innerText;
  }

  onContentBlur(event: any) {
    this.newContent = event.target.innerText;
  }

  editSnippet() {
    this.sharedService
      .editSnippet(
        this.selectedSnippet.id,
        this.newTitle || this.selectedSnippet.title,
        this.newLanguage || this.selectedSnippet.language,
        this.newContent || this.selectedSnippet.content
      )
      .subscribe({
        next: () => {
          window.location.reload(); // or update the local snippet list
        },
        error: (err) => {
          console.error(err); // log the error
          alert('Error updating snippet: ' + err.message);
        },
      });
  }
}

import { Component, ElementRef, inject, Input, OnChanges } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SnippetService } from '../services/snippet.service';

interface SingleSnippet {
  id: number;
  title: string;
  language: string;
  content: string;
  userid: number;
}

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
  userSnippets: SingleSnippet[] = [];
  selectedSnippet: SingleSnippet = {
    id: 0,
    language: '',
    title: '',
    content: '',
    userid: 0,
  };
  snippetSearch: string = '';
  allSnippets: SingleSnippet[] = [];
  isCreatingNewSnippet: boolean = true;
  isEditingSnippet: boolean = false;
  copied = false;

  // New snippet
  title = '';
  language = '';
  content = '';

  //Edit snippet
  newTitle = '';
  newLanguage = '';
  newContent = '';
  clearFields = false;

  route: ActivatedRoute = inject(ActivatedRoute);

  constructor(
    private userService: UserService,
    private snippetService: SnippetService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.userService.userData$.subscribe((data) => {
      this.userData = data;
    });

    this.snippetService.getSnippets(this.userData?.id).subscribe((snippets) => {
      this.allSnippets = snippets;
      this.userSnippets = snippets;
    });
  }

  checkFields(): void {
    this.clearFields =
      !this.newTitle || !this.newLanguage || !this.newContent ? true : false;
  }

  clearFieldsFn(): void {
    this.content = '';
    this.language = '';
    this.title = '';
    this.clearFields = false;
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
    this.selectedSnippet = {
      id: 0,
      language: '',
      title: '',
      content: '',
      userid: 0,
    };
  }

  selectSnippet(snippet: any) {
    this.isCreatingNewSnippet = false;
    this.selectedSnippet = snippet;
    console.log(this.selectedSnippet);
  }

  addNewSnippet() {
    if (this.title != '' && this.language != '' && this.content != '') {
      this.snippetService
        .addSnippet(this.title, this.language, this.content, this.userData?.id)
        .subscribe({
          next: () => {
            window.location.reload();
          },
        });
    }
  }

  removeSnippet() {
    this.snippetService.removeSnippet(this.selectedSnippet?.id).subscribe({
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
    this.copied = true;
    const element = this.el.nativeElement.querySelector(elementId);

    if (element) {
      const content = element.innerText || element.textContent;

      const textarea = document.createElement('textarea');
      textarea.value = content;
      document.body.appendChild(textarea);

      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      setTimeout(() => {
        this.copied = false;
      }, 2000);
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
    this.snippetService
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

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}

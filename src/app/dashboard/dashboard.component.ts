import { Component, inject } from '@angular/core';
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

  constructor(private sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    this.sharedService.userData$.subscribe((data) => {
      this.userData = data;
    });

    this.sharedService.getSnippets(this.userData.id).subscribe((snippets) => {
      this.allSnippets = snippets;
      this.userSnippets = snippets; // Show all snippets initially
    });
  }

  filterSnippets() {
    // For the search input
    if (this.snippetSearch) {
      this.userSnippets = this.allSnippets.filter((item: any) =>
        item.title.toLowerCase().includes(this.snippetSearch.toLowerCase())
      );
    } else {
      // If there's no search term, show all snippets
      this.userSnippets = this.allSnippets;
    }
  }

  // Method to display the new snippet template
  createNewSnippet() {
    this.isCreatingNewSnippet = true;
    this.selectedSnippet = null;
  }

  selectSnippet(snippet: any) {
    // Display the selected snippet in the dashboard
    this.isCreatingNewSnippet = false;
    this.selectedSnippet = snippet;
    console.log(this.selectedSnippet);
  }

  addNewSnippet() {
    // send a request to the server to add a new snippet
    if (this.title != '' && this.language != '' && this.content != '') {
      this.sharedService
        .addSnippet(this.title, this.language, this.content, this.userData.id)
        .subscribe({
          next: () => {
            window.location.reload();
          },
        });
    }
  }

  removeSnippet() {
    // send a request to the server to remove a snippet
    this.sharedService.removeSnippet(this.selectedSnippet?.id).subscribe({
      next: () => {
        setInterval(() => {
          window.location.reload();
        }, 100);
      },
      error: (err) => {
        alert(err);
        // Optionally, show an error message to the user
      },
    });
  }

  copy(text: string) {
    // copy the content of a snippet
    const element = document.querySelector(text);

    if (
      (element && element instanceof HTMLInputElement) ||
      element instanceof HTMLTextAreaElement
    ) {
      element.select();
      document.execCommand('copy');
      element.setSelectionRange(0, 0);
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
        this.newTitle || this.selectedSnippet.title, // fallback to current values if empty
        this.newLanguage || this.selectedSnippet.language,
        this.newContent || this.selectedSnippet.content,
        this.userData.id
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

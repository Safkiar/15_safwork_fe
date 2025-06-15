import { Component, input, signal, computed, effect, output } from '@angular/core';
import { Job }                                     from '../../services/job.service';
import { MatButtonModule }                        from '@angular/material/button';
import { MatIconModule }                          from '@angular/material/icon';
import { MatFormFieldModule }                     from '@angular/material/form-field';
import { MatInputModule }                         from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-job-list',
  standalone: true,
    imports: [
    MatButtonModule,  
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ],
  templateUrl: './job-list.html',
  styleUrls:   ['./job-list.scss']
})
export class JobList {
  displayedColumns = ['title','company','location','actions'];
  jobs = input.required<Job[]>();
  favorites = input.required<Set<number>>();

  showFavOnly = signal(false);

  remove = output<number>();             
  favToggle = output<number>();   
  
  toggleFavFilter() {
    this.showFavOnly.update(v => !v);
  }


  searchTerm = signal<string>(
    localStorage.getItem('jobSearch') ?? ''
  );
  currentPage = signal(1);

  // PAGINATION

  readonly pageSize = 10;
  pagedJobs = computed(() => {
    const all = this.filteredJobs();
    const start = (this.currentPage() - 1) * this.pageSize;
    return all.slice(start, start + this.pageSize);
  });
  totalPages = computed(() => Math.ceil(this.filteredJobs().length / this.pageSize));
  goPrev() {
    if (this.currentPage() > 1) this.currentPage.update(p => p - 1);
  }
  goNext() {
    if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1);
  }

  filteredJobs = computed(() => {

    let list = this.jobs();
    if (this.showFavOnly()) {
      list = list.filter(j => this.favorites().has(j.id));
    }
    const term = this.searchTerm().toLowerCase();
      return list.filter(j =>   
    j.title.toLowerCase().includes(term)   ||
    j.company.toLowerCase().includes(term) ||
    j.location.toLowerCase().includes(term)
  );
  });
  constructor() {
    effect(() => {
      localStorage.setItem('jobSearch', this.searchTerm());
    });
  }
}
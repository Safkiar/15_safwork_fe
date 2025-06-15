import { Injectable, signal, effect } from '@angular/core';
export interface Job {
  id: number;             
  title: string;          
  company: string;        
  location: string;       
}


export type NewJob = Pick<Job, 'title' | 'company' | 'location'>;

@Injectable({ providedIn: 'root' })
export class JobService {
  private readonly jobsSignal = signal<Job[]>(
    JSON.parse(localStorage.getItem('jobs') || 'null') ?? [
      { id: 1, title: 'Frontend Developer', company: 'Acme', location: 'Warszawa' },
      { id: 2, title: 'Backend Developer',  company: 'Beta', location: 'Kraków'  }
    ]
  );


  readonly jobs = this.jobsSignal.asReadonly();

  private readonly favSignal = signal<Set<number>>(
    new Set(JSON.parse(localStorage.getItem('jobFavs') || '[]'))
  );
  readonly favorites = this.favSignal.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem('jobFavs', JSON.stringify(Array.from(this.favSignal())));
    });
    effect(() => {
      localStorage.setItem('jobs', JSON.stringify(this.jobsSignal()));
    });
  }

  addJob(job: NewJob) {
    this.jobsSignal.update(current => {
      const nextId = current.length ? Math.max(...current.map(j => j.id)) + 1 : 1;
      return [...current, { id: nextId, ...job }];
    });
  }


  removeJob(id: number) {
    this.jobsSignal.update(current => current.filter(j => j.id !== id));
  }

  clearJobs() {
    this.jobsSignal.set([]);
  }

  toggleFavorite(id: number) {
    this.favSignal.update(set => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  isFavorite(id: number): boolean {
    return this.favSignal().has(id);
  }
}

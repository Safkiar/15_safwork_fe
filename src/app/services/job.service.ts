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
     { id:  1, title: 'Angular Developer',       company: 'NexaSoft',              location: 'Warszawa' },
    { id:  2, title: 'React Engineer',          company: 'BlueWave Technologies', location: 'Kraków'  },
    { id:  3, title: 'Vue.js Developer',        company: 'CloudPrime',            location: 'Gdańsk'  },
    { id:  4, title: 'Full-Stack Developer',    company: 'DataWave Solutions',    location: 'Wrocław' },
    { id:  5, title: 'Backend Developer (Node)',company: 'SecureNet',             location: 'Poznań'  },
    { id:  6, title: 'Python Developer',        company: 'AstraData',             location: 'Katowice'},
    { id:  7, title: 'Java Developer',          company: 'CoreLogic',             location: 'Łódź'     },
    { id:  8, title: 'C#/.NET Developer',       company: 'FinTech Innovations',   location: 'Lublin'  },
    { id:  9, title: 'PHP Developer',           company: 'WebSphere AG',          location: 'Bydgoszcz'},
    { id: 10, title: 'SQL Developer',           company: 'DataSphere Solutions',  location: 'Szczecin'},
    { id: 11, title: 'DevOps Engineer',         company: 'InfraWorks',            location: 'Rzeszów' },
    { id: 12, title: 'Data Engineer',           company: 'InsightAnalytics',      location: 'Warszawa' },
    { id: 13, title: 'Machine Learning Engineer',company: 'Neuronix AI',          location: 'Kraków'   },
    { id: 14, title: 'Mobile Developer (iOS)',  company: 'AppCraft Studio',       location: 'Gdynia'   },

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

import { Component, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JobList } from './components/job-list/job-list';
import { Job, JobService, NewJob } from './services/job.service';
import { JobForm } from './components/job-form/job-form';

@Component({
  selector: 'app-root',
  standalone: true,          
  imports: [RouterOutlet, JobList, JobForm],
  templateUrl: './app.html',
  styleUrls:   ['./app.scss']
})
export class App {
  protected title = 'safwork';

  readonly jobs: Signal<Job[]>;

  constructor(private jobService: JobService) {
      this.jobs = this.jobService.jobs;

  }
  handleNewJob(job: NewJob) {
    this.jobService.addJob(job);
  }
  handleRemove(id: number) {
  this.jobService.removeJob(id);
}

  public toggleFav(id: number) {
    this.jobService.toggleFavorite(id);
  }

  get favorites() {
    return this.jobService.favorites();
  }

} 
